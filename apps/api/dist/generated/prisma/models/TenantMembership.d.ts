import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TenantMembershipModel = runtime.Types.Result.DefaultSelection<Prisma.$TenantMembershipPayload>;
export type AggregateTenantMembership = {
    _count: TenantMembershipCountAggregateOutputType | null;
    _min: TenantMembershipMinAggregateOutputType | null;
    _max: TenantMembershipMaxAggregateOutputType | null;
};
export type TenantMembershipMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    userId: string | null;
    membershipStatus: string | null;
    joinedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TenantMembershipMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    userId: string | null;
    membershipStatus: string | null;
    joinedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TenantMembershipCountAggregateOutputType = {
    id: number;
    tenantId: number;
    userId: number;
    membershipStatus: number;
    joinedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type TenantMembershipMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    userId?: true;
    membershipStatus?: true;
    joinedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TenantMembershipMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    userId?: true;
    membershipStatus?: true;
    joinedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TenantMembershipCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    userId?: true;
    membershipStatus?: true;
    joinedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TenantMembershipAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TenantMembershipWhereInput;
    orderBy?: Prisma.TenantMembershipOrderByWithRelationInput | Prisma.TenantMembershipOrderByWithRelationInput[];
    cursor?: Prisma.TenantMembershipWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TenantMembershipCountAggregateInputType;
    _min?: TenantMembershipMinAggregateInputType;
    _max?: TenantMembershipMaxAggregateInputType;
};
export type GetTenantMembershipAggregateType<T extends TenantMembershipAggregateArgs> = {
    [P in keyof T & keyof AggregateTenantMembership]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTenantMembership[P]> : Prisma.GetScalarType<T[P], AggregateTenantMembership[P]>;
};
export type TenantMembershipGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TenantMembershipWhereInput;
    orderBy?: Prisma.TenantMembershipOrderByWithAggregationInput | Prisma.TenantMembershipOrderByWithAggregationInput[];
    by: Prisma.TenantMembershipScalarFieldEnum[] | Prisma.TenantMembershipScalarFieldEnum;
    having?: Prisma.TenantMembershipScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TenantMembershipCountAggregateInputType | true;
    _min?: TenantMembershipMinAggregateInputType;
    _max?: TenantMembershipMaxAggregateInputType;
};
export type TenantMembershipGroupByOutputType = {
    id: string;
    tenantId: string;
    userId: string;
    membershipStatus: string;
    joinedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: TenantMembershipCountAggregateOutputType | null;
    _min: TenantMembershipMinAggregateOutputType | null;
    _max: TenantMembershipMaxAggregateOutputType | null;
};
export type GetTenantMembershipGroupByPayload<T extends TenantMembershipGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TenantMembershipGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TenantMembershipGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TenantMembershipGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TenantMembershipGroupByOutputType[P]>;
}>>;
export type TenantMembershipWhereInput = {
    AND?: Prisma.TenantMembershipWhereInput | Prisma.TenantMembershipWhereInput[];
    OR?: Prisma.TenantMembershipWhereInput[];
    NOT?: Prisma.TenantMembershipWhereInput | Prisma.TenantMembershipWhereInput[];
    id?: Prisma.StringFilter<"TenantMembership"> | string;
    tenantId?: Prisma.StringFilter<"TenantMembership"> | string;
    userId?: Prisma.StringFilter<"TenantMembership"> | string;
    membershipStatus?: Prisma.StringFilter<"TenantMembership"> | string;
    joinedAt?: Prisma.DateTimeNullableFilter<"TenantMembership"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"TenantMembership"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TenantMembership"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    membershipRoles?: Prisma.MembershipRoleListRelationFilter;
    auditLogs?: Prisma.AuditLogListRelationFilter;
    activityAssignments?: Prisma.ActivityAssignmentListRelationFilter;
    createdDprs?: Prisma.DailyProgressReportListRelationFilter;
    reviewedDprs?: Prisma.DailyProgressReportListRelationFilter;
    siteSubmissions?: Prisma.SiteSubmissionListRelationFilter;
    attendanceSessions?: Prisma.AttendanceSessionListRelationFilter;
};
export type TenantMembershipOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    membershipStatus?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    membershipRoles?: Prisma.MembershipRoleOrderByRelationAggregateInput;
    auditLogs?: Prisma.AuditLogOrderByRelationAggregateInput;
    activityAssignments?: Prisma.ActivityAssignmentOrderByRelationAggregateInput;
    createdDprs?: Prisma.DailyProgressReportOrderByRelationAggregateInput;
    reviewedDprs?: Prisma.DailyProgressReportOrderByRelationAggregateInput;
    siteSubmissions?: Prisma.SiteSubmissionOrderByRelationAggregateInput;
    attendanceSessions?: Prisma.AttendanceSessionOrderByRelationAggregateInput;
    _relevance?: Prisma.TenantMembershipOrderByRelevanceInput;
};
export type TenantMembershipWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_userId?: Prisma.TenantMembershipTenantIdUserIdCompoundUniqueInput;
    tenantId_id?: Prisma.TenantMembershipTenantIdIdCompoundUniqueInput;
    AND?: Prisma.TenantMembershipWhereInput | Prisma.TenantMembershipWhereInput[];
    OR?: Prisma.TenantMembershipWhereInput[];
    NOT?: Prisma.TenantMembershipWhereInput | Prisma.TenantMembershipWhereInput[];
    tenantId?: Prisma.StringFilter<"TenantMembership"> | string;
    userId?: Prisma.StringFilter<"TenantMembership"> | string;
    membershipStatus?: Prisma.StringFilter<"TenantMembership"> | string;
    joinedAt?: Prisma.DateTimeNullableFilter<"TenantMembership"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"TenantMembership"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TenantMembership"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    membershipRoles?: Prisma.MembershipRoleListRelationFilter;
    auditLogs?: Prisma.AuditLogListRelationFilter;
    activityAssignments?: Prisma.ActivityAssignmentListRelationFilter;
    createdDprs?: Prisma.DailyProgressReportListRelationFilter;
    reviewedDprs?: Prisma.DailyProgressReportListRelationFilter;
    siteSubmissions?: Prisma.SiteSubmissionListRelationFilter;
    attendanceSessions?: Prisma.AttendanceSessionListRelationFilter;
}, "id" | "tenantId_userId" | "tenantId_id">;
export type TenantMembershipOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    membershipStatus?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TenantMembershipCountOrderByAggregateInput;
    _max?: Prisma.TenantMembershipMaxOrderByAggregateInput;
    _min?: Prisma.TenantMembershipMinOrderByAggregateInput;
};
export type TenantMembershipScalarWhereWithAggregatesInput = {
    AND?: Prisma.TenantMembershipScalarWhereWithAggregatesInput | Prisma.TenantMembershipScalarWhereWithAggregatesInput[];
    OR?: Prisma.TenantMembershipScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TenantMembershipScalarWhereWithAggregatesInput | Prisma.TenantMembershipScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TenantMembership"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"TenantMembership"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"TenantMembership"> | string;
    membershipStatus?: Prisma.StringWithAggregatesFilter<"TenantMembership"> | string;
    joinedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"TenantMembership"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TenantMembership"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"TenantMembership"> | Date | string;
};
export type TenantMembershipCreateInput = {
    id?: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutMembershipsInput;
    user: Prisma.UserCreateNestedOneWithoutMembershipsInput;
    membershipRoles?: Prisma.MembershipRoleCreateNestedManyWithoutMembershipInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutActorMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentCreateNestedManyWithoutMembershipInput;
    createdDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutPreparedByInput;
    reviewedDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutReviewedByInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutSupervisorInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    userId: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedCreateNestedManyWithoutMembershipInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedCreateNestedManyWithoutMembershipInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutPreparedByInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutReviewedByInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutSupervisorInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutMembershipsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutMembershipsNestedInput;
    membershipRoles?: Prisma.MembershipRoleUpdateManyWithoutMembershipNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutActorMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUpdateManyWithoutMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUpdateManyWithoutPreparedByNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUpdateManyWithoutReviewedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutSupervisorNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedUpdateManyWithoutMembershipNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedUpdateManyWithoutMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutPreparedByNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutReviewedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutSupervisorNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipCreateManyInput = {
    id?: string;
    tenantId: string;
    userId: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TenantMembershipUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TenantMembershipUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TenantMembershipListRelationFilter = {
    every?: Prisma.TenantMembershipWhereInput;
    some?: Prisma.TenantMembershipWhereInput;
    none?: Prisma.TenantMembershipWhereInput;
};
export type TenantMembershipOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TenantMembershipOrderByRelevanceInput = {
    fields: Prisma.TenantMembershipOrderByRelevanceFieldEnum | Prisma.TenantMembershipOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type TenantMembershipTenantIdUserIdCompoundUniqueInput = {
    tenantId: string;
    userId: string;
};
export type TenantMembershipTenantIdIdCompoundUniqueInput = {
    tenantId: string;
    id: string;
};
export type TenantMembershipCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    membershipStatus?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TenantMembershipMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    membershipStatus?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TenantMembershipMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    membershipStatus?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TenantMembershipScalarRelationFilter = {
    is?: Prisma.TenantMembershipWhereInput;
    isNot?: Prisma.TenantMembershipWhereInput;
};
export type TenantMembershipNullableScalarRelationFilter = {
    is?: Prisma.TenantMembershipWhereInput | null;
    isNot?: Prisma.TenantMembershipWhereInput | null;
};
export type TenantMembershipCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutTenantInput, Prisma.TenantMembershipUncheckedCreateWithoutTenantInput> | Prisma.TenantMembershipCreateWithoutTenantInput[] | Prisma.TenantMembershipUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutTenantInput | Prisma.TenantMembershipCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.TenantMembershipCreateManyTenantInputEnvelope;
    connect?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
};
export type TenantMembershipUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutTenantInput, Prisma.TenantMembershipUncheckedCreateWithoutTenantInput> | Prisma.TenantMembershipCreateWithoutTenantInput[] | Prisma.TenantMembershipUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutTenantInput | Prisma.TenantMembershipCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.TenantMembershipCreateManyTenantInputEnvelope;
    connect?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
};
export type TenantMembershipUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutTenantInput, Prisma.TenantMembershipUncheckedCreateWithoutTenantInput> | Prisma.TenantMembershipCreateWithoutTenantInput[] | Prisma.TenantMembershipUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutTenantInput | Prisma.TenantMembershipCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.TenantMembershipUpsertWithWhereUniqueWithoutTenantInput | Prisma.TenantMembershipUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.TenantMembershipCreateManyTenantInputEnvelope;
    set?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
    disconnect?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
    delete?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
    connect?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
    update?: Prisma.TenantMembershipUpdateWithWhereUniqueWithoutTenantInput | Prisma.TenantMembershipUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.TenantMembershipUpdateManyWithWhereWithoutTenantInput | Prisma.TenantMembershipUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.TenantMembershipScalarWhereInput | Prisma.TenantMembershipScalarWhereInput[];
};
export type TenantMembershipUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutTenantInput, Prisma.TenantMembershipUncheckedCreateWithoutTenantInput> | Prisma.TenantMembershipCreateWithoutTenantInput[] | Prisma.TenantMembershipUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutTenantInput | Prisma.TenantMembershipCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.TenantMembershipUpsertWithWhereUniqueWithoutTenantInput | Prisma.TenantMembershipUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.TenantMembershipCreateManyTenantInputEnvelope;
    set?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
    disconnect?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
    delete?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
    connect?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
    update?: Prisma.TenantMembershipUpdateWithWhereUniqueWithoutTenantInput | Prisma.TenantMembershipUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.TenantMembershipUpdateManyWithWhereWithoutTenantInput | Prisma.TenantMembershipUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.TenantMembershipScalarWhereInput | Prisma.TenantMembershipScalarWhereInput[];
};
export type TenantMembershipCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutUserInput, Prisma.TenantMembershipUncheckedCreateWithoutUserInput> | Prisma.TenantMembershipCreateWithoutUserInput[] | Prisma.TenantMembershipUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutUserInput | Prisma.TenantMembershipCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TenantMembershipCreateManyUserInputEnvelope;
    connect?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
};
export type TenantMembershipUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutUserInput, Prisma.TenantMembershipUncheckedCreateWithoutUserInput> | Prisma.TenantMembershipCreateWithoutUserInput[] | Prisma.TenantMembershipUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutUserInput | Prisma.TenantMembershipCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TenantMembershipCreateManyUserInputEnvelope;
    connect?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
};
export type TenantMembershipUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutUserInput, Prisma.TenantMembershipUncheckedCreateWithoutUserInput> | Prisma.TenantMembershipCreateWithoutUserInput[] | Prisma.TenantMembershipUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutUserInput | Prisma.TenantMembershipCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TenantMembershipUpsertWithWhereUniqueWithoutUserInput | Prisma.TenantMembershipUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TenantMembershipCreateManyUserInputEnvelope;
    set?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
    disconnect?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
    delete?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
    connect?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
    update?: Prisma.TenantMembershipUpdateWithWhereUniqueWithoutUserInput | Prisma.TenantMembershipUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TenantMembershipUpdateManyWithWhereWithoutUserInput | Prisma.TenantMembershipUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TenantMembershipScalarWhereInput | Prisma.TenantMembershipScalarWhereInput[];
};
export type TenantMembershipUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutUserInput, Prisma.TenantMembershipUncheckedCreateWithoutUserInput> | Prisma.TenantMembershipCreateWithoutUserInput[] | Prisma.TenantMembershipUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutUserInput | Prisma.TenantMembershipCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TenantMembershipUpsertWithWhereUniqueWithoutUserInput | Prisma.TenantMembershipUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TenantMembershipCreateManyUserInputEnvelope;
    set?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
    disconnect?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
    delete?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
    connect?: Prisma.TenantMembershipWhereUniqueInput | Prisma.TenantMembershipWhereUniqueInput[];
    update?: Prisma.TenantMembershipUpdateWithWhereUniqueWithoutUserInput | Prisma.TenantMembershipUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TenantMembershipUpdateManyWithWhereWithoutUserInput | Prisma.TenantMembershipUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TenantMembershipScalarWhereInput | Prisma.TenantMembershipScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type TenantMembershipCreateNestedOneWithoutMembershipRolesInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutMembershipRolesInput, Prisma.TenantMembershipUncheckedCreateWithoutMembershipRolesInput>;
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutMembershipRolesInput;
    connect?: Prisma.TenantMembershipWhereUniqueInput;
};
export type TenantMembershipUpdateOneRequiredWithoutMembershipRolesNestedInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutMembershipRolesInput, Prisma.TenantMembershipUncheckedCreateWithoutMembershipRolesInput>;
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutMembershipRolesInput;
    upsert?: Prisma.TenantMembershipUpsertWithoutMembershipRolesInput;
    connect?: Prisma.TenantMembershipWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantMembershipUpdateToOneWithWhereWithoutMembershipRolesInput, Prisma.TenantMembershipUpdateWithoutMembershipRolesInput>, Prisma.TenantMembershipUncheckedUpdateWithoutMembershipRolesInput>;
};
export type TenantMembershipCreateNestedOneWithoutAuditLogsInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutAuditLogsInput, Prisma.TenantMembershipUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutAuditLogsInput;
    connect?: Prisma.TenantMembershipWhereUniqueInput;
};
export type TenantMembershipUpdateOneWithoutAuditLogsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutAuditLogsInput, Prisma.TenantMembershipUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutAuditLogsInput;
    upsert?: Prisma.TenantMembershipUpsertWithoutAuditLogsInput;
    disconnect?: Prisma.TenantMembershipWhereInput | boolean;
    delete?: Prisma.TenantMembershipWhereInput | boolean;
    connect?: Prisma.TenantMembershipWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantMembershipUpdateToOneWithWhereWithoutAuditLogsInput, Prisma.TenantMembershipUpdateWithoutAuditLogsInput>, Prisma.TenantMembershipUncheckedUpdateWithoutAuditLogsInput>;
};
export type TenantMembershipCreateNestedOneWithoutActivityAssignmentsInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutActivityAssignmentsInput, Prisma.TenantMembershipUncheckedCreateWithoutActivityAssignmentsInput>;
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutActivityAssignmentsInput;
    connect?: Prisma.TenantMembershipWhereUniqueInput;
};
export type TenantMembershipUpdateOneRequiredWithoutActivityAssignmentsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutActivityAssignmentsInput, Prisma.TenantMembershipUncheckedCreateWithoutActivityAssignmentsInput>;
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutActivityAssignmentsInput;
    upsert?: Prisma.TenantMembershipUpsertWithoutActivityAssignmentsInput;
    connect?: Prisma.TenantMembershipWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantMembershipUpdateToOneWithWhereWithoutActivityAssignmentsInput, Prisma.TenantMembershipUpdateWithoutActivityAssignmentsInput>, Prisma.TenantMembershipUncheckedUpdateWithoutActivityAssignmentsInput>;
};
export type TenantMembershipCreateNestedOneWithoutCreatedDprsInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutCreatedDprsInput, Prisma.TenantMembershipUncheckedCreateWithoutCreatedDprsInput>;
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutCreatedDprsInput;
    connect?: Prisma.TenantMembershipWhereUniqueInput;
};
export type TenantMembershipCreateNestedOneWithoutReviewedDprsInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutReviewedDprsInput, Prisma.TenantMembershipUncheckedCreateWithoutReviewedDprsInput>;
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutReviewedDprsInput;
    connect?: Prisma.TenantMembershipWhereUniqueInput;
};
export type TenantMembershipUpdateOneRequiredWithoutCreatedDprsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutCreatedDprsInput, Prisma.TenantMembershipUncheckedCreateWithoutCreatedDprsInput>;
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutCreatedDprsInput;
    upsert?: Prisma.TenantMembershipUpsertWithoutCreatedDprsInput;
    connect?: Prisma.TenantMembershipWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantMembershipUpdateToOneWithWhereWithoutCreatedDprsInput, Prisma.TenantMembershipUpdateWithoutCreatedDprsInput>, Prisma.TenantMembershipUncheckedUpdateWithoutCreatedDprsInput>;
};
export type TenantMembershipUpdateOneWithoutReviewedDprsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutReviewedDprsInput, Prisma.TenantMembershipUncheckedCreateWithoutReviewedDprsInput>;
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutReviewedDprsInput;
    upsert?: Prisma.TenantMembershipUpsertWithoutReviewedDprsInput;
    disconnect?: Prisma.TenantMembershipWhereInput | boolean;
    delete?: Prisma.TenantMembershipWhereInput | boolean;
    connect?: Prisma.TenantMembershipWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantMembershipUpdateToOneWithWhereWithoutReviewedDprsInput, Prisma.TenantMembershipUpdateWithoutReviewedDprsInput>, Prisma.TenantMembershipUncheckedUpdateWithoutReviewedDprsInput>;
};
export type TenantMembershipCreateNestedOneWithoutSiteSubmissionsInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutSiteSubmissionsInput, Prisma.TenantMembershipUncheckedCreateWithoutSiteSubmissionsInput>;
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutSiteSubmissionsInput;
    connect?: Prisma.TenantMembershipWhereUniqueInput;
};
export type TenantMembershipUpdateOneRequiredWithoutSiteSubmissionsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutSiteSubmissionsInput, Prisma.TenantMembershipUncheckedCreateWithoutSiteSubmissionsInput>;
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutSiteSubmissionsInput;
    upsert?: Prisma.TenantMembershipUpsertWithoutSiteSubmissionsInput;
    connect?: Prisma.TenantMembershipWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantMembershipUpdateToOneWithWhereWithoutSiteSubmissionsInput, Prisma.TenantMembershipUpdateWithoutSiteSubmissionsInput>, Prisma.TenantMembershipUncheckedUpdateWithoutSiteSubmissionsInput>;
};
export type TenantMembershipCreateNestedOneWithoutAttendanceSessionsInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutAttendanceSessionsInput, Prisma.TenantMembershipUncheckedCreateWithoutAttendanceSessionsInput>;
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutAttendanceSessionsInput;
    connect?: Prisma.TenantMembershipWhereUniqueInput;
};
export type TenantMembershipUpdateOneRequiredWithoutAttendanceSessionsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantMembershipCreateWithoutAttendanceSessionsInput, Prisma.TenantMembershipUncheckedCreateWithoutAttendanceSessionsInput>;
    connectOrCreate?: Prisma.TenantMembershipCreateOrConnectWithoutAttendanceSessionsInput;
    upsert?: Prisma.TenantMembershipUpsertWithoutAttendanceSessionsInput;
    connect?: Prisma.TenantMembershipWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantMembershipUpdateToOneWithWhereWithoutAttendanceSessionsInput, Prisma.TenantMembershipUpdateWithoutAttendanceSessionsInput>, Prisma.TenantMembershipUncheckedUpdateWithoutAttendanceSessionsInput>;
};
export type TenantMembershipCreateWithoutTenantInput = {
    id?: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutMembershipsInput;
    membershipRoles?: Prisma.MembershipRoleCreateNestedManyWithoutMembershipInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutActorMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentCreateNestedManyWithoutMembershipInput;
    createdDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutPreparedByInput;
    reviewedDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutReviewedByInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutSupervisorInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipUncheckedCreateWithoutTenantInput = {
    id?: string;
    userId: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedCreateNestedManyWithoutMembershipInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedCreateNestedManyWithoutMembershipInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutPreparedByInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutReviewedByInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutSupervisorInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipCreateOrConnectWithoutTenantInput = {
    where: Prisma.TenantMembershipWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutTenantInput, Prisma.TenantMembershipUncheckedCreateWithoutTenantInput>;
};
export type TenantMembershipCreateManyTenantInputEnvelope = {
    data: Prisma.TenantMembershipCreateManyTenantInput | Prisma.TenantMembershipCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type TenantMembershipUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.TenantMembershipWhereUniqueInput;
    update: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutTenantInput, Prisma.TenantMembershipUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutTenantInput, Prisma.TenantMembershipUncheckedCreateWithoutTenantInput>;
};
export type TenantMembershipUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.TenantMembershipWhereUniqueInput;
    data: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutTenantInput, Prisma.TenantMembershipUncheckedUpdateWithoutTenantInput>;
};
export type TenantMembershipUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.TenantMembershipScalarWhereInput;
    data: Prisma.XOR<Prisma.TenantMembershipUpdateManyMutationInput, Prisma.TenantMembershipUncheckedUpdateManyWithoutTenantInput>;
};
export type TenantMembershipScalarWhereInput = {
    AND?: Prisma.TenantMembershipScalarWhereInput | Prisma.TenantMembershipScalarWhereInput[];
    OR?: Prisma.TenantMembershipScalarWhereInput[];
    NOT?: Prisma.TenantMembershipScalarWhereInput | Prisma.TenantMembershipScalarWhereInput[];
    id?: Prisma.StringFilter<"TenantMembership"> | string;
    tenantId?: Prisma.StringFilter<"TenantMembership"> | string;
    userId?: Prisma.StringFilter<"TenantMembership"> | string;
    membershipStatus?: Prisma.StringFilter<"TenantMembership"> | string;
    joinedAt?: Prisma.DateTimeNullableFilter<"TenantMembership"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"TenantMembership"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TenantMembership"> | Date | string;
};
export type TenantMembershipCreateWithoutUserInput = {
    id?: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutMembershipsInput;
    membershipRoles?: Prisma.MembershipRoleCreateNestedManyWithoutMembershipInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutActorMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentCreateNestedManyWithoutMembershipInput;
    createdDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutPreparedByInput;
    reviewedDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutReviewedByInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutSupervisorInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipUncheckedCreateWithoutUserInput = {
    id?: string;
    tenantId: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedCreateNestedManyWithoutMembershipInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedCreateNestedManyWithoutMembershipInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutPreparedByInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutReviewedByInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutSupervisorInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipCreateOrConnectWithoutUserInput = {
    where: Prisma.TenantMembershipWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutUserInput, Prisma.TenantMembershipUncheckedCreateWithoutUserInput>;
};
export type TenantMembershipCreateManyUserInputEnvelope = {
    data: Prisma.TenantMembershipCreateManyUserInput | Prisma.TenantMembershipCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type TenantMembershipUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.TenantMembershipWhereUniqueInput;
    update: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutUserInput, Prisma.TenantMembershipUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutUserInput, Prisma.TenantMembershipUncheckedCreateWithoutUserInput>;
};
export type TenantMembershipUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.TenantMembershipWhereUniqueInput;
    data: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutUserInput, Prisma.TenantMembershipUncheckedUpdateWithoutUserInput>;
};
export type TenantMembershipUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.TenantMembershipScalarWhereInput;
    data: Prisma.XOR<Prisma.TenantMembershipUpdateManyMutationInput, Prisma.TenantMembershipUncheckedUpdateManyWithoutUserInput>;
};
export type TenantMembershipCreateWithoutMembershipRolesInput = {
    id?: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutMembershipsInput;
    user: Prisma.UserCreateNestedOneWithoutMembershipsInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutActorMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentCreateNestedManyWithoutMembershipInput;
    createdDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutPreparedByInput;
    reviewedDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutReviewedByInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutSupervisorInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipUncheckedCreateWithoutMembershipRolesInput = {
    id?: string;
    tenantId: string;
    userId: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedCreateNestedManyWithoutMembershipInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutPreparedByInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutReviewedByInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutSupervisorInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipCreateOrConnectWithoutMembershipRolesInput = {
    where: Prisma.TenantMembershipWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutMembershipRolesInput, Prisma.TenantMembershipUncheckedCreateWithoutMembershipRolesInput>;
};
export type TenantMembershipUpsertWithoutMembershipRolesInput = {
    update: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutMembershipRolesInput, Prisma.TenantMembershipUncheckedUpdateWithoutMembershipRolesInput>;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutMembershipRolesInput, Prisma.TenantMembershipUncheckedCreateWithoutMembershipRolesInput>;
    where?: Prisma.TenantMembershipWhereInput;
};
export type TenantMembershipUpdateToOneWithWhereWithoutMembershipRolesInput = {
    where?: Prisma.TenantMembershipWhereInput;
    data: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutMembershipRolesInput, Prisma.TenantMembershipUncheckedUpdateWithoutMembershipRolesInput>;
};
export type TenantMembershipUpdateWithoutMembershipRolesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutMembershipsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutMembershipsNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutActorMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUpdateManyWithoutMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUpdateManyWithoutPreparedByNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUpdateManyWithoutReviewedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutSupervisorNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipUncheckedUpdateWithoutMembershipRolesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedUpdateManyWithoutMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutPreparedByNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutReviewedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutSupervisorNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipCreateWithoutAuditLogsInput = {
    id?: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutMembershipsInput;
    user: Prisma.UserCreateNestedOneWithoutMembershipsInput;
    membershipRoles?: Prisma.MembershipRoleCreateNestedManyWithoutMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentCreateNestedManyWithoutMembershipInput;
    createdDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutPreparedByInput;
    reviewedDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutReviewedByInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutSupervisorInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipUncheckedCreateWithoutAuditLogsInput = {
    id?: string;
    tenantId: string;
    userId: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedCreateNestedManyWithoutMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedCreateNestedManyWithoutMembershipInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutPreparedByInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutReviewedByInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutSupervisorInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipCreateOrConnectWithoutAuditLogsInput = {
    where: Prisma.TenantMembershipWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutAuditLogsInput, Prisma.TenantMembershipUncheckedCreateWithoutAuditLogsInput>;
};
export type TenantMembershipUpsertWithoutAuditLogsInput = {
    update: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutAuditLogsInput, Prisma.TenantMembershipUncheckedUpdateWithoutAuditLogsInput>;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutAuditLogsInput, Prisma.TenantMembershipUncheckedCreateWithoutAuditLogsInput>;
    where?: Prisma.TenantMembershipWhereInput;
};
export type TenantMembershipUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: Prisma.TenantMembershipWhereInput;
    data: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutAuditLogsInput, Prisma.TenantMembershipUncheckedUpdateWithoutAuditLogsInput>;
};
export type TenantMembershipUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutMembershipsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutMembershipsNestedInput;
    membershipRoles?: Prisma.MembershipRoleUpdateManyWithoutMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUpdateManyWithoutMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUpdateManyWithoutPreparedByNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUpdateManyWithoutReviewedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutSupervisorNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipUncheckedUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedUpdateManyWithoutMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedUpdateManyWithoutMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutPreparedByNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutReviewedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutSupervisorNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipCreateWithoutActivityAssignmentsInput = {
    id?: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutMembershipsInput;
    user: Prisma.UserCreateNestedOneWithoutMembershipsInput;
    membershipRoles?: Prisma.MembershipRoleCreateNestedManyWithoutMembershipInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutActorMembershipInput;
    createdDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutPreparedByInput;
    reviewedDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutReviewedByInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutSupervisorInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipUncheckedCreateWithoutActivityAssignmentsInput = {
    id?: string;
    tenantId: string;
    userId: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedCreateNestedManyWithoutMembershipInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorMembershipInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutPreparedByInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutReviewedByInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutSupervisorInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipCreateOrConnectWithoutActivityAssignmentsInput = {
    where: Prisma.TenantMembershipWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutActivityAssignmentsInput, Prisma.TenantMembershipUncheckedCreateWithoutActivityAssignmentsInput>;
};
export type TenantMembershipUpsertWithoutActivityAssignmentsInput = {
    update: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutActivityAssignmentsInput, Prisma.TenantMembershipUncheckedUpdateWithoutActivityAssignmentsInput>;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutActivityAssignmentsInput, Prisma.TenantMembershipUncheckedCreateWithoutActivityAssignmentsInput>;
    where?: Prisma.TenantMembershipWhereInput;
};
export type TenantMembershipUpdateToOneWithWhereWithoutActivityAssignmentsInput = {
    where?: Prisma.TenantMembershipWhereInput;
    data: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutActivityAssignmentsInput, Prisma.TenantMembershipUncheckedUpdateWithoutActivityAssignmentsInput>;
};
export type TenantMembershipUpdateWithoutActivityAssignmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutMembershipsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutMembershipsNestedInput;
    membershipRoles?: Prisma.MembershipRoleUpdateManyWithoutMembershipNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutActorMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUpdateManyWithoutPreparedByNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUpdateManyWithoutReviewedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutSupervisorNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipUncheckedUpdateWithoutActivityAssignmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedUpdateManyWithoutMembershipNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutPreparedByNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutReviewedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutSupervisorNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipCreateWithoutCreatedDprsInput = {
    id?: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutMembershipsInput;
    user: Prisma.UserCreateNestedOneWithoutMembershipsInput;
    membershipRoles?: Prisma.MembershipRoleCreateNestedManyWithoutMembershipInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutActorMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentCreateNestedManyWithoutMembershipInput;
    reviewedDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutReviewedByInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutSupervisorInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipUncheckedCreateWithoutCreatedDprsInput = {
    id?: string;
    tenantId: string;
    userId: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedCreateNestedManyWithoutMembershipInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedCreateNestedManyWithoutMembershipInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutReviewedByInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutSupervisorInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipCreateOrConnectWithoutCreatedDprsInput = {
    where: Prisma.TenantMembershipWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutCreatedDprsInput, Prisma.TenantMembershipUncheckedCreateWithoutCreatedDprsInput>;
};
export type TenantMembershipCreateWithoutReviewedDprsInput = {
    id?: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutMembershipsInput;
    user: Prisma.UserCreateNestedOneWithoutMembershipsInput;
    membershipRoles?: Prisma.MembershipRoleCreateNestedManyWithoutMembershipInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutActorMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentCreateNestedManyWithoutMembershipInput;
    createdDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutPreparedByInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutSupervisorInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipUncheckedCreateWithoutReviewedDprsInput = {
    id?: string;
    tenantId: string;
    userId: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedCreateNestedManyWithoutMembershipInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedCreateNestedManyWithoutMembershipInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutPreparedByInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutSupervisorInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipCreateOrConnectWithoutReviewedDprsInput = {
    where: Prisma.TenantMembershipWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutReviewedDprsInput, Prisma.TenantMembershipUncheckedCreateWithoutReviewedDprsInput>;
};
export type TenantMembershipUpsertWithoutCreatedDprsInput = {
    update: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutCreatedDprsInput, Prisma.TenantMembershipUncheckedUpdateWithoutCreatedDprsInput>;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutCreatedDprsInput, Prisma.TenantMembershipUncheckedCreateWithoutCreatedDprsInput>;
    where?: Prisma.TenantMembershipWhereInput;
};
export type TenantMembershipUpdateToOneWithWhereWithoutCreatedDprsInput = {
    where?: Prisma.TenantMembershipWhereInput;
    data: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutCreatedDprsInput, Prisma.TenantMembershipUncheckedUpdateWithoutCreatedDprsInput>;
};
export type TenantMembershipUpdateWithoutCreatedDprsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutMembershipsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutMembershipsNestedInput;
    membershipRoles?: Prisma.MembershipRoleUpdateManyWithoutMembershipNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutActorMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUpdateManyWithoutMembershipNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUpdateManyWithoutReviewedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutSupervisorNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipUncheckedUpdateWithoutCreatedDprsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedUpdateManyWithoutMembershipNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedUpdateManyWithoutMembershipNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutReviewedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutSupervisorNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipUpsertWithoutReviewedDprsInput = {
    update: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutReviewedDprsInput, Prisma.TenantMembershipUncheckedUpdateWithoutReviewedDprsInput>;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutReviewedDprsInput, Prisma.TenantMembershipUncheckedCreateWithoutReviewedDprsInput>;
    where?: Prisma.TenantMembershipWhereInput;
};
export type TenantMembershipUpdateToOneWithWhereWithoutReviewedDprsInput = {
    where?: Prisma.TenantMembershipWhereInput;
    data: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutReviewedDprsInput, Prisma.TenantMembershipUncheckedUpdateWithoutReviewedDprsInput>;
};
export type TenantMembershipUpdateWithoutReviewedDprsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutMembershipsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutMembershipsNestedInput;
    membershipRoles?: Prisma.MembershipRoleUpdateManyWithoutMembershipNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutActorMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUpdateManyWithoutMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUpdateManyWithoutPreparedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutSupervisorNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipUncheckedUpdateWithoutReviewedDprsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedUpdateManyWithoutMembershipNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedUpdateManyWithoutMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutPreparedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutSupervisorNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipCreateWithoutSiteSubmissionsInput = {
    id?: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutMembershipsInput;
    user: Prisma.UserCreateNestedOneWithoutMembershipsInput;
    membershipRoles?: Prisma.MembershipRoleCreateNestedManyWithoutMembershipInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutActorMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentCreateNestedManyWithoutMembershipInput;
    createdDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutPreparedByInput;
    reviewedDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutReviewedByInput;
    attendanceSessions?: Prisma.AttendanceSessionCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipUncheckedCreateWithoutSiteSubmissionsInput = {
    id?: string;
    tenantId: string;
    userId: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedCreateNestedManyWithoutMembershipInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedCreateNestedManyWithoutMembershipInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutPreparedByInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutReviewedByInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipCreateOrConnectWithoutSiteSubmissionsInput = {
    where: Prisma.TenantMembershipWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutSiteSubmissionsInput, Prisma.TenantMembershipUncheckedCreateWithoutSiteSubmissionsInput>;
};
export type TenantMembershipUpsertWithoutSiteSubmissionsInput = {
    update: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutSiteSubmissionsInput, Prisma.TenantMembershipUncheckedUpdateWithoutSiteSubmissionsInput>;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutSiteSubmissionsInput, Prisma.TenantMembershipUncheckedCreateWithoutSiteSubmissionsInput>;
    where?: Prisma.TenantMembershipWhereInput;
};
export type TenantMembershipUpdateToOneWithWhereWithoutSiteSubmissionsInput = {
    where?: Prisma.TenantMembershipWhereInput;
    data: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutSiteSubmissionsInput, Prisma.TenantMembershipUncheckedUpdateWithoutSiteSubmissionsInput>;
};
export type TenantMembershipUpdateWithoutSiteSubmissionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutMembershipsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutMembershipsNestedInput;
    membershipRoles?: Prisma.MembershipRoleUpdateManyWithoutMembershipNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutActorMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUpdateManyWithoutMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUpdateManyWithoutPreparedByNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUpdateManyWithoutReviewedByNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipUncheckedUpdateWithoutSiteSubmissionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedUpdateManyWithoutMembershipNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedUpdateManyWithoutMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutPreparedByNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutReviewedByNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipCreateWithoutAttendanceSessionsInput = {
    id?: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutMembershipsInput;
    user: Prisma.UserCreateNestedOneWithoutMembershipsInput;
    membershipRoles?: Prisma.MembershipRoleCreateNestedManyWithoutMembershipInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutActorMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentCreateNestedManyWithoutMembershipInput;
    createdDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutPreparedByInput;
    reviewedDprs?: Prisma.DailyProgressReportCreateNestedManyWithoutReviewedByInput;
    siteSubmissions?: Prisma.SiteSubmissionCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipUncheckedCreateWithoutAttendanceSessionsInput = {
    id?: string;
    tenantId: string;
    userId: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedCreateNestedManyWithoutMembershipInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorMembershipInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedCreateNestedManyWithoutMembershipInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutPreparedByInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedCreateNestedManyWithoutReviewedByInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedCreateNestedManyWithoutSupervisorInput;
};
export type TenantMembershipCreateOrConnectWithoutAttendanceSessionsInput = {
    where: Prisma.TenantMembershipWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutAttendanceSessionsInput, Prisma.TenantMembershipUncheckedCreateWithoutAttendanceSessionsInput>;
};
export type TenantMembershipUpsertWithoutAttendanceSessionsInput = {
    update: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutAttendanceSessionsInput, Prisma.TenantMembershipUncheckedUpdateWithoutAttendanceSessionsInput>;
    create: Prisma.XOR<Prisma.TenantMembershipCreateWithoutAttendanceSessionsInput, Prisma.TenantMembershipUncheckedCreateWithoutAttendanceSessionsInput>;
    where?: Prisma.TenantMembershipWhereInput;
};
export type TenantMembershipUpdateToOneWithWhereWithoutAttendanceSessionsInput = {
    where?: Prisma.TenantMembershipWhereInput;
    data: Prisma.XOR<Prisma.TenantMembershipUpdateWithoutAttendanceSessionsInput, Prisma.TenantMembershipUncheckedUpdateWithoutAttendanceSessionsInput>;
};
export type TenantMembershipUpdateWithoutAttendanceSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutMembershipsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutMembershipsNestedInput;
    membershipRoles?: Prisma.MembershipRoleUpdateManyWithoutMembershipNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutActorMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUpdateManyWithoutMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUpdateManyWithoutPreparedByNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUpdateManyWithoutReviewedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipUncheckedUpdateWithoutAttendanceSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedUpdateManyWithoutMembershipNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedUpdateManyWithoutMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutPreparedByNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutReviewedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipCreateManyTenantInput = {
    id?: string;
    userId: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TenantMembershipUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutMembershipsNestedInput;
    membershipRoles?: Prisma.MembershipRoleUpdateManyWithoutMembershipNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutActorMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUpdateManyWithoutMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUpdateManyWithoutPreparedByNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUpdateManyWithoutReviewedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutSupervisorNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedUpdateManyWithoutMembershipNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedUpdateManyWithoutMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutPreparedByNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutReviewedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutSupervisorNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TenantMembershipCreateManyUserInput = {
    id?: string;
    tenantId: string;
    membershipStatus?: string;
    joinedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TenantMembershipUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutMembershipsNestedInput;
    membershipRoles?: Prisma.MembershipRoleUpdateManyWithoutMembershipNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutActorMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUpdateManyWithoutMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUpdateManyWithoutPreparedByNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUpdateManyWithoutReviewedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUpdateManyWithoutSupervisorNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    membershipRoles?: Prisma.MembershipRoleUncheckedUpdateManyWithoutMembershipNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorMembershipNestedInput;
    activityAssignments?: Prisma.ActivityAssignmentUncheckedUpdateManyWithoutMembershipNestedInput;
    createdDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutPreparedByNestedInput;
    reviewedDprs?: Prisma.DailyProgressReportUncheckedUpdateManyWithoutReviewedByNestedInput;
    siteSubmissions?: Prisma.SiteSubmissionUncheckedUpdateManyWithoutSupervisorNestedInput;
    attendanceSessions?: Prisma.AttendanceSessionUncheckedUpdateManyWithoutSupervisorNestedInput;
};
export type TenantMembershipUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    membershipStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TenantMembershipCountOutputType = {
    membershipRoles: number;
    auditLogs: number;
    activityAssignments: number;
    createdDprs: number;
    reviewedDprs: number;
    siteSubmissions: number;
    attendanceSessions: number;
};
export type TenantMembershipCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    membershipRoles?: boolean | TenantMembershipCountOutputTypeCountMembershipRolesArgs;
    auditLogs?: boolean | TenantMembershipCountOutputTypeCountAuditLogsArgs;
    activityAssignments?: boolean | TenantMembershipCountOutputTypeCountActivityAssignmentsArgs;
    createdDprs?: boolean | TenantMembershipCountOutputTypeCountCreatedDprsArgs;
    reviewedDprs?: boolean | TenantMembershipCountOutputTypeCountReviewedDprsArgs;
    siteSubmissions?: boolean | TenantMembershipCountOutputTypeCountSiteSubmissionsArgs;
    attendanceSessions?: boolean | TenantMembershipCountOutputTypeCountAttendanceSessionsArgs;
};
export type TenantMembershipCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantMembershipCountOutputTypeSelect<ExtArgs> | null;
};
export type TenantMembershipCountOutputTypeCountMembershipRolesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MembershipRoleWhereInput;
};
export type TenantMembershipCountOutputTypeCountAuditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
};
export type TenantMembershipCountOutputTypeCountActivityAssignmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ActivityAssignmentWhereInput;
};
export type TenantMembershipCountOutputTypeCountCreatedDprsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DailyProgressReportWhereInput;
};
export type TenantMembershipCountOutputTypeCountReviewedDprsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DailyProgressReportWhereInput;
};
export type TenantMembershipCountOutputTypeCountSiteSubmissionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSubmissionWhereInput;
};
export type TenantMembershipCountOutputTypeCountAttendanceSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttendanceSessionWhereInput;
};
export type TenantMembershipSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    userId?: boolean;
    membershipStatus?: boolean;
    joinedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    membershipRoles?: boolean | Prisma.TenantMembership$membershipRolesArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.TenantMembership$auditLogsArgs<ExtArgs>;
    activityAssignments?: boolean | Prisma.TenantMembership$activityAssignmentsArgs<ExtArgs>;
    createdDprs?: boolean | Prisma.TenantMembership$createdDprsArgs<ExtArgs>;
    reviewedDprs?: boolean | Prisma.TenantMembership$reviewedDprsArgs<ExtArgs>;
    siteSubmissions?: boolean | Prisma.TenantMembership$siteSubmissionsArgs<ExtArgs>;
    attendanceSessions?: boolean | Prisma.TenantMembership$attendanceSessionsArgs<ExtArgs>;
    _count?: boolean | Prisma.TenantMembershipCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tenantMembership"]>;
export type TenantMembershipSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    userId?: boolean;
    membershipStatus?: boolean;
    joinedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type TenantMembershipOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "userId" | "membershipStatus" | "joinedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["tenantMembership"]>;
export type TenantMembershipInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    membershipRoles?: boolean | Prisma.TenantMembership$membershipRolesArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.TenantMembership$auditLogsArgs<ExtArgs>;
    activityAssignments?: boolean | Prisma.TenantMembership$activityAssignmentsArgs<ExtArgs>;
    createdDprs?: boolean | Prisma.TenantMembership$createdDprsArgs<ExtArgs>;
    reviewedDprs?: boolean | Prisma.TenantMembership$reviewedDprsArgs<ExtArgs>;
    siteSubmissions?: boolean | Prisma.TenantMembership$siteSubmissionsArgs<ExtArgs>;
    attendanceSessions?: boolean | Prisma.TenantMembership$attendanceSessionsArgs<ExtArgs>;
    _count?: boolean | Prisma.TenantMembershipCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $TenantMembershipPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TenantMembership";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        membershipRoles: Prisma.$MembershipRolePayload<ExtArgs>[];
        auditLogs: Prisma.$AuditLogPayload<ExtArgs>[];
        activityAssignments: Prisma.$ActivityAssignmentPayload<ExtArgs>[];
        createdDprs: Prisma.$DailyProgressReportPayload<ExtArgs>[];
        reviewedDprs: Prisma.$DailyProgressReportPayload<ExtArgs>[];
        siteSubmissions: Prisma.$SiteSubmissionPayload<ExtArgs>[];
        attendanceSessions: Prisma.$AttendanceSessionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        userId: string;
        membershipStatus: string;
        joinedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["tenantMembership"]>;
    composites: {};
};
export type TenantMembershipGetPayload<S extends boolean | null | undefined | TenantMembershipDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TenantMembershipPayload, S>;
export type TenantMembershipCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TenantMembershipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TenantMembershipCountAggregateInputType | true;
};
export interface TenantMembershipDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TenantMembership'];
        meta: {
            name: 'TenantMembership';
        };
    };
    findUnique<T extends TenantMembershipFindUniqueArgs>(args: Prisma.SelectSubset<T, TenantMembershipFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TenantMembershipClient<runtime.Types.Result.GetResult<Prisma.$TenantMembershipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TenantMembershipFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TenantMembershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TenantMembershipClient<runtime.Types.Result.GetResult<Prisma.$TenantMembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TenantMembershipFindFirstArgs>(args?: Prisma.SelectSubset<T, TenantMembershipFindFirstArgs<ExtArgs>>): Prisma.Prisma__TenantMembershipClient<runtime.Types.Result.GetResult<Prisma.$TenantMembershipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TenantMembershipFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TenantMembershipFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TenantMembershipClient<runtime.Types.Result.GetResult<Prisma.$TenantMembershipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TenantMembershipFindManyArgs>(args?: Prisma.SelectSubset<T, TenantMembershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TenantMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TenantMembershipCreateArgs>(args: Prisma.SelectSubset<T, TenantMembershipCreateArgs<ExtArgs>>): Prisma.Prisma__TenantMembershipClient<runtime.Types.Result.GetResult<Prisma.$TenantMembershipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TenantMembershipCreateManyArgs>(args?: Prisma.SelectSubset<T, TenantMembershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends TenantMembershipDeleteArgs>(args: Prisma.SelectSubset<T, TenantMembershipDeleteArgs<ExtArgs>>): Prisma.Prisma__TenantMembershipClient<runtime.Types.Result.GetResult<Prisma.$TenantMembershipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TenantMembershipUpdateArgs>(args: Prisma.SelectSubset<T, TenantMembershipUpdateArgs<ExtArgs>>): Prisma.Prisma__TenantMembershipClient<runtime.Types.Result.GetResult<Prisma.$TenantMembershipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TenantMembershipDeleteManyArgs>(args?: Prisma.SelectSubset<T, TenantMembershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TenantMembershipUpdateManyArgs>(args: Prisma.SelectSubset<T, TenantMembershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends TenantMembershipUpsertArgs>(args: Prisma.SelectSubset<T, TenantMembershipUpsertArgs<ExtArgs>>): Prisma.Prisma__TenantMembershipClient<runtime.Types.Result.GetResult<Prisma.$TenantMembershipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TenantMembershipCountArgs>(args?: Prisma.Subset<T, TenantMembershipCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TenantMembershipCountAggregateOutputType> : number>;
    aggregate<T extends TenantMembershipAggregateArgs>(args: Prisma.Subset<T, TenantMembershipAggregateArgs>): Prisma.PrismaPromise<GetTenantMembershipAggregateType<T>>;
    groupBy<T extends TenantMembershipGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TenantMembershipGroupByArgs['orderBy'];
    } : {
        orderBy?: TenantMembershipGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TenantMembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantMembershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TenantMembershipFieldRefs;
}
export interface Prisma__TenantMembershipClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    membershipRoles<T extends Prisma.TenantMembership$membershipRolesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantMembership$membershipRolesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MembershipRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    auditLogs<T extends Prisma.TenantMembership$auditLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantMembership$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    activityAssignments<T extends Prisma.TenantMembership$activityAssignmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantMembership$activityAssignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ActivityAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    createdDprs<T extends Prisma.TenantMembership$createdDprsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantMembership$createdDprsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DailyProgressReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reviewedDprs<T extends Prisma.TenantMembership$reviewedDprsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantMembership$reviewedDprsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DailyProgressReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    siteSubmissions<T extends Prisma.TenantMembership$siteSubmissionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantMembership$siteSubmissionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    attendanceSessions<T extends Prisma.TenantMembership$attendanceSessionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantMembership$attendanceSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttendanceSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TenantMembershipFieldRefs {
    readonly id: Prisma.FieldRef<"TenantMembership", 'String'>;
    readonly tenantId: Prisma.FieldRef<"TenantMembership", 'String'>;
    readonly userId: Prisma.FieldRef<"TenantMembership", 'String'>;
    readonly membershipStatus: Prisma.FieldRef<"TenantMembership", 'String'>;
    readonly joinedAt: Prisma.FieldRef<"TenantMembership", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"TenantMembership", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"TenantMembership", 'DateTime'>;
}
export type TenantMembershipFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantMembershipSelect<ExtArgs> | null;
    omit?: Prisma.TenantMembershipOmit<ExtArgs> | null;
    include?: Prisma.TenantMembershipInclude<ExtArgs> | null;
    where: Prisma.TenantMembershipWhereUniqueInput;
};
export type TenantMembershipFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantMembershipSelect<ExtArgs> | null;
    omit?: Prisma.TenantMembershipOmit<ExtArgs> | null;
    include?: Prisma.TenantMembershipInclude<ExtArgs> | null;
    where: Prisma.TenantMembershipWhereUniqueInput;
};
export type TenantMembershipFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TenantMembershipFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TenantMembershipFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TenantMembershipCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantMembershipSelect<ExtArgs> | null;
    omit?: Prisma.TenantMembershipOmit<ExtArgs> | null;
    include?: Prisma.TenantMembershipInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TenantMembershipCreateInput, Prisma.TenantMembershipUncheckedCreateInput>;
};
export type TenantMembershipCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TenantMembershipCreateManyInput | Prisma.TenantMembershipCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TenantMembershipUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantMembershipSelect<ExtArgs> | null;
    omit?: Prisma.TenantMembershipOmit<ExtArgs> | null;
    include?: Prisma.TenantMembershipInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TenantMembershipUpdateInput, Prisma.TenantMembershipUncheckedUpdateInput>;
    where: Prisma.TenantMembershipWhereUniqueInput;
};
export type TenantMembershipUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TenantMembershipUpdateManyMutationInput, Prisma.TenantMembershipUncheckedUpdateManyInput>;
    where?: Prisma.TenantMembershipWhereInput;
    limit?: number;
};
export type TenantMembershipUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantMembershipSelect<ExtArgs> | null;
    omit?: Prisma.TenantMembershipOmit<ExtArgs> | null;
    include?: Prisma.TenantMembershipInclude<ExtArgs> | null;
    where: Prisma.TenantMembershipWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantMembershipCreateInput, Prisma.TenantMembershipUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TenantMembershipUpdateInput, Prisma.TenantMembershipUncheckedUpdateInput>;
};
export type TenantMembershipDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantMembershipSelect<ExtArgs> | null;
    omit?: Prisma.TenantMembershipOmit<ExtArgs> | null;
    include?: Prisma.TenantMembershipInclude<ExtArgs> | null;
    where: Prisma.TenantMembershipWhereUniqueInput;
};
export type TenantMembershipDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TenantMembershipWhereInput;
    limit?: number;
};
export type TenantMembership$membershipRolesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipRoleSelect<ExtArgs> | null;
    omit?: Prisma.MembershipRoleOmit<ExtArgs> | null;
    include?: Prisma.MembershipRoleInclude<ExtArgs> | null;
    where?: Prisma.MembershipRoleWhereInput;
    orderBy?: Prisma.MembershipRoleOrderByWithRelationInput | Prisma.MembershipRoleOrderByWithRelationInput[];
    cursor?: Prisma.MembershipRoleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MembershipRoleScalarFieldEnum | Prisma.MembershipRoleScalarFieldEnum[];
};
export type TenantMembership$auditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TenantMembership$activityAssignmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ActivityAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.ActivityAssignmentOmit<ExtArgs> | null;
    include?: Prisma.ActivityAssignmentInclude<ExtArgs> | null;
    where?: Prisma.ActivityAssignmentWhereInput;
    orderBy?: Prisma.ActivityAssignmentOrderByWithRelationInput | Prisma.ActivityAssignmentOrderByWithRelationInput[];
    cursor?: Prisma.ActivityAssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ActivityAssignmentScalarFieldEnum | Prisma.ActivityAssignmentScalarFieldEnum[];
};
export type TenantMembership$createdDprsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TenantMembership$reviewedDprsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TenantMembership$siteSubmissionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TenantMembership$attendanceSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TenantMembershipDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantMembershipSelect<ExtArgs> | null;
    omit?: Prisma.TenantMembershipOmit<ExtArgs> | null;
    include?: Prisma.TenantMembershipInclude<ExtArgs> | null;
};
