import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TenantModel = runtime.Types.Result.DefaultSelection<Prisma.$TenantPayload>;
export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null;
    _min: TenantMinAggregateOutputType | null;
    _max: TenantMaxAggregateOutputType | null;
};
export type TenantMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TenantMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TenantCountAggregateOutputType = {
    id: number;
    name: number;
    slug: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type TenantMinAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TenantMaxAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TenantCountAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TenantAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TenantWhereInput;
    orderBy?: Prisma.TenantOrderByWithRelationInput | Prisma.TenantOrderByWithRelationInput[];
    cursor?: Prisma.TenantWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TenantCountAggregateInputType;
    _min?: TenantMinAggregateInputType;
    _max?: TenantMaxAggregateInputType;
};
export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
    [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTenant[P]> : Prisma.GetScalarType<T[P], AggregateTenant[P]>;
};
export type TenantGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TenantWhereInput;
    orderBy?: Prisma.TenantOrderByWithAggregationInput | Prisma.TenantOrderByWithAggregationInput[];
    by: Prisma.TenantScalarFieldEnum[] | Prisma.TenantScalarFieldEnum;
    having?: Prisma.TenantScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TenantCountAggregateInputType | true;
    _min?: TenantMinAggregateInputType;
    _max?: TenantMaxAggregateInputType;
};
export type TenantGroupByOutputType = {
    id: string;
    name: string;
    slug: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    _count: TenantCountAggregateOutputType | null;
    _min: TenantMinAggregateOutputType | null;
    _max: TenantMaxAggregateOutputType | null;
};
export type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TenantGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TenantGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TenantGroupByOutputType[P]>;
}>>;
export type TenantWhereInput = {
    AND?: Prisma.TenantWhereInput | Prisma.TenantWhereInput[];
    OR?: Prisma.TenantWhereInput[];
    NOT?: Prisma.TenantWhereInput | Prisma.TenantWhereInput[];
    id?: Prisma.StringFilter<"Tenant"> | string;
    name?: Prisma.StringFilter<"Tenant"> | string;
    slug?: Prisma.StringFilter<"Tenant"> | string;
    status?: Prisma.StringFilter<"Tenant"> | string;
    createdAt?: Prisma.DateTimeFilter<"Tenant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Tenant"> | Date | string;
    memberships?: Prisma.TenantMembershipListRelationFilter;
    roles?: Prisma.RoleListRelationFilter;
    auditLogs?: Prisma.AuditLogListRelationFilter;
    projects?: Prisma.ProjectListRelationFilter;
    activities?: Prisma.ActivityListRelationFilter;
    dprs?: Prisma.DailyProgressReportListRelationFilter;
    siteSubmissions?: Prisma.SiteSubmissionListRelationFilter;
    attendanceSessions?: Prisma.AttendanceSessionListRelationFilter;
};
export type TenantOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    memberships?: Prisma.TenantMembershipOrderByRelationAggregateInput;
    roles?: Prisma.RoleOrderByRelationAggregateInput;
    auditLogs?: Prisma.AuditLogOrderByRelationAggregateInput;
    projects?: Prisma.ProjectOrderByRelationAggregateInput;
    activities?: Prisma.ActivityOrderByRelationAggregateInput;
    dprs?: Prisma.DailyProgressReportOrderByRelationAggregateInput;
    siteSubmissions?: Prisma.SiteSubmissionOrderByRelationAggregateInput;
    attendanceSessions?: Prisma.AttendanceSessionOrderByRelationAggregateInput;
    _relevance?: Prisma.TenantOrderByRelevanceInput;
};
export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    slug?: string;
    AND?: Prisma.TenantWhereInput | Prisma.TenantWhereInput[];
    OR?: Prisma.TenantWhereInput[];
    NOT?: Prisma.TenantWhereInput | Prisma.TenantWhereInput[];
    name?: Prisma.StringFilter<"Tenant"> | string;
    status?: Prisma.StringFilter<"Tenant"> | string;
    createdAt?: Prisma.DateTimeFilter<"Tenant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Tenant"> | Date | string;
    memberships?: Prisma.TenantMembershipListRelationFilter;
    roles?: Prisma.RoleListRelationFilter;
    auditLogs?: Prisma.AuditLogListRelationFilter;
    projects?: Prisma.ProjectListRelationFilter;
    activities?: Prisma.ActivityListRelationFilter;
    dprs?: Prisma.DailyProgressReportListRelationFilter;
    siteSubmissions?: Prisma.SiteSubmissionListRelationFilter;
    attendanceSessions?: Prisma.AttendanceSessionListRelationFilter;
}, "id" | "slug">;
export type TenantOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TenantCountOrderByAggregateInput;
    _max?: Prisma.TenantMaxOrderByAggregateInput;
    _min?: Prisma.TenantMinOrderByAggregateInput;
};
export type TenantScalarWhereWithAggregatesInput = {
    AND?: Prisma.TenantScalarWhereWithAggregatesInput | Prisma.TenantScalarWhereWithAggregatesInput[];
    OR?: Prisma.TenantScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TenantScalarWhereWithAggregatesInput | Prisma.TenantScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Tenant"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Tenant"> | string;
    slug?: Prisma.StringWithAggregatesFilter<"Tenant"> | string;
    status?: Prisma.StringWithAggregatesFilter<"Tenant"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Tenant"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Tenant"> | Date | string;
};
export type TenantCreateInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: Prisma.TenantMembershipCreateNestedManyWithoutTenantInput;
    roles?: Prisma.RoleCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
    projects?: Prisma.ProjectCreateNestedManyWithoutTenantInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutTenantInput;
    dprs?: Prisma.DailyProgressReportCreateNestedManyWithoutTenantInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutTenantInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: Prisma.TenantMembershipUncheckedCreateNestedManyWithoutTenantInput;
    roles?: Prisma.RoleUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
    projects?: Prisma.ProjectUncheckedCreateNestedManyWithoutTenantInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutTenantInput;
    dprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutTenantInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutTenantInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: Prisma.TenantMembershipUpdateManyWithoutTenantNestedInput;
    roles?: Prisma.RoleUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
    projects?: Prisma.ProjectUpdateManyWithoutTenantNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutTenantNestedInput;
    dprs?: Prisma.DailyProgressReportUpdateManyWithoutTenantNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutTenantNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: Prisma.TenantMembershipUncheckedUpdateManyWithoutTenantNestedInput;
    roles?: Prisma.RoleUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
    projects?: Prisma.ProjectUncheckedUpdateManyWithoutTenantNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutTenantNestedInput;
    dprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutTenantNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutTenantNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateManyInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TenantUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TenantUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TenantOrderByRelevanceInput = {
    fields: Prisma.TenantOrderByRelevanceFieldEnum | Prisma.TenantOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type TenantCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TenantMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TenantMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TenantScalarRelationFilter = {
    is?: Prisma.TenantWhereInput;
    isNot?: Prisma.TenantWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type TenantCreateNestedOneWithoutMembershipsInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutMembershipsInput, Prisma.TenantUncheckedCreateWithoutMembershipsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutMembershipsInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutMembershipsInput, Prisma.TenantUncheckedCreateWithoutMembershipsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutMembershipsInput;
    upsert?: Prisma.TenantUpsertWithoutMembershipsInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutMembershipsInput, Prisma.TenantUpdateWithoutMembershipsInput>, Prisma.TenantUncheckedUpdateWithoutMembershipsInput>;
};
export type TenantCreateNestedOneWithoutRolesInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutRolesInput, Prisma.TenantUncheckedCreateWithoutRolesInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutRolesInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutRolesNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutRolesInput, Prisma.TenantUncheckedCreateWithoutRolesInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutRolesInput;
    upsert?: Prisma.TenantUpsertWithoutRolesInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutRolesInput, Prisma.TenantUpdateWithoutRolesInput>, Prisma.TenantUncheckedUpdateWithoutRolesInput>;
};
export type TenantCreateNestedOneWithoutAuditLogsInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutAuditLogsInput, Prisma.TenantUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutAuditLogsInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutAuditLogsInput, Prisma.TenantUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutAuditLogsInput;
    upsert?: Prisma.TenantUpsertWithoutAuditLogsInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutAuditLogsInput, Prisma.TenantUpdateWithoutAuditLogsInput>, Prisma.TenantUncheckedUpdateWithoutAuditLogsInput>;
};
export type TenantCreateNestedOneWithoutProjectsInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutProjectsInput, Prisma.TenantUncheckedCreateWithoutProjectsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutProjectsInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutProjectsInput, Prisma.TenantUncheckedCreateWithoutProjectsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutProjectsInput;
    upsert?: Prisma.TenantUpsertWithoutProjectsInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutProjectsInput, Prisma.TenantUpdateWithoutProjectsInput>, Prisma.TenantUncheckedUpdateWithoutProjectsInput>;
};
export type TenantCreateNestedOneWithoutActivitiesInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutActivitiesInput, Prisma.TenantUncheckedCreateWithoutActivitiesInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutActivitiesInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutActivitiesInput, Prisma.TenantUncheckedCreateWithoutActivitiesInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutActivitiesInput;
    upsert?: Prisma.TenantUpsertWithoutActivitiesInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutActivitiesInput, Prisma.TenantUpdateWithoutActivitiesInput>, Prisma.TenantUncheckedUpdateWithoutActivitiesInput>;
};
export type TenantCreateNestedOneWithoutDprsInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutDprsInput, Prisma.TenantUncheckedCreateWithoutDprsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutDprsInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutDprsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutDprsInput, Prisma.TenantUncheckedCreateWithoutDprsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutDprsInput;
    upsert?: Prisma.TenantUpsertWithoutDprsInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutDprsInput, Prisma.TenantUpdateWithoutDprsInput>, Prisma.TenantUncheckedUpdateWithoutDprsInput>;
};
export type TenantCreateNestedOneWithoutSiteSubmissionsInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutSiteSubmissionsInput, Prisma.TenantUncheckedCreateWithoutSiteSubmissionsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutSiteSubmissionsInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutSiteSubmissionsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutSiteSubmissionsInput, Prisma.TenantUncheckedCreateWithoutSiteSubmissionsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutSiteSubmissionsInput;
    upsert?: Prisma.TenantUpsertWithoutSiteSubmissionsInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutSiteSubmissionsInput, Prisma.TenantUpdateWithoutSiteSubmissionsInput>, Prisma.TenantUncheckedUpdateWithoutSiteSubmissionsInput>;
};
export type TenantCreateNestedOneWithoutAttendanceSessionsInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutAttendanceSessionsInput, Prisma.TenantUncheckedCreateWithoutAttendanceSessionsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutAttendanceSessionsInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutAttendanceSessionsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutAttendanceSessionsInput, Prisma.TenantUncheckedCreateWithoutAttendanceSessionsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutAttendanceSessionsInput;
    upsert?: Prisma.TenantUpsertWithoutAttendanceSessionsInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutAttendanceSessionsInput, Prisma.TenantUpdateWithoutAttendanceSessionsInput>, Prisma.TenantUncheckedUpdateWithoutAttendanceSessionsInput>;
};
export type TenantCreateWithoutMembershipsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roles?: Prisma.RoleCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
    projects?: Prisma.ProjectCreateNestedManyWithoutTenantInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutTenantInput;
    dprs?: Prisma.DailyProgressReportCreateNestedManyWithoutTenantInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutTenantInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutMembershipsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roles?: Prisma.RoleUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
    projects?: Prisma.ProjectUncheckedCreateNestedManyWithoutTenantInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutTenantInput;
    dprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutTenantInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutTenantInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutMembershipsInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutMembershipsInput, Prisma.TenantUncheckedCreateWithoutMembershipsInput>;
};
export type TenantUpsertWithoutMembershipsInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutMembershipsInput, Prisma.TenantUncheckedUpdateWithoutMembershipsInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutMembershipsInput, Prisma.TenantUncheckedCreateWithoutMembershipsInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutMembershipsInput, Prisma.TenantUncheckedUpdateWithoutMembershipsInput>;
};
export type TenantUpdateWithoutMembershipsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roles?: Prisma.RoleUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
    projects?: Prisma.ProjectUpdateManyWithoutTenantNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutTenantNestedInput;
    dprs?: Prisma.DailyProgressReportUpdateManyWithoutTenantNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutTenantNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutMembershipsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roles?: Prisma.RoleUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
    projects?: Prisma.ProjectUncheckedUpdateManyWithoutTenantNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutTenantNestedInput;
    dprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutTenantNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutTenantNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutRolesInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: Prisma.TenantMembershipCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
    projects?: Prisma.ProjectCreateNestedManyWithoutTenantInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutTenantInput;
    dprs?: Prisma.DailyProgressReportCreateNestedManyWithoutTenantInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutTenantInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutRolesInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: Prisma.TenantMembershipUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
    projects?: Prisma.ProjectUncheckedCreateNestedManyWithoutTenantInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutTenantInput;
    dprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutTenantInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutTenantInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutRolesInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutRolesInput, Prisma.TenantUncheckedCreateWithoutRolesInput>;
};
export type TenantUpsertWithoutRolesInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutRolesInput, Prisma.TenantUncheckedUpdateWithoutRolesInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutRolesInput, Prisma.TenantUncheckedCreateWithoutRolesInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutRolesInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutRolesInput, Prisma.TenantUncheckedUpdateWithoutRolesInput>;
};
export type TenantUpdateWithoutRolesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: Prisma.TenantMembershipUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
    projects?: Prisma.ProjectUpdateManyWithoutTenantNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutTenantNestedInput;
    dprs?: Prisma.DailyProgressReportUpdateManyWithoutTenantNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutTenantNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutRolesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: Prisma.TenantMembershipUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
    projects?: Prisma.ProjectUncheckedUpdateManyWithoutTenantNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutTenantNestedInput;
    dprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutTenantNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutTenantNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutAuditLogsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: Prisma.TenantMembershipCreateNestedManyWithoutTenantInput;
    roles?: Prisma.RoleCreateNestedManyWithoutTenantInput;
    projects?: Prisma.ProjectCreateNestedManyWithoutTenantInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutTenantInput;
    dprs?: Prisma.DailyProgressReportCreateNestedManyWithoutTenantInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutTenantInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutAuditLogsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: Prisma.TenantMembershipUncheckedCreateNestedManyWithoutTenantInput;
    roles?: Prisma.RoleUncheckedCreateNestedManyWithoutTenantInput;
    projects?: Prisma.ProjectUncheckedCreateNestedManyWithoutTenantInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutTenantInput;
    dprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutTenantInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutTenantInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutAuditLogsInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutAuditLogsInput, Prisma.TenantUncheckedCreateWithoutAuditLogsInput>;
};
export type TenantUpsertWithoutAuditLogsInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutAuditLogsInput, Prisma.TenantUncheckedUpdateWithoutAuditLogsInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutAuditLogsInput, Prisma.TenantUncheckedCreateWithoutAuditLogsInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutAuditLogsInput, Prisma.TenantUncheckedUpdateWithoutAuditLogsInput>;
};
export type TenantUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: Prisma.TenantMembershipUpdateManyWithoutTenantNestedInput;
    roles?: Prisma.RoleUpdateManyWithoutTenantNestedInput;
    projects?: Prisma.ProjectUpdateManyWithoutTenantNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutTenantNestedInput;
    dprs?: Prisma.DailyProgressReportUpdateManyWithoutTenantNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutTenantNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: Prisma.TenantMembershipUncheckedUpdateManyWithoutTenantNestedInput;
    roles?: Prisma.RoleUncheckedUpdateManyWithoutTenantNestedInput;
    projects?: Prisma.ProjectUncheckedUpdateManyWithoutTenantNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutTenantNestedInput;
    dprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutTenantNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutTenantNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutProjectsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: Prisma.TenantMembershipCreateNestedManyWithoutTenantInput;
    roles?: Prisma.RoleCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutTenantInput;
    dprs?: Prisma.DailyProgressReportCreateNestedManyWithoutTenantInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutTenantInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutProjectsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: Prisma.TenantMembershipUncheckedCreateNestedManyWithoutTenantInput;
    roles?: Prisma.RoleUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutTenantInput;
    dprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutTenantInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutTenantInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutProjectsInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutProjectsInput, Prisma.TenantUncheckedCreateWithoutProjectsInput>;
};
export type TenantUpsertWithoutProjectsInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutProjectsInput, Prisma.TenantUncheckedUpdateWithoutProjectsInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutProjectsInput, Prisma.TenantUncheckedCreateWithoutProjectsInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutProjectsInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutProjectsInput, Prisma.TenantUncheckedUpdateWithoutProjectsInput>;
};
export type TenantUpdateWithoutProjectsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: Prisma.TenantMembershipUpdateManyWithoutTenantNestedInput;
    roles?: Prisma.RoleUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutTenantNestedInput;
    dprs?: Prisma.DailyProgressReportUpdateManyWithoutTenantNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutTenantNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutProjectsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: Prisma.TenantMembershipUncheckedUpdateManyWithoutTenantNestedInput;
    roles?: Prisma.RoleUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutTenantNestedInput;
    dprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutTenantNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutTenantNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutActivitiesInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: Prisma.TenantMembershipCreateNestedManyWithoutTenantInput;
    roles?: Prisma.RoleCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
    projects?: Prisma.ProjectCreateNestedManyWithoutTenantInput;
    dprs?: Prisma.DailyProgressReportCreateNestedManyWithoutTenantInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutTenantInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutActivitiesInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: Prisma.TenantMembershipUncheckedCreateNestedManyWithoutTenantInput;
    roles?: Prisma.RoleUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
    projects?: Prisma.ProjectUncheckedCreateNestedManyWithoutTenantInput;
    dprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutTenantInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutTenantInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutActivitiesInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutActivitiesInput, Prisma.TenantUncheckedCreateWithoutActivitiesInput>;
};
export type TenantUpsertWithoutActivitiesInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutActivitiesInput, Prisma.TenantUncheckedUpdateWithoutActivitiesInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutActivitiesInput, Prisma.TenantUncheckedCreateWithoutActivitiesInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutActivitiesInput, Prisma.TenantUncheckedUpdateWithoutActivitiesInput>;
};
export type TenantUpdateWithoutActivitiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: Prisma.TenantMembershipUpdateManyWithoutTenantNestedInput;
    roles?: Prisma.RoleUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
    projects?: Prisma.ProjectUpdateManyWithoutTenantNestedInput;
    dprs?: Prisma.DailyProgressReportUpdateManyWithoutTenantNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutTenantNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutActivitiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: Prisma.TenantMembershipUncheckedUpdateManyWithoutTenantNestedInput;
    roles?: Prisma.RoleUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
    projects?: Prisma.ProjectUncheckedUpdateManyWithoutTenantNestedInput;
    dprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutTenantNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutTenantNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutDprsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: Prisma.TenantMembershipCreateNestedManyWithoutTenantInput;
    roles?: Prisma.RoleCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
    projects?: Prisma.ProjectCreateNestedManyWithoutTenantInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutTenantInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutTenantInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutDprsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: Prisma.TenantMembershipUncheckedCreateNestedManyWithoutTenantInput;
    roles?: Prisma.RoleUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
    projects?: Prisma.ProjectUncheckedCreateNestedManyWithoutTenantInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutTenantInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutTenantInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutDprsInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutDprsInput, Prisma.TenantUncheckedCreateWithoutDprsInput>;
};
export type TenantUpsertWithoutDprsInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutDprsInput, Prisma.TenantUncheckedUpdateWithoutDprsInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutDprsInput, Prisma.TenantUncheckedCreateWithoutDprsInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutDprsInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutDprsInput, Prisma.TenantUncheckedUpdateWithoutDprsInput>;
};
export type TenantUpdateWithoutDprsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: Prisma.TenantMembershipUpdateManyWithoutTenantNestedInput;
    roles?: Prisma.RoleUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
    projects?: Prisma.ProjectUpdateManyWithoutTenantNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutTenantNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutTenantNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutDprsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: Prisma.TenantMembershipUncheckedUpdateManyWithoutTenantNestedInput;
    roles?: Prisma.RoleUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
    projects?: Prisma.ProjectUncheckedUpdateManyWithoutTenantNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutTenantNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutTenantNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutSiteSubmissionsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: Prisma.TenantMembershipCreateNestedManyWithoutTenantInput;
    roles?: Prisma.RoleCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
    projects?: Prisma.ProjectCreateNestedManyWithoutTenantInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutTenantInput;
    dprs?: Prisma.DailyProgressReportCreateNestedManyWithoutTenantInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutSiteSubmissionsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: Prisma.TenantMembershipUncheckedCreateNestedManyWithoutTenantInput;
    roles?: Prisma.RoleUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
    projects?: Prisma.ProjectUncheckedCreateNestedManyWithoutTenantInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutTenantInput;
    dprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutTenantInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutSiteSubmissionsInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutSiteSubmissionsInput, Prisma.TenantUncheckedCreateWithoutSiteSubmissionsInput>;
};
export type TenantUpsertWithoutSiteSubmissionsInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutSiteSubmissionsInput, Prisma.TenantUncheckedUpdateWithoutSiteSubmissionsInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutSiteSubmissionsInput, Prisma.TenantUncheckedCreateWithoutSiteSubmissionsInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutSiteSubmissionsInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutSiteSubmissionsInput, Prisma.TenantUncheckedUpdateWithoutSiteSubmissionsInput>;
};
export type TenantUpdateWithoutSiteSubmissionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: Prisma.TenantMembershipUpdateManyWithoutTenantNestedInput;
    roles?: Prisma.RoleUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
    projects?: Prisma.ProjectUpdateManyWithoutTenantNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutTenantNestedInput;
    dprs?: Prisma.DailyProgressReportUpdateManyWithoutTenantNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutSiteSubmissionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: Prisma.TenantMembershipUncheckedUpdateManyWithoutTenantNestedInput;
    roles?: Prisma.RoleUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
    projects?: Prisma.ProjectUncheckedUpdateManyWithoutTenantNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutTenantNestedInput;
    dprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutTenantNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutAttendanceSessionsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: Prisma.TenantMembershipCreateNestedManyWithoutTenantInput;
    roles?: Prisma.RoleCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
    projects?: Prisma.ProjectCreateNestedManyWithoutTenantInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutTenantInput;
    dprs?: Prisma.DailyProgressReportCreateNestedManyWithoutTenantInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutAttendanceSessionsInput = {
    id?: string;
    name: string;
    slug: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: Prisma.TenantMembershipUncheckedCreateNestedManyWithoutTenantInput;
    roles?: Prisma.RoleUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
    projects?: Prisma.ProjectUncheckedCreateNestedManyWithoutTenantInput;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutTenantInput;
    dprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutTenantInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutAttendanceSessionsInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutAttendanceSessionsInput, Prisma.TenantUncheckedCreateWithoutAttendanceSessionsInput>;
};
export type TenantUpsertWithoutAttendanceSessionsInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutAttendanceSessionsInput, Prisma.TenantUncheckedUpdateWithoutAttendanceSessionsInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutAttendanceSessionsInput, Prisma.TenantUncheckedCreateWithoutAttendanceSessionsInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutAttendanceSessionsInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutAttendanceSessionsInput, Prisma.TenantUncheckedUpdateWithoutAttendanceSessionsInput>;
};
export type TenantUpdateWithoutAttendanceSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: Prisma.TenantMembershipUpdateManyWithoutTenantNestedInput;
    roles?: Prisma.RoleUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
    projects?: Prisma.ProjectUpdateManyWithoutTenantNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutTenantNestedInput;
    dprs?: Prisma.DailyProgressReportUpdateManyWithoutTenantNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutAttendanceSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: Prisma.TenantMembershipUncheckedUpdateManyWithoutTenantNestedInput;
    roles?: Prisma.RoleUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
    projects?: Prisma.ProjectUncheckedUpdateManyWithoutTenantNestedInput;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutTenantNestedInput;
    dprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutTenantNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCountOutputType = {
    memberships: number;
    roles: number;
    auditLogs: number;
    projects: number;
    activities: number;
    dprs: number;
    siteSubmissions: number;
    attendanceSessions: number;
};
export type TenantCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    memberships?: boolean | TenantCountOutputTypeCountMembershipsArgs;
    roles?: boolean | TenantCountOutputTypeCountRolesArgs;
    auditLogs?: boolean | TenantCountOutputTypeCountAuditLogsArgs;
    projects?: boolean | TenantCountOutputTypeCountProjectsArgs;
    activities?: boolean | TenantCountOutputTypeCountActivitiesArgs;
    dprs?: boolean | TenantCountOutputTypeCountDprsArgs;
    siteSubmissions?: boolean | TenantCountOutputTypeCountSiteSubmissionsArgs;
    attendanceSessions?: boolean | TenantCountOutputTypeCountAttendanceSessionsArgs;
};
export type TenantCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantCountOutputTypeSelect<ExtArgs> | null;
};
export type TenantCountOutputTypeCountMembershipsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TenantMembershipWhereInput;
};
export type TenantCountOutputTypeCountRolesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoleWhereInput;
};
export type TenantCountOutputTypeCountAuditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
};
export type TenantCountOutputTypeCountProjectsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
};
export type TenantCountOutputTypeCountActivitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ActivityWhereInput;
};
export type TenantCountOutputTypeCountDprsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DailyProgressReportWhereInput;
};
export type TenantCountOutputTypeCountSiteSubmissionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSubmissionWhereInput;
};
export type TenantCountOutputTypeCountAttendanceSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttendanceSessionWhereInput;
};
export type TenantSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    memberships?: boolean | Prisma.Tenant$membershipsArgs<ExtArgs>;
    roles?: boolean | Prisma.Tenant$rolesArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.Tenant$auditLogsArgs<ExtArgs>;
    projects?: boolean | Prisma.Tenant$projectsArgs<ExtArgs>;
    activities?: boolean | Prisma.Tenant$activitiesArgs<ExtArgs>;
    dprs?: boolean | Prisma.Tenant$dprsArgs<ExtArgs>;
    siteSubmissions?: boolean | Prisma.Tenant$siteSubmissionsArgs<ExtArgs>;
    attendanceSessions?: boolean | Prisma.Tenant$attendanceSessionsArgs<ExtArgs>;
    _count?: boolean | Prisma.TenantCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tenant"]>;
export type TenantSelectScalar = {
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type TenantOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "slug" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["tenant"]>;
export type TenantInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    memberships?: boolean | Prisma.Tenant$membershipsArgs<ExtArgs>;
    roles?: boolean | Prisma.Tenant$rolesArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.Tenant$auditLogsArgs<ExtArgs>;
    projects?: boolean | Prisma.Tenant$projectsArgs<ExtArgs>;
    activities?: boolean | Prisma.Tenant$activitiesArgs<ExtArgs>;
    dprs?: boolean | Prisma.Tenant$dprsArgs<ExtArgs>;
    siteSubmissions?: boolean | Prisma.Tenant$siteSubmissionsArgs<ExtArgs>;
    attendanceSessions?: boolean | Prisma.Tenant$attendanceSessionsArgs<ExtArgs>;
    _count?: boolean | Prisma.TenantCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $TenantPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Tenant";
    objects: {
        memberships: Prisma.$TenantMembershipPayload<ExtArgs>[];
        roles: Prisma.$RolePayload<ExtArgs>[];
        auditLogs: Prisma.$AuditLogPayload<ExtArgs>[];
        projects: Prisma.$ProjectPayload<ExtArgs>[];
        activities: Prisma.$ActivityPayload<ExtArgs>[];
        dprs: Prisma.$DailyProgressReportPayload<ExtArgs>[];
        siteSubmissions: Prisma.$SiteSubmissionPayload<ExtArgs>[];
        attendanceSessions: Prisma.$AttendanceSessionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        slug: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["tenant"]>;
    composites: {};
};
export type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TenantPayload, S>;
export type TenantCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TenantCountAggregateInputType | true;
};
export interface TenantDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Tenant'];
        meta: {
            name: 'Tenant';
        };
    };
    findUnique<T extends TenantFindUniqueArgs>(args: Prisma.SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TenantFindFirstArgs>(args?: Prisma.SelectSubset<T, TenantFindFirstArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TenantFindManyArgs>(args?: Prisma.SelectSubset<T, TenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TenantCreateArgs>(args: Prisma.SelectSubset<T, TenantCreateArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TenantCreateManyArgs>(args?: Prisma.SelectSubset<T, TenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends TenantDeleteArgs>(args: Prisma.SelectSubset<T, TenantDeleteArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TenantUpdateArgs>(args: Prisma.SelectSubset<T, TenantUpdateArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TenantDeleteManyArgs>(args?: Prisma.SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TenantUpdateManyArgs>(args: Prisma.SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends TenantUpsertArgs>(args: Prisma.SelectSubset<T, TenantUpsertArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TenantCountArgs>(args?: Prisma.Subset<T, TenantCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TenantCountAggregateOutputType> : number>;
    aggregate<T extends TenantAggregateArgs>(args: Prisma.Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>;
    groupBy<T extends TenantGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TenantGroupByArgs['orderBy'];
    } : {
        orderBy?: TenantGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TenantFieldRefs;
}
export interface Prisma__TenantClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    memberships<T extends Prisma.Tenant$membershipsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TenantMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    roles<T extends Prisma.Tenant$rolesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    auditLogs<T extends Prisma.Tenant$auditLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    projects<T extends Prisma.Tenant$projectsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    activities<T extends Prisma.Tenant$activitiesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    dprs<T extends Prisma.Tenant$dprsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$dprsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DailyProgressReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    siteSubmissions<T extends Prisma.Tenant$siteSubmissionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$siteSubmissionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    attendanceSessions<T extends Prisma.Tenant$attendanceSessionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$attendanceSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttendanceSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TenantFieldRefs {
    readonly id: Prisma.FieldRef<"Tenant", 'String'>;
    readonly name: Prisma.FieldRef<"Tenant", 'String'>;
    readonly slug: Prisma.FieldRef<"Tenant", 'String'>;
    readonly status: Prisma.FieldRef<"Tenant", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Tenant", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Tenant", 'DateTime'>;
}
export type TenantFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantSelect<ExtArgs> | null;
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    include?: Prisma.TenantInclude<ExtArgs> | null;
    where: Prisma.TenantWhereUniqueInput;
};
export type TenantFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantSelect<ExtArgs> | null;
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    include?: Prisma.TenantInclude<ExtArgs> | null;
    where: Prisma.TenantWhereUniqueInput;
};
export type TenantFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantSelect<ExtArgs> | null;
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    include?: Prisma.TenantInclude<ExtArgs> | null;
    where?: Prisma.TenantWhereInput;
    orderBy?: Prisma.TenantOrderByWithRelationInput | Prisma.TenantOrderByWithRelationInput[];
    cursor?: Prisma.TenantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TenantScalarFieldEnum | Prisma.TenantScalarFieldEnum[];
};
export type TenantFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantSelect<ExtArgs> | null;
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    include?: Prisma.TenantInclude<ExtArgs> | null;
    where?: Prisma.TenantWhereInput;
    orderBy?: Prisma.TenantOrderByWithRelationInput | Prisma.TenantOrderByWithRelationInput[];
    cursor?: Prisma.TenantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TenantScalarFieldEnum | Prisma.TenantScalarFieldEnum[];
};
export type TenantFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantSelect<ExtArgs> | null;
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    include?: Prisma.TenantInclude<ExtArgs> | null;
    where?: Prisma.TenantWhereInput;
    orderBy?: Prisma.TenantOrderByWithRelationInput | Prisma.TenantOrderByWithRelationInput[];
    cursor?: Prisma.TenantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TenantScalarFieldEnum | Prisma.TenantScalarFieldEnum[];
};
export type TenantCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantSelect<ExtArgs> | null;
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    include?: Prisma.TenantInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TenantCreateInput, Prisma.TenantUncheckedCreateInput>;
};
export type TenantCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TenantCreateManyInput | Prisma.TenantCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TenantUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantSelect<ExtArgs> | null;
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    include?: Prisma.TenantInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TenantUpdateInput, Prisma.TenantUncheckedUpdateInput>;
    where: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TenantUpdateManyMutationInput, Prisma.TenantUncheckedUpdateManyInput>;
    where?: Prisma.TenantWhereInput;
    limit?: number;
};
export type TenantUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantSelect<ExtArgs> | null;
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    include?: Prisma.TenantInclude<ExtArgs> | null;
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateInput, Prisma.TenantUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TenantUpdateInput, Prisma.TenantUncheckedUpdateInput>;
};
export type TenantDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantSelect<ExtArgs> | null;
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    include?: Prisma.TenantInclude<ExtArgs> | null;
    where: Prisma.TenantWhereUniqueInput;
};
export type TenantDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TenantWhereInput;
    limit?: number;
};
export type Tenant$membershipsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantMembershipSelect<ExtArgs> | null;
    omit?: Prisma.TenantMembershipOmit<ExtArgs> | null;
    include?: Prisma.TenantMembershipInclude<ExtArgs> | null;
    where?: Prisma.TenantMembershipWhereInput;
    orderBy?: Prisma.TenantMembershipOrderByWithRelationInput | Prisma.TenantMembershipOrderByWithRelationInput[];
    cursor?: Prisma.TenantMembershipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TenantMembershipScalarFieldEnum | Prisma.TenantMembershipScalarFieldEnum[];
};
export type Tenant$rolesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoleSelect<ExtArgs> | null;
    omit?: Prisma.RoleOmit<ExtArgs> | null;
    include?: Prisma.RoleInclude<ExtArgs> | null;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByWithRelationInput | Prisma.RoleOrderByWithRelationInput[];
    cursor?: Prisma.RoleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoleScalarFieldEnum | Prisma.RoleScalarFieldEnum[];
};
export type Tenant$auditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
export type Tenant$projectsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectScalarFieldEnum | Prisma.ProjectScalarFieldEnum[];
};
export type Tenant$activitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ActivitySelect<ExtArgs> | null;
    omit?: Prisma.ActivityOmit<ExtArgs> | null;
    include?: Prisma.ActivityInclude<ExtArgs> | null;
    where?: Prisma.ActivityWhereInput;
    orderBy?: Prisma.ActivityOrderByWithRelationInput | Prisma.ActivityOrderByWithRelationInput[];
    cursor?: Prisma.ActivityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ActivityScalarFieldEnum | Prisma.ActivityScalarFieldEnum[];
};
export type Tenant$dprsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DailyProgressReportSelect<ExtArgs> | null;
    omit?: Prisma.DailyProgressReportOmit<ExtArgs> | null;
    include?: Prisma.DailyProgressReportInclude<ExtArgs> | null;
    where?: Prisma.DailyProgressReportWhereInput;
    orderBy?: Prisma.DailyProgressReportOrderByWithRelationInput | Prisma.DailyProgressReportOrderByWithRelationInput[];
    cursor?: Prisma.DailyProgressReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DailyProgressReportScalarFieldEnum | Prisma.DailyProgressReportScalarFieldEnum[];
};
export type Tenant$siteSubmissionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionInclude<ExtArgs> | null;
    where?: Prisma.SiteSubmissionWhereInput;
    orderBy?: Prisma.SiteSubmissionOrderByWithRelationInput | Prisma.SiteSubmissionOrderByWithRelationInput[];
    cursor?: Prisma.SiteSubmissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SiteSubmissionScalarFieldEnum | Prisma.SiteSubmissionScalarFieldEnum[];
};
export type Tenant$attendanceSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendanceSessionSelect<ExtArgs> | null;
    omit?: Prisma.AttendanceSessionOmit<ExtArgs> | null;
    include?: Prisma.AttendanceSessionInclude<ExtArgs> | null;
    where?: Prisma.AttendanceSessionWhereInput;
    orderBy?: Prisma.AttendanceSessionOrderByWithRelationInput | Prisma.AttendanceSessionOrderByWithRelationInput[];
    cursor?: Prisma.AttendanceSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttendanceSessionScalarFieldEnum | Prisma.AttendanceSessionScalarFieldEnum[];
};
export type TenantDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantSelect<ExtArgs> | null;
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    include?: Prisma.TenantInclude<ExtArgs> | null;
};
