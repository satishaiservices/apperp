import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Tenant: "Tenant";
    readonly User: "User";
    readonly TenantMembership: "TenantMembership";
    readonly Permission: "Permission";
    readonly Role: "Role";
    readonly RolePermission: "RolePermission";
    readonly MembershipRole: "MembershipRole";
    readonly AuditLog: "AuditLog";
    readonly Project: "Project";
    readonly Activity: "Activity";
    readonly ActivityAssignment: "ActivityAssignment";
    readonly DailyProgressReport: "DailyProgressReport";
    readonly SiteSubmission: "SiteSubmission";
    readonly SiteSubmissionActivity: "SiteSubmissionActivity";
    readonly SiteSubmissionPhoto: "SiteSubmissionPhoto";
    readonly AttendanceSession: "AttendanceSession";
    readonly PasswordResetCode: "PasswordResetCode";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const TenantScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly fullName: "fullName";
    readonly username: "username";
    readonly email: "email";
    readonly phone: "phone";
    readonly emergencyPhone: "emergencyPhone";
    readonly avatarUrl: "avatarUrl";
    readonly passwordHash: "passwordHash";
    readonly status: "status";
    readonly isPlatformAdmin: "isPlatformAdmin";
    readonly tokenVersion: "tokenVersion";
    readonly mustChangePassword: "mustChangePassword";
    readonly failedLoginCount: "failedLoginCount";
    readonly lockedUntil: "lockedUntil";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const TenantMembershipScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly userId: "userId";
    readonly membershipStatus: "membershipStatus";
    readonly joinedAt: "joinedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TenantMembershipScalarFieldEnum = (typeof TenantMembershipScalarFieldEnum)[keyof typeof TenantMembershipScalarFieldEnum];
export declare const PermissionScalarFieldEnum: {
    readonly id: "id";
    readonly permissionKey: "permissionKey";
    readonly description: "description";
};
export type PermissionScalarFieldEnum = (typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum];
export declare const RoleScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly name: "name";
    readonly description: "description";
    readonly isSystemRole: "isSystemRole";
    readonly createdAt: "createdAt";
};
export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum];
export declare const RolePermissionScalarFieldEnum: {
    readonly tenantId: "tenantId";
    readonly roleId: "roleId";
    readonly permissionId: "permissionId";
    readonly createdAt: "createdAt";
};
export type RolePermissionScalarFieldEnum = (typeof RolePermissionScalarFieldEnum)[keyof typeof RolePermissionScalarFieldEnum];
export declare const MembershipRoleScalarFieldEnum: {
    readonly tenantId: "tenantId";
    readonly tenantMembershipId: "tenantMembershipId";
    readonly roleId: "roleId";
    readonly assignedAt: "assignedAt";
};
export type MembershipRoleScalarFieldEnum = (typeof MembershipRoleScalarFieldEnum)[keyof typeof MembershipRoleScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly actorMembershipId: "actorMembershipId";
    readonly action: "action";
    readonly entityType: "entityType";
    readonly entityId: "entityId";
    readonly occurredAt: "occurredAt";
    readonly correlationId: "correlationId";
    readonly metadata: "metadata";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const ProjectScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly projectCode: "projectCode";
    readonly name: "name";
    readonly description: "description";
    readonly clientName: "clientName";
    readonly siteAddress: "siteAddress";
    readonly startChainage: "startChainage";
    readonly endChainage: "endChainage";
    readonly startLatitude: "startLatitude";
    readonly startLongitude: "startLongitude";
    readonly endLatitude: "endLatitude";
    readonly endLongitude: "endLongitude";
    readonly status: "status";
    readonly budget: "budget";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum];
export declare const ActivityScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly projectId: "projectId";
    readonly parentId: "parentId";
    readonly activityCode: "activityCode";
    readonly name: "name";
    readonly description: "description";
    readonly unit: "unit";
    readonly status: "status";
    readonly priority: "priority";
    readonly progress: "progress";
    readonly startDate: "startDate";
    readonly dueDate: "dueDate";
    readonly completedAt: "completedAt";
    readonly estimatedCost: "estimatedCost";
    readonly actualCost: "actualCost";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum];
export declare const ActivityAssignmentScalarFieldEnum: {
    readonly tenantId: "tenantId";
    readonly activityId: "activityId";
    readonly tenantMembershipId: "tenantMembershipId";
    readonly assignedAt: "assignedAt";
};
export type ActivityAssignmentScalarFieldEnum = (typeof ActivityAssignmentScalarFieldEnum)[keyof typeof ActivityAssignmentScalarFieldEnum];
export declare const DailyProgressReportScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly projectId: "projectId";
    readonly reportDate: "reportDate";
    readonly status: "status";
    readonly weather: "weather";
    readonly siteConditions: "siteConditions";
    readonly workforceCount: "workforceCount";
    readonly labour: "labour";
    readonly equipment: "equipment";
    readonly materials: "materials";
    readonly workProgress: "workProgress";
    readonly attachments: "attachments";
    readonly delays: "delays";
    readonly issues: "issues";
    readonly remarks: "remarks";
    readonly preparedByMembershipId: "preparedByMembershipId";
    readonly reviewedByMembershipId: "reviewedByMembershipId";
    readonly reviewRemarks: "reviewRemarks";
    readonly submittedAt: "submittedAt";
    readonly reviewedAt: "reviewedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DailyProgressReportScalarFieldEnum = (typeof DailyProgressReportScalarFieldEnum)[keyof typeof DailyProgressReportScalarFieldEnum];
export declare const SiteSubmissionScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly projectId: "projectId";
    readonly supervisorMembershipId: "supervisorMembershipId";
    readonly startChainage: "startChainage";
    readonly endChainage: "endChainage";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly locationAccuracyM: "locationAccuracyM";
    readonly locationCapturedAt: "locationCapturedAt";
    readonly remarks: "remarks";
    readonly submittedAt: "submittedAt";
    readonly createdAt: "createdAt";
};
export type SiteSubmissionScalarFieldEnum = (typeof SiteSubmissionScalarFieldEnum)[keyof typeof SiteSubmissionScalarFieldEnum];
export declare const SiteSubmissionActivityScalarFieldEnum: {
    readonly tenantId: "tenantId";
    readonly submissionId: "submissionId";
    readonly activityId: "activityId";
};
export type SiteSubmissionActivityScalarFieldEnum = (typeof SiteSubmissionActivityScalarFieldEnum)[keyof typeof SiteSubmissionActivityScalarFieldEnum];
export declare const SiteSubmissionPhotoScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly submissionId: "submissionId";
    readonly storageKey: "storageKey";
    readonly mimeType: "mimeType";
    readonly fileSize: "fileSize";
    readonly capturedAt: "capturedAt";
    readonly uploadedAt: "uploadedAt";
};
export type SiteSubmissionPhotoScalarFieldEnum = (typeof SiteSubmissionPhotoScalarFieldEnum)[keyof typeof SiteSubmissionPhotoScalarFieldEnum];
export declare const AttendanceSessionScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly supervisorMembershipId: "supervisorMembershipId";
    readonly projectId: "projectId";
    readonly checkInAt: "checkInAt";
    readonly checkOutAt: "checkOutAt";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly locationAccuracyM: "locationAccuracyM";
    readonly checkOutLatitude: "checkOutLatitude";
    readonly checkOutLongitude: "checkOutLongitude";
    readonly checkOutAccuracyM: "checkOutAccuracyM";
    readonly status: "status";
    readonly remarks: "remarks";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AttendanceSessionScalarFieldEnum = (typeof AttendanceSessionScalarFieldEnum)[keyof typeof AttendanceSessionScalarFieldEnum];
export declare const PasswordResetCodeScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly codeHash: "codeHash";
    readonly attempts: "attempts";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly createdAt: "createdAt";
};
export type PasswordResetCodeScalarFieldEnum = (typeof PasswordResetCodeScalarFieldEnum)[keyof typeof PasswordResetCodeScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const TenantOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly status: "status";
};
export type TenantOrderByRelevanceFieldEnum = (typeof TenantOrderByRelevanceFieldEnum)[keyof typeof TenantOrderByRelevanceFieldEnum];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const UserOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly fullName: "fullName";
    readonly username: "username";
    readonly email: "email";
    readonly phone: "phone";
    readonly emergencyPhone: "emergencyPhone";
    readonly avatarUrl: "avatarUrl";
    readonly passwordHash: "passwordHash";
    readonly status: "status";
};
export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum];
export declare const TenantMembershipOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly userId: "userId";
    readonly membershipStatus: "membershipStatus";
};
export type TenantMembershipOrderByRelevanceFieldEnum = (typeof TenantMembershipOrderByRelevanceFieldEnum)[keyof typeof TenantMembershipOrderByRelevanceFieldEnum];
export declare const PermissionOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly permissionKey: "permissionKey";
    readonly description: "description";
};
export type PermissionOrderByRelevanceFieldEnum = (typeof PermissionOrderByRelevanceFieldEnum)[keyof typeof PermissionOrderByRelevanceFieldEnum];
export declare const RoleOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly name: "name";
    readonly description: "description";
};
export type RoleOrderByRelevanceFieldEnum = (typeof RoleOrderByRelevanceFieldEnum)[keyof typeof RoleOrderByRelevanceFieldEnum];
export declare const RolePermissionOrderByRelevanceFieldEnum: {
    readonly tenantId: "tenantId";
    readonly roleId: "roleId";
    readonly permissionId: "permissionId";
};
export type RolePermissionOrderByRelevanceFieldEnum = (typeof RolePermissionOrderByRelevanceFieldEnum)[keyof typeof RolePermissionOrderByRelevanceFieldEnum];
export declare const MembershipRoleOrderByRelevanceFieldEnum: {
    readonly tenantId: "tenantId";
    readonly tenantMembershipId: "tenantMembershipId";
    readonly roleId: "roleId";
};
export type MembershipRoleOrderByRelevanceFieldEnum = (typeof MembershipRoleOrderByRelevanceFieldEnum)[keyof typeof MembershipRoleOrderByRelevanceFieldEnum];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const AuditLogOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly actorMembershipId: "actorMembershipId";
    readonly action: "action";
    readonly entityType: "entityType";
    readonly entityId: "entityId";
    readonly correlationId: "correlationId";
};
export type AuditLogOrderByRelevanceFieldEnum = (typeof AuditLogOrderByRelevanceFieldEnum)[keyof typeof AuditLogOrderByRelevanceFieldEnum];
export declare const ProjectOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly projectCode: "projectCode";
    readonly name: "name";
    readonly description: "description";
    readonly clientName: "clientName";
    readonly siteAddress: "siteAddress";
    readonly startChainage: "startChainage";
    readonly endChainage: "endChainage";
    readonly status: "status";
};
export type ProjectOrderByRelevanceFieldEnum = (typeof ProjectOrderByRelevanceFieldEnum)[keyof typeof ProjectOrderByRelevanceFieldEnum];
export declare const ActivityOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly projectId: "projectId";
    readonly parentId: "parentId";
    readonly activityCode: "activityCode";
    readonly name: "name";
    readonly description: "description";
    readonly unit: "unit";
    readonly status: "status";
    readonly priority: "priority";
};
export type ActivityOrderByRelevanceFieldEnum = (typeof ActivityOrderByRelevanceFieldEnum)[keyof typeof ActivityOrderByRelevanceFieldEnum];
export declare const ActivityAssignmentOrderByRelevanceFieldEnum: {
    readonly tenantId: "tenantId";
    readonly activityId: "activityId";
    readonly tenantMembershipId: "tenantMembershipId";
};
export type ActivityAssignmentOrderByRelevanceFieldEnum = (typeof ActivityAssignmentOrderByRelevanceFieldEnum)[keyof typeof ActivityAssignmentOrderByRelevanceFieldEnum];
export declare const DailyProgressReportOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly projectId: "projectId";
    readonly status: "status";
    readonly weather: "weather";
    readonly siteConditions: "siteConditions";
    readonly delays: "delays";
    readonly issues: "issues";
    readonly remarks: "remarks";
    readonly preparedByMembershipId: "preparedByMembershipId";
    readonly reviewedByMembershipId: "reviewedByMembershipId";
    readonly reviewRemarks: "reviewRemarks";
};
export type DailyProgressReportOrderByRelevanceFieldEnum = (typeof DailyProgressReportOrderByRelevanceFieldEnum)[keyof typeof DailyProgressReportOrderByRelevanceFieldEnum];
export declare const SiteSubmissionOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly projectId: "projectId";
    readonly supervisorMembershipId: "supervisorMembershipId";
    readonly startChainage: "startChainage";
    readonly endChainage: "endChainage";
    readonly remarks: "remarks";
};
export type SiteSubmissionOrderByRelevanceFieldEnum = (typeof SiteSubmissionOrderByRelevanceFieldEnum)[keyof typeof SiteSubmissionOrderByRelevanceFieldEnum];
export declare const SiteSubmissionActivityOrderByRelevanceFieldEnum: {
    readonly tenantId: "tenantId";
    readonly submissionId: "submissionId";
    readonly activityId: "activityId";
};
export type SiteSubmissionActivityOrderByRelevanceFieldEnum = (typeof SiteSubmissionActivityOrderByRelevanceFieldEnum)[keyof typeof SiteSubmissionActivityOrderByRelevanceFieldEnum];
export declare const SiteSubmissionPhotoOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly submissionId: "submissionId";
    readonly storageKey: "storageKey";
    readonly mimeType: "mimeType";
};
export type SiteSubmissionPhotoOrderByRelevanceFieldEnum = (typeof SiteSubmissionPhotoOrderByRelevanceFieldEnum)[keyof typeof SiteSubmissionPhotoOrderByRelevanceFieldEnum];
export declare const AttendanceSessionOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly supervisorMembershipId: "supervisorMembershipId";
    readonly projectId: "projectId";
    readonly status: "status";
    readonly remarks: "remarks";
};
export type AttendanceSessionOrderByRelevanceFieldEnum = (typeof AttendanceSessionOrderByRelevanceFieldEnum)[keyof typeof AttendanceSessionOrderByRelevanceFieldEnum];
export declare const PasswordResetCodeOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly codeHash: "codeHash";
};
export type PasswordResetCodeOrderByRelevanceFieldEnum = (typeof PasswordResetCodeOrderByRelevanceFieldEnum)[keyof typeof PasswordResetCodeOrderByRelevanceFieldEnum];
