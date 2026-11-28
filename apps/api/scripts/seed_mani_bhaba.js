const mysql = require('mysql2/promise');
const argon2 = require('@node-rs/argon2');
const crypto = require('node:crypto');

async function seed() {
  const connectionString =
    process.env.DATABASE_URL ||
    'mysql://vyhir:vyhir_local_dev_change_me@127.0.0.1:3306/vyhir_dev';

  const connection = await mysql.createConnection(connectionString);
  console.log('Connected to MySQL database');

  try {
    await connection.beginTransaction();

    // 1. Get YEC India Tenant
    const [tenantRows] = await connection.query(
      "SELECT id, name FROM tenants WHERE slug = 'yec-india' OR name LIKE '%YEC%' LIMIT 1"
    );
    if (!tenantRows || tenantRows.length === 0) {
      throw new Error('YEC India tenant not found');
    }
    const tenant = tenantRows[0];
    const tenantId = tenant.id;
    console.log(`Using Tenant: ${tenant.name} (${tenantId})`);

    // 2. Hash password '1234root'
    const passwordHash = await argon2.hash('1234root');
    console.log('Password hashed successfully');

    // 3. Upsert User: Mani Bhaba (primary email: mani.bhaba@yecindia.com, plus mani@yecindia.com)
    const emailsToCreate = [
      'mani.bhaba@yecindia.com',
      'mani@yecindia.com',
    ];

    const userIds = [];

    for (const email of emailsToCreate) {
      const [existingUserRows] = await connection.query(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );

      let userId;
      if (existingUserRows && existingUserRows.length > 0) {
        userId = existingUserRows[0].id;
        await connection.query(
          `UPDATE users SET
            full_name = 'Mani Bhaba',
            password_hash = ?,
            phone = '+91 98450 12345',
            emergency_phone = '+91 98450 67890',
            status = 'ACTIVE',
            updated_at = NOW(6)
          WHERE id = ?`,
          [passwordHash, userId]
        );
        console.log(`Updated user ${email} (${userId})`);
      } else {
        userId = crypto.randomUUID();
        await connection.query(
          `INSERT INTO users (id, full_name, email, password_hash, phone, emergency_phone, status, created_at, updated_at)
           VALUES (?, 'Mani Bhaba', ?, ?, '+91 98450 12345', '+91 98450 67890', 'ACTIVE', NOW(6), NOW(6))`,
          [userId, email, passwordHash]
        );
        console.log(`Created user ${email} (${userId})`);
      }
      userIds.push(userId);
    }

    // 4. Ensure Role: SUPERVISOR exists in YEC India
    let roleId;
    const [existingRoleRows] = await connection.query(
      "SELECT id FROM roles WHERE tenant_id = ? AND name = 'SUPERVISOR'",
      [tenantId]
    );

    if (existingRoleRows && existingRoleRows.length > 0) {
      roleId = existingRoleRows[0].id;
    } else {
      roleId = crypto.randomUUID();
      await connection.query(
        `INSERT INTO roles (id, tenant_id, name, description, is_system_role, created_at)
         VALUES (?, ?, 'SUPERVISOR', 'Civil Site Supervisor & Field Operations', false, NOW(6))`,
        [roleId, tenantId]
      );
      console.log(`Created SUPERVISOR role (${roleId})`);
    }

    // Grant all field permissions to SUPERVISOR
    const [perms] = await connection.query(
      "SELECT id, permission_key FROM permissions WHERE permission_key IN ('projects.view', 'projects.update', 'activities.view', 'activities.create', 'activities.update', 'submissions.create', 'submissions.view', 'dprs.create', 'dprs.view', 'dprs.submit', 'reports.view', 'users.view')"
    );

    for (const p of perms) {
      await connection.query(
        `INSERT IGNORE INTO role_permissions (tenant_id, role_id, permission_id, created_at)
         VALUES (?, ?, ?, NOW(6))`,
        [tenantId, roleId, p.id]
      );
    }
    console.log(`Granted ${perms.length} permissions to SUPERVISOR role`);

    // 5. Ensure Tenant Memberships & Membership Roles for each Mani user
    const membershipIds = [];
    for (const userId of userIds) {
      let membershipId;
      const [existingMemRows] = await connection.query(
        'SELECT id FROM tenant_memberships WHERE tenant_id = ? AND user_id = ?',
        [tenantId, userId]
      );

      if (existingMemRows && existingMemRows.length > 0) {
        membershipId = existingMemRows[0].id;
      } else {
        membershipId = crypto.randomUUID();
        await connection.query(
          `INSERT INTO tenant_memberships (id, tenant_id, user_id, membership_status, joined_at, created_at, updated_at)
           VALUES (?, ?, ?, 'ACTIVE', NOW(6), NOW(6), NOW(6))`,
          [membershipId, tenantId, userId]
        );
      }
      membershipIds.push(membershipId);

      // Link role
      await connection.query(
        `INSERT IGNORE INTO membership_roles (tenant_id, tenant_membership_id, role_id, assigned_at)
         VALUES (?, ?, ?, NOW(6))`,
        [tenantId, membershipId, roleId]
      );
    }
    console.log(`Configured ${membershipIds.length} tenant memberships`);

    // 6. Create Additional Projects
    const projectsToAdd = [
      {
        projectCode: 'PRJ-EXP-07',
        name: 'Delhi-Mumbai Expressway (Ch. 120-160)',
        description: 'Construction of 8-lane greenfield highway package with bridges and underpasses',
        clientName: 'National Highways Authority of India (NHAI)',
        siteAddress: 'Sector 14, Expressway Corridor, Vadodara Zone',
        status: 'ACTIVE',
        budget: 450000000.0,
      },
      {
        projectCode: 'PRJ-BRG-12',
        name: 'Ganga Elevated Flyover & Cable Stay Bridge',
        description: '6-lane elevated viaduct and river bridge superstructure construction',
        clientName: 'State Highway & Bridge Development Corp',
        siteAddress: 'Riverbank West Section, Varanasi Corridor',
        status: 'ACTIVE',
        budget: 280000000.0,
      },
    ];

    const projectIds = [];
    for (const prj of projectsToAdd) {
      let pId;
      const [existingPrjRows] = await connection.query(
        'SELECT id FROM projects WHERE tenant_id = ? AND project_code = ?',
        [tenantId, prj.projectCode]
      );

      if (existingPrjRows && existingPrjRows.length > 0) {
        pId = existingPrjRows[0].id;
        await connection.query(
          `UPDATE projects SET
            name = ?, description = ?, client_name = ?, site_address = ?, status = ?, budget = ?, updated_at = NOW(6)
           WHERE id = ?`,
          [prj.name, prj.description, prj.clientName, prj.siteAddress, prj.status, prj.budget, pId]
        );
      } else {
        pId = crypto.randomUUID();
        await connection.query(
          `INSERT INTO projects (id, tenant_id, project_code, name, description, client_name, site_address, status, budget, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(6), NOW(6))`,
          [pId, tenantId, prj.projectCode, prj.name, prj.description, prj.clientName, prj.siteAddress, prj.status, prj.budget]
        );
      }
      projectIds.push({ id: pId, code: prj.projectCode, name: prj.name });
      console.log(`Configured Project: ${prj.projectCode} - ${prj.name}`);
    }

    // 7. Create Activities for the New Projects
    const activitiesMap = {
      'PRJ-EXP-07': [
        { code: 'ACT-EMB-01', name: 'Embankment Construction & Compaction', desc: 'Soil filling and heavy vibratory compaction', status: 'IN_PROGRESS' },
        { code: 'ACT-GSB-02', name: 'Granular Sub-Base (GSB) Laying', desc: 'Graded crushed stone layer spreading and rolling', status: 'NOT_STARTED' },
        { code: 'ACT-DBM-03', name: 'Dense Bituminous Macadam (DBM) Paving', desc: 'Hot mix asphalt layer laying with sensor paver', status: 'NOT_STARTED' },
        { code: 'ACT-DRN-04', name: 'Box Culvert & Drainage Installation', desc: 'Precast RCC box culvert placement and joint sealing', status: 'IN_PROGRESS' },
      ],
      'PRJ-BRG-12': [
        { code: 'ACT-PIL-01', name: 'Bored Cast-in-situ Piling (1200mm Dia)', desc: 'Hydraulic rotary drilling and tremie concreting', status: 'IN_PROGRESS' },
        { code: 'ACT-PCP-02', name: 'Pier Cap Concreting & Bar Bending', desc: 'High-grade M45 concrete pouring for pier heads', status: 'NOT_STARTED' },
        { code: 'ACT-SGR-03', name: 'Precast Segment Launching', desc: 'Gantry girder segment erection and epoxy jointing', status: 'NOT_STARTED' },
        { code: 'ACT-CSB-04', name: 'Stay Cable Post-Tensioning & Stressing', desc: 'High-tensile strand stressing with mono-jacks', status: 'NOT_STARTED' },
      ],
    };

    for (const prj of projectIds) {
      const acts = activitiesMap[prj.code] || [];
      for (const act of acts) {
        let actId;
        const [existingActRows] = await connection.query(
          'SELECT id FROM activities WHERE tenant_id = ? AND project_id = ? AND activity_code = ?',
          [tenantId, prj.id, act.code]
        );

        if (existingActRows && existingActRows.length > 0) {
          actId = existingActRows[0].id;
        } else {
          actId = crypto.randomUUID();
          await connection.query(
            `INSERT INTO activities (id, tenant_id, project_id, activity_code, name, description, status, priority, progress, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, 'HIGH', 25, NOW(6), NOW(6))`,
            [actId, tenantId, prj.id, act.code, act.name, act.desc, act.status]
          );
        }
        console.log(`Configured Activity: [${prj.code}] ${act.code} - ${act.name}`);
      }
    }

    // 8. Assign ALL activities across ALL projects in YEC India to Mani Bhaba's memberships
    const [allActivities] = await connection.query(
      'SELECT id, name FROM activities WHERE tenant_id = ?',
      [tenantId]
    );

    for (const memId of membershipIds) {
      for (const act of allActivities) {
        await connection.query(
          `INSERT IGNORE INTO activity_assignments (tenant_id, activity_id, tenant_membership_id, assigned_at)
           VALUES (?, ?, ?, NOW(6))`,
          [tenantId, act.id, memId]
        );
      }
    }
    console.log(`Assigned all ${allActivities.length} activities to Mani Bhaba's memberships!`);

    await connection.commit();
    console.log('✅ Seed completed successfully!');
  } catch (err) {
    await connection.rollback();
    console.error('❌ Error during seed:', err);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

seed();
