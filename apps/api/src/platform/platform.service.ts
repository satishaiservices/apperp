import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { hash } from '@node-rs/argon2';
import { randomUUID } from 'crypto';
import { PrismaService } from '../database/prisma.service';
import { AuditService } from '../audit/audit.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';

export interface CreateTenantInput {
  name: string;
  slug?: string;
  taxId?: string;
  tier?: string;
  adminFullName: string;
  adminUsername: string;
  adminEmail: string;
  adminPhone: string;
  adminPassword?: string;
}

export interface AddTenantUserInput {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  roleName?: string;
  password?: string;
}

@Injectable()
export class PlatformService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  async getStats() {
    const [clientOrgsCount, activeSitesCount, fieldTerminalsCount] =
      await Promise.all([
        this.prisma.tenant.count(),
        this.prisma.project.count({
          where: { status: { notIn: ['ARCHIVED', 'CANCELLED'] } },
        }),
        this.prisma.user.count({
          where: { status: 'ACTIVE' },
        }),
      ]);

    return {
      clientOrgsCount,
      activeSitesCount,
      fieldTerminalsCount,
      systemHealth: '99.98% Nominal',
      syncLatencyMs: 18,
      activeRTKStreams: 18,
    };
  }

  async getTenants() {
    const tenants = await this.prisma.tenant.findMany({
      include: {
        _count: {
          select: {
            projects: true,
            memberships: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return tenants.map((t) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      status: t.status,
      createdAt: t.createdAt,
      projectsCount: t._count.projects,
      usersCount: t._count.memberships,
    }));
  }

  async createTenantWithAdmin(input: CreateTenantInput) {
    const name = input.name?.trim();
    const adminFullName = input.adminFullName?.trim();
    const adminUsername = input.adminUsername?.trim().toLowerCase();
    const adminEmail = input.adminEmail?.trim().toLowerCase();
    const adminPhone = input.adminPhone?.trim();
    const adminPassword = input.adminPassword || 'VyhirPass@2026';

    if (!name || !adminFullName || !adminUsername || !adminEmail || !adminPhone) {
      throw new BadRequestException(
        'Company Name, Admin Full Name, Admin Username, Email ID, and Phone Number are required',
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(adminEmail)) {
      throw new BadRequestException('Please provide a valid Admin Email address');
    }

    if (adminPhone.length < 5) {
      throw new BadRequestException('Please provide a valid Contact Phone number');
    }

    if (adminPassword.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }

    // Check if username or email already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: adminUsername },
          { email: adminEmail },
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'Admin Username or Email already registered in the system',
      );
    }

    const baseSlug = (input.slug || name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 50);

    const slug = `${baseSlug || 'client'}-${randomUUID().slice(0, 6)}`;

    const passwordHash = await hash(adminPassword);

    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Create Tenant
      const tenant = await tx.tenant.create({
        data: {
          name,
          slug,
          status: 'ACTIVE',
        },
      });

      // 2. Create Admin User
      const user = await tx.user.create({
        data: {
          fullName: adminFullName,
          username: adminUsername,
          email: adminEmail,
          phone: adminPhone,
          passwordHash,
          status: 'ACTIVE',
          isPlatformAdmin: false,
        },
      });

      // 3. Create Standard Roles for this tenant
      const ownerRole = await tx.role.create({
        data: {
          tenantId: tenant.id,
          name: 'OWNER',
          description: 'Organization Owner & Administrator',
          isSystemRole: true,
        },
      });

      const pmRole = await tx.role.create({
        data: {
          tenantId: tenant.id,
          name: 'PROJECT_MANAGER',
          description: 'Project Manager',
          isSystemRole: true,
        },
      });

      const supervisorRole = await tx.role.create({
        data: {
          tenantId: tenant.id,
          name: 'SUPERVISOR',
          description: 'Field Site Supervisor',
          isSystemRole: true,
        },
      });

      // 3b. Assign Permissions to Roles
      const allPermissions = await tx.permission.findMany();
      const supervisorKeys = new Set([
        'projects.view',
        'activities.view',
        'activities.create',
        'activities.update',
        'dprs.view',
        'dprs.create',
        'dprs.submit',
        'submissions.view',
        'submissions.create',
        'reports.view',
        'users.view',
      ]);

      const pmKeys = new Set([
        ...supervisorKeys,
        'projects.create',
        'projects.update',
        'dprs.update',
        'dprs.review',
        'users.create',
        'users.update',
      ]);

      const rolePermsToInsert = [];
      for (const p of allPermissions) {
        if (supervisorKeys.has(p.permissionKey)) {
          rolePermsToInsert.push({
            tenantId: tenant.id,
            roleId: supervisorRole.id,
            permissionId: p.id,
          });
        }
        if (pmKeys.has(p.permissionKey)) {
          rolePermsToInsert.push({
            tenantId: tenant.id,
            roleId: pmRole.id,
            permissionId: p.id,
          });
        }
      }

      if (rolePermsToInsert.length > 0) {
        await tx.rolePermission.createMany({
          data: rolePermsToInsert,
          skipDuplicates: true,
        });
      }

      // 4. Create Membership
      const membership = await tx.tenantMembership.create({
        data: {
          tenantId: tenant.id,
          userId: user.id,
          membershipStatus: 'ACTIVE',
          joinedAt: new Date(),
        },
      });

      // 5. Assign OWNER role
      await tx.membershipRole.create({
        data: {
          tenantId: tenant.id,
          tenantMembershipId: membership.id,
          roleId: ownerRole.id,
        },
      });

      return { tenant, user, membership };
    });

    await this.audit.record({
      tenantId: result.tenant.id,
      actorMembershipId: result.membership.id,
      action: 'TENANT_ONBOARDED',
      entityType: 'Tenant',
      entityId: result.tenant.id,
      metadata: {
        name: result.tenant.name,
        slug: result.tenant.slug,
        adminUsername: result.user.username,
        adminEmail: result.user.email,
      },
    });

    return {
      success: true,
      tenant: {
        id: result.tenant.id,
        name: result.tenant.name,
        slug: result.tenant.slug,
      },
      adminUser: {
        id: result.user.id,
        fullName: result.user.fullName,
        username: result.user.username,
        email: result.user.email,
        temporaryPassword: adminPassword,
      },
    };
  }

  async getTenantDetails(id: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id },
      include: {
        memberships: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                username: true,
                email: true,
                phone: true,
                status: true,
                createdAt: true,
              },
            },
            membershipRoles: {
              include: {
                role: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
          orderBy: { joinedAt: 'asc' },
        },
        projects: {
          select: {
            id: true,
            projectCode: true,
            name: true,
            status: true,
            budget: true,
            startChainage: true,
            endChainage: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            projects: true,
            memberships: true,
            siteSubmissions: true,
            activities: true,
          },
        },
      },
    });

    if (!tenant) throw new NotFoundException('Organization not found');

    return {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      status: tenant.status,
      createdAt: tenant.createdAt,
      updatedAt: tenant.updatedAt,
      projectsCount: tenant._count.projects,
      usersCount: tenant._count.memberships,
      submissionsCount: tenant._count.siteSubmissions,
      activitiesCount: tenant._count.activities,
      projects: tenant.projects,
      users: tenant.memberships.map((m) => ({
        membershipId: m.id,
        membershipStatus: m.membershipStatus,
        joinedAt: m.joinedAt,
        userId: m.user.id,
        fullName: m.user.fullName,
        username: m.user.username,
        email: m.user.email,
        phone: m.user.phone,
        userStatus: m.user.status,
        roles: m.membershipRoles.map((mr) => mr.role.name),
      })),
    };
  }

  async resetUserPassword(tenantId: string, userId: string, newPassword?: string) {
    const membership = await this.prisma.tenantMembership.findFirst({
      where: { tenantId, userId },
      include: { user: true },
    });

    if (!membership) throw new NotFoundException('User is not a member of this organization');

    const pass = newPassword?.trim() || `Pass${Math.random().toString(36).substring(2, 8)}!`;
    const passwordHash = await hash(pass);

    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    return {
      message: 'Password reset successfully',
      temporaryPassword: pass,
      userId,
      username: membership.user.username,
    };
  }

  async updateTenant(id: string, input: { name?: string; status?: string; slug?: string }) {
    const tenant = await this.prisma.tenant.findUnique({ where: { id } });
    if (!tenant) throw new NotFoundException('Organization not found');

    const data: { name?: string; status?: string; slug?: string } = {};
    if (input.name?.trim()) data.name = input.name.trim();
    if (input.slug?.trim() && input.slug.trim() !== tenant.slug) {
      const cleanSlug = input.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
      const existing = await this.prisma.tenant.findUnique({ where: { slug: cleanSlug } });
      if (existing) throw new ConflictException('Slug already in use');
      data.slug = cleanSlug;
    }
    if (input.status && ['ACTIVE', 'SUSPENDED', 'CLOSED'].includes(input.status)) {
      data.status = input.status;
    }

    return this.prisma.tenant.update({
      where: { id },
      data,
    });
  }

  async addUserToTenant(tenantId: string, input: AddTenantUserInput) {
    const tenant = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) throw new NotFoundException('Organization not found');

    const fullName = input.fullName?.trim();
    const username = input.username?.trim().toLowerCase();
    const email = input.email?.trim().toLowerCase();
    const phone = input.phone?.trim();
    const roleName = input.roleName?.trim().toUpperCase() || 'SUPERVISOR';
    const password = input.password?.trim() || `Vyhir${Math.random().toString(36).substring(2, 6).toUpperCase()}@2026`;

    if (!fullName || !username || !email || !phone) {
      throw new BadRequestException(
        'Full Name, Username, Email ID, and Phone Number are required',
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Please provide a valid email address');
    }

    if (phone.length < 5) {
      throw new BadRequestException('Please provide a valid phone number');
    }

    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }

    // Check if username or email already exists
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
        ],
      },
    });

    if (existing) {
      throw new ConflictException('Username or email is already in use by another user');
    }

    // Check if role exists for this tenant, or create it
    let role = await this.prisma.role.findFirst({
      where: { tenantId, name: roleName },
    });

    if (!role) {
      role = await this.prisma.role.create({
        data: {
          tenantId,
          name: roleName,
          description: `${roleName} Role`,
          isSystemRole: true,
        },
      });
    }

    const passwordHash = await hash(password);

    const result = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName,
          username,
          email,
          phone,
          passwordHash,
          status: 'ACTIVE',
          isPlatformAdmin: false,
        },
      });

      const membership = await tx.tenantMembership.create({
        data: {
          tenantId,
          userId: user.id,
          membershipStatus: 'ACTIVE',
          joinedAt: new Date(),
        },
      });

      await tx.membershipRole.create({
        data: {
          tenantId,
          tenantMembershipId: membership.id,
          roleId: role.id,
        },
      });

      return { user, membership, role };
    });

    return {
      success: true,
      membershipId: result.membership.id,
      user: {
        id: result.user.id,
        fullName: result.user.fullName,
        username: result.user.username,
        email: result.user.email,
        phone: result.user.phone,
        role: result.role.name,
      },
      temporaryPassword: password,
    };
  }

  async listPlatformAdmins() {
    return this.prisma.user.findMany({
      where: { isPlatformAdmin: true },
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        phone: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createPlatformAdmin(input: {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
  }) {
    const fullName = input.fullName?.trim();
    const username = input.username?.trim().toLowerCase();
    const email = input.email?.trim().toLowerCase();
    const phone = input.phone?.trim();
    const password = input.password?.trim();

    if (!fullName || !username || !email || !phone || !password) {
      throw new BadRequestException('All fields are required');
    }

    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }

    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existing) {
      throw new ConflictException('Username or email is already in use');
    }

    const passwordHash = await hash(password);

    const user = await this.prisma.user.create({
      data: {
        fullName,
        username,
        email,
        phone,
        passwordHash,
        status: 'ACTIVE',
        isPlatformAdmin: true,
      },
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        phone: true,
        status: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      user,
    };
  }

  async updatePlatformAdmin(
    auth: AuthenticatedUser,
    id: string,
    input: {
      fullName?: string;
      email?: string;
      phone?: string;
      status?: string;
      newPassword?: string;
    },
  ) {
    const user = await this.prisma.user.findFirst({
      where: { id, isPlatformAdmin: true },
    });

    if (!user) {
      throw new NotFoundException('Platform superadmin not found');
    }

    const data: any = {};

    if (input.fullName?.trim()) {
      data.fullName = input.fullName.trim();
    }
    if (input.phone?.trim()) {
      data.phone = input.phone.trim();
    }

    if (input.email?.trim()) {
      const cleanEmail = input.email.trim().toLowerCase();
      if (cleanEmail !== user.email) {
        const existing = await this.prisma.user.findFirst({
          where: { email: cleanEmail, id: { not: id } },
        });
        if (existing) {
          throw new ConflictException('Email address is already in use');
        }
        data.email = cleanEmail;
      }
    }

    if (input.status) {
      if (input.status !== 'ACTIVE' && user.status === 'ACTIVE') {
        if (auth.sub === id) {
          throw new BadRequestException('You cannot deactivate your own superadmin account');
        }

        const activeCount = await this.prisma.user.count({
          where: { isPlatformAdmin: true, status: 'ACTIVE' },
        });
        if (activeCount <= 1) {
          throw new ForbiddenException('Cannot deactivate the last active platform superadmin');
        }
      }
      data.status = input.status;
    }

    if (input.newPassword?.trim()) {
      if (input.newPassword.trim().length < 8) {
        throw new BadRequestException('Password must be at least 8 characters long');
      }
      data.passwordHash = await hash(input.newPassword.trim());
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        phone: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    await this.audit.log(auth, 'SUPERADMIN_UPDATED', 'User', id, {
      updatedFields: Object.keys(data).filter((k) => k !== 'passwordHash'),
      passwordChanged: !!input.newPassword,
    });

    return {
      success: true,
      user: updated,
    };
  }

  async deletePlatformAdmin(auth: AuthenticatedUser, id: string) {
    if (auth.sub === id) {
      throw new BadRequestException('You cannot delete your own superadmin account');
    }

    const user = await this.prisma.user.findFirst({
      where: { id, isPlatformAdmin: true },
    });

    if (!user) {
      throw new NotFoundException('Platform superadmin not found');
    }

    const totalAdmins = await this.prisma.user.count({
      where: { isPlatformAdmin: true },
    });
    if (totalAdmins <= 1) {
      throw new ForbiddenException('Cannot delete the last remaining platform superadmin');
    }

    // Check if user is associated with any tenant memberships
    const membershipsCount = await this.prisma.tenantMembership.count({
      where: { userId: id },
    });

    if (membershipsCount > 0) {
      // Safely revoke superadmin privileges without violating foreign key constraints
      await this.prisma.user.update({
        where: { id },
        data: { isPlatformAdmin: false },
      });

      await this.audit.log(auth, 'SUPERADMIN_REVOKED', 'User', id, {
        reason: 'User has active tenant memberships; superadmin flag revoked',
      });

      return {
        success: true,
        message: 'Superadmin privileges revoked successfully (user retains organization memberships)',
      };
    } else {
      // Safely delete standalone superadmin user record
      await this.prisma.user.delete({ where: { id } });

      await this.audit.log(auth, 'SUPERADMIN_DELETED', 'User', id, {
        username: user.username,
        email: user.email,
      });

      return {
        success: true,
        message: 'Platform superadmin deleted successfully',
      };
    }
  }
}
