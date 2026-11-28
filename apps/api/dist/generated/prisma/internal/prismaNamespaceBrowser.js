"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceSessionOrderByRelevanceFieldEnum = exports.SiteSubmissionPhotoOrderByRelevanceFieldEnum = exports.SiteSubmissionActivityOrderByRelevanceFieldEnum = exports.SiteSubmissionOrderByRelevanceFieldEnum = exports.DailyProgressReportOrderByRelevanceFieldEnum = exports.ActivityAssignmentOrderByRelevanceFieldEnum = exports.ActivityOrderByRelevanceFieldEnum = exports.ProjectOrderByRelevanceFieldEnum = exports.AuditLogOrderByRelevanceFieldEnum = exports.QueryMode = exports.JsonNullValueFilter = exports.MembershipRoleOrderByRelevanceFieldEnum = exports.RolePermissionOrderByRelevanceFieldEnum = exports.RoleOrderByRelevanceFieldEnum = exports.PermissionOrderByRelevanceFieldEnum = exports.TenantMembershipOrderByRelevanceFieldEnum = exports.UserOrderByRelevanceFieldEnum = exports.NullsOrder = exports.TenantOrderByRelevanceFieldEnum = exports.JsonNullValueInput = exports.SortOrder = exports.AttendanceSessionScalarFieldEnum = exports.SiteSubmissionPhotoScalarFieldEnum = exports.SiteSubmissionActivityScalarFieldEnum = exports.SiteSubmissionScalarFieldEnum = exports.DailyProgressReportScalarFieldEnum = exports.ActivityAssignmentScalarFieldEnum = exports.ActivityScalarFieldEnum = exports.ProjectScalarFieldEnum = exports.AuditLogScalarFieldEnum = exports.MembershipRoleScalarFieldEnum = exports.RolePermissionScalarFieldEnum = exports.RoleScalarFieldEnum = exports.PermissionScalarFieldEnum = exports.TenantMembershipScalarFieldEnum = exports.UserScalarFieldEnum = exports.TenantScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    Tenant: 'Tenant',
    User: 'User',
    TenantMembership: 'TenantMembership',
    Permission: 'Permission',
    Role: 'Role',
    RolePermission: 'RolePermission',
    MembershipRole: 'MembershipRole',
    AuditLog: 'AuditLog',
    Project: 'Project',
    Activity: 'Activity',
    ActivityAssignment: 'ActivityAssignment',
    DailyProgressReport: 'DailyProgressReport',
    SiteSubmission: 'SiteSubmission',
    SiteSubmissionActivity: 'SiteSubmissionActivity',
    SiteSubmissionPhoto: 'SiteSubmissionPhoto',
    AttendanceSession: 'AttendanceSession'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.TenantScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.UserScalarFieldEnum = {
    id: 'id',
    fullName: 'fullName',
    username: 'username',
    email: 'email',
    phone: 'phone',
    emergencyPhone: 'emergencyPhone',
    avatarUrl: 'avatarUrl',
    passwordHash: 'passwordHash',
    status: 'status',
    isPlatformAdmin: 'isPlatformAdmin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TenantMembershipScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    userId: 'userId',
    membershipStatus: 'membershipStatus',
    joinedAt: 'joinedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PermissionScalarFieldEnum = {
    id: 'id',
    permissionKey: 'permissionKey',
    description: 'description'
};
exports.RoleScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    description: 'description',
    isSystemRole: 'isSystemRole',
    createdAt: 'createdAt'
};
exports.RolePermissionScalarFieldEnum = {
    tenantId: 'tenantId',
    roleId: 'roleId',
    permissionId: 'permissionId',
    createdAt: 'createdAt'
};
exports.MembershipRoleScalarFieldEnum = {
    tenantId: 'tenantId',
    tenantMembershipId: 'tenantMembershipId',
    roleId: 'roleId',
    assignedAt: 'assignedAt'
};
exports.AuditLogScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    actorMembershipId: 'actorMembershipId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    occurredAt: 'occurredAt',
    correlationId: 'correlationId',
    metadata: 'metadata'
};
exports.ProjectScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    projectCode: 'projectCode',
    name: 'name',
    description: 'description',
    clientName: 'clientName',
    siteAddress: 'siteAddress',
    startChainage: 'startChainage',
    endChainage: 'endChainage',
    startLatitude: 'startLatitude',
    startLongitude: 'startLongitude',
    endLatitude: 'endLatitude',
    endLongitude: 'endLongitude',
    status: 'status',
    budget: 'budget',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ActivityScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    projectId: 'projectId',
    parentId: 'parentId',
    activityCode: 'activityCode',
    name: 'name',
    description: 'description',
    unit: 'unit',
    status: 'status',
    priority: 'priority',
    progress: 'progress',
    startDate: 'startDate',
    dueDate: 'dueDate',
    completedAt: 'completedAt',
    estimatedCost: 'estimatedCost',
    actualCost: 'actualCost',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ActivityAssignmentScalarFieldEnum = {
    tenantId: 'tenantId',
    activityId: 'activityId',
    tenantMembershipId: 'tenantMembershipId',
    assignedAt: 'assignedAt'
};
exports.DailyProgressReportScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    projectId: 'projectId',
    reportDate: 'reportDate',
    status: 'status',
    weather: 'weather',
    siteConditions: 'siteConditions',
    workforceCount: 'workforceCount',
    labour: 'labour',
    equipment: 'equipment',
    materials: 'materials',
    workProgress: 'workProgress',
    attachments: 'attachments',
    delays: 'delays',
    issues: 'issues',
    remarks: 'remarks',
    preparedByMembershipId: 'preparedByMembershipId',
    reviewedByMembershipId: 'reviewedByMembershipId',
    reviewRemarks: 'reviewRemarks',
    submittedAt: 'submittedAt',
    reviewedAt: 'reviewedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SiteSubmissionScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    projectId: 'projectId',
    supervisorMembershipId: 'supervisorMembershipId',
    startChainage: 'startChainage',
    endChainage: 'endChainage',
    latitude: 'latitude',
    longitude: 'longitude',
    locationAccuracyM: 'locationAccuracyM',
    locationCapturedAt: 'locationCapturedAt',
    remarks: 'remarks',
    submittedAt: 'submittedAt',
    createdAt: 'createdAt'
};
exports.SiteSubmissionActivityScalarFieldEnum = {
    tenantId: 'tenantId',
    submissionId: 'submissionId',
    activityId: 'activityId'
};
exports.SiteSubmissionPhotoScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    submissionId: 'submissionId',
    storageKey: 'storageKey',
    mimeType: 'mimeType',
    fileSize: 'fileSize',
    capturedAt: 'capturedAt',
    uploadedAt: 'uploadedAt'
};
exports.AttendanceSessionScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    supervisorMembershipId: 'supervisorMembershipId',
    projectId: 'projectId',
    checkInAt: 'checkInAt',
    checkOutAt: 'checkOutAt',
    latitude: 'latitude',
    longitude: 'longitude',
    locationAccuracyM: 'locationAccuracyM',
    checkOutLatitude: 'checkOutLatitude',
    checkOutLongitude: 'checkOutLongitude',
    checkOutAccuracyM: 'checkOutAccuracyM',
    status: 'status',
    remarks: 'remarks',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.TenantOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    status: 'status'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.UserOrderByRelevanceFieldEnum = {
    id: 'id',
    fullName: 'fullName',
    username: 'username',
    email: 'email',
    phone: 'phone',
    emergencyPhone: 'emergencyPhone',
    avatarUrl: 'avatarUrl',
    passwordHash: 'passwordHash',
    status: 'status'
};
exports.TenantMembershipOrderByRelevanceFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    userId: 'userId',
    membershipStatus: 'membershipStatus'
};
exports.PermissionOrderByRelevanceFieldEnum = {
    id: 'id',
    permissionKey: 'permissionKey',
    description: 'description'
};
exports.RoleOrderByRelevanceFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    description: 'description'
};
exports.RolePermissionOrderByRelevanceFieldEnum = {
    tenantId: 'tenantId',
    roleId: 'roleId',
    permissionId: 'permissionId'
};
exports.MembershipRoleOrderByRelevanceFieldEnum = {
    tenantId: 'tenantId',
    tenantMembershipId: 'tenantMembershipId',
    roleId: 'roleId'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.AuditLogOrderByRelevanceFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    actorMembershipId: 'actorMembershipId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    correlationId: 'correlationId'
};
exports.ProjectOrderByRelevanceFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    projectCode: 'projectCode',
    name: 'name',
    description: 'description',
    clientName: 'clientName',
    siteAddress: 'siteAddress',
    startChainage: 'startChainage',
    endChainage: 'endChainage',
    status: 'status'
};
exports.ActivityOrderByRelevanceFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    projectId: 'projectId',
    parentId: 'parentId',
    activityCode: 'activityCode',
    name: 'name',
    description: 'description',
    unit: 'unit',
    status: 'status',
    priority: 'priority'
};
exports.ActivityAssignmentOrderByRelevanceFieldEnum = {
    tenantId: 'tenantId',
    activityId: 'activityId',
    tenantMembershipId: 'tenantMembershipId'
};
exports.DailyProgressReportOrderByRelevanceFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    projectId: 'projectId',
    status: 'status',
    weather: 'weather',
    siteConditions: 'siteConditions',
    delays: 'delays',
    issues: 'issues',
    remarks: 'remarks',
    preparedByMembershipId: 'preparedByMembershipId',
    reviewedByMembershipId: 'reviewedByMembershipId',
    reviewRemarks: 'reviewRemarks'
};
exports.SiteSubmissionOrderByRelevanceFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    projectId: 'projectId',
    supervisorMembershipId: 'supervisorMembershipId',
    startChainage: 'startChainage',
    endChainage: 'endChainage',
    remarks: 'remarks'
};
exports.SiteSubmissionActivityOrderByRelevanceFieldEnum = {
    tenantId: 'tenantId',
    submissionId: 'submissionId',
    activityId: 'activityId'
};
exports.SiteSubmissionPhotoOrderByRelevanceFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    submissionId: 'submissionId',
    storageKey: 'storageKey',
    mimeType: 'mimeType'
};
exports.AttendanceSessionOrderByRelevanceFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    supervisorMembershipId: 'supervisorMembershipId',
    projectId: 'projectId',
    status: 'status',
    remarks: 'remarks'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map