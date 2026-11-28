import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SiteSubmissionModel = runtime.Types.Result.DefaultSelection<Prisma.$SiteSubmissionPayload>;
export type AggregateSiteSubmission = {
    _count: SiteSubmissionCountAggregateOutputType | null;
    _avg: SiteSubmissionAvgAggregateOutputType | null;
    _sum: SiteSubmissionSumAggregateOutputType | null;
    _min: SiteSubmissionMinAggregateOutputType | null;
    _max: SiteSubmissionMaxAggregateOutputType | null;
};
export type SiteSubmissionAvgAggregateOutputType = {
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    locationAccuracyM: runtime.Decimal | null;
};
export type SiteSubmissionSumAggregateOutputType = {
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    locationAccuracyM: runtime.Decimal | null;
};
export type SiteSubmissionMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    projectId: string | null;
    supervisorMembershipId: string | null;
    startChainage: string | null;
    endChainage: string | null;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    locationAccuracyM: runtime.Decimal | null;
    locationCapturedAt: Date | null;
    remarks: string | null;
    submittedAt: Date | null;
    createdAt: Date | null;
};
export type SiteSubmissionMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    projectId: string | null;
    supervisorMembershipId: string | null;
    startChainage: string | null;
    endChainage: string | null;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    locationAccuracyM: runtime.Decimal | null;
    locationCapturedAt: Date | null;
    remarks: string | null;
    submittedAt: Date | null;
    createdAt: Date | null;
};
export type SiteSubmissionCountAggregateOutputType = {
    id: number;
    tenantId: number;
    projectId: number;
    supervisorMembershipId: number;
    startChainage: number;
    endChainage: number;
    latitude: number;
    longitude: number;
    locationAccuracyM: number;
    locationCapturedAt: number;
    remarks: number;
    submittedAt: number;
    createdAt: number;
    _all: number;
};
export type SiteSubmissionAvgAggregateInputType = {
    latitude?: true;
    longitude?: true;
    locationAccuracyM?: true;
};
export type SiteSubmissionSumAggregateInputType = {
    latitude?: true;
    longitude?: true;
    locationAccuracyM?: true;
};
export type SiteSubmissionMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    projectId?: true;
    supervisorMembershipId?: true;
    startChainage?: true;
    endChainage?: true;
    latitude?: true;
    longitude?: true;
    locationAccuracyM?: true;
    locationCapturedAt?: true;
    remarks?: true;
    submittedAt?: true;
    createdAt?: true;
};
export type SiteSubmissionMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    projectId?: true;
    supervisorMembershipId?: true;
    startChainage?: true;
    endChainage?: true;
    latitude?: true;
    longitude?: true;
    locationAccuracyM?: true;
    locationCapturedAt?: true;
    remarks?: true;
    submittedAt?: true;
    createdAt?: true;
};
export type SiteSubmissionCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    projectId?: true;
    supervisorMembershipId?: true;
    startChainage?: true;
    endChainage?: true;
    latitude?: true;
    longitude?: true;
    locationAccuracyM?: true;
    locationCapturedAt?: true;
    remarks?: true;
    submittedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type SiteSubmissionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSubmissionWhereInput;
    orderBy?: Prisma.SiteSubmissionOrderByWithRelationInput | Prisma.SiteSubmissionOrderByWithRelationInput[];
    cursor?: Prisma.SiteSubmissionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SiteSubmissionCountAggregateInputType;
    _avg?: SiteSubmissionAvgAggregateInputType;
    _sum?: SiteSubmissionSumAggregateInputType;
    _min?: SiteSubmissionMinAggregateInputType;
    _max?: SiteSubmissionMaxAggregateInputType;
};
export type GetSiteSubmissionAggregateType<T extends SiteSubmissionAggregateArgs> = {
    [P in keyof T & keyof AggregateSiteSubmission]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSiteSubmission[P]> : Prisma.GetScalarType<T[P], AggregateSiteSubmission[P]>;
};
export type SiteSubmissionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSubmissionWhereInput;
    orderBy?: Prisma.SiteSubmissionOrderByWithAggregationInput | Prisma.SiteSubmissionOrderByWithAggregationInput[];
    by: Prisma.SiteSubmissionScalarFieldEnum[] | Prisma.SiteSubmissionScalarFieldEnum;
    having?: Prisma.SiteSubmissionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SiteSubmissionCountAggregateInputType | true;
    _avg?: SiteSubmissionAvgAggregateInputType;
    _sum?: SiteSubmissionSumAggregateInputType;
    _min?: SiteSubmissionMinAggregateInputType;
    _max?: SiteSubmissionMaxAggregateInputType;
};
export type SiteSubmissionGroupByOutputType = {
    id: string;
    tenantId: string;
    projectId: string;
    supervisorMembershipId: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal;
    longitude: runtime.Decimal;
    locationAccuracyM: runtime.Decimal | null;
    locationCapturedAt: Date | null;
    remarks: string | null;
    submittedAt: Date;
    createdAt: Date;
    _count: SiteSubmissionCountAggregateOutputType | null;
    _avg: SiteSubmissionAvgAggregateOutputType | null;
    _sum: SiteSubmissionSumAggregateOutputType | null;
    _min: SiteSubmissionMinAggregateOutputType | null;
    _max: SiteSubmissionMaxAggregateOutputType | null;
};
export type GetSiteSubmissionGroupByPayload<T extends SiteSubmissionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SiteSubmissionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SiteSubmissionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SiteSubmissionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SiteSubmissionGroupByOutputType[P]>;
}>>;
export type SiteSubmissionWhereInput = {
    AND?: Prisma.SiteSubmissionWhereInput | Prisma.SiteSubmissionWhereInput[];
    OR?: Prisma.SiteSubmissionWhereInput[];
    NOT?: Prisma.SiteSubmissionWhereInput | Prisma.SiteSubmissionWhereInput[];
    id?: Prisma.StringFilter<"SiteSubmission"> | string;
    tenantId?: Prisma.StringFilter<"SiteSubmission"> | string;
    projectId?: Prisma.StringFilter<"SiteSubmission"> | string;
    supervisorMembershipId?: Prisma.StringFilter<"SiteSubmission"> | string;
    startChainage?: Prisma.StringFilter<"SiteSubmission"> | string;
    endChainage?: Prisma.StringFilter<"SiteSubmission"> | string;
    latitude?: Prisma.DecimalFilter<"SiteSubmission"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFilter<"SiteSubmission"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.DecimalNullableFilter<"SiteSubmission"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.DateTimeNullableFilter<"SiteSubmission"> | Date | string | null;
    remarks?: Prisma.StringNullableFilter<"SiteSubmission"> | string | null;
    submittedAt?: Prisma.DateTimeFilter<"SiteSubmission"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"SiteSubmission"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
    supervisor?: Prisma.XOR<Prisma.TenantMembershipScalarRelationFilter, Prisma.TenantMembershipWhereInput>;
    activities?: Prisma.SiteSubmissionActivityListRelationFilter;
    photos?: Prisma.SiteSubmissionPhotoListRelationFilter;
};
export type SiteSubmissionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    supervisorMembershipId?: Prisma.SortOrder;
    startChainage?: Prisma.SortOrder;
    endChainage?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    locationAccuracyM?: Prisma.SortOrderInput | Prisma.SortOrder;
    locationCapturedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    project?: Prisma.ProjectOrderByWithRelationInput;
    supervisor?: Prisma.TenantMembershipOrderByWithRelationInput;
    activities?: Prisma.SiteSubmissionActivityOrderByRelationAggregateInput;
    photos?: Prisma.SiteSubmissionPhotoOrderByRelationAggregateInput;
    _relevance?: Prisma.SiteSubmissionOrderByRelevanceInput;
};
export type SiteSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_id?: Prisma.SiteSubmissionTenantIdIdCompoundUniqueInput;
    AND?: Prisma.SiteSubmissionWhereInput | Prisma.SiteSubmissionWhereInput[];
    OR?: Prisma.SiteSubmissionWhereInput[];
    NOT?: Prisma.SiteSubmissionWhereInput | Prisma.SiteSubmissionWhereInput[];
    tenantId?: Prisma.StringFilter<"SiteSubmission"> | string;
    projectId?: Prisma.StringFilter<"SiteSubmission"> | string;
    supervisorMembershipId?: Prisma.StringFilter<"SiteSubmission"> | string;
    startChainage?: Prisma.StringFilter<"SiteSubmission"> | string;
    endChainage?: Prisma.StringFilter<"SiteSubmission"> | string;
    latitude?: Prisma.DecimalFilter<"SiteSubmission"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFilter<"SiteSubmission"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.DecimalNullableFilter<"SiteSubmission"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.DateTimeNullableFilter<"SiteSubmission"> | Date | string | null;
    remarks?: Prisma.StringNullableFilter<"SiteSubmission"> | string | null;
    submittedAt?: Prisma.DateTimeFilter<"SiteSubmission"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"SiteSubmission"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
    supervisor?: Prisma.XOR<Prisma.TenantMembershipScalarRelationFilter, Prisma.TenantMembershipWhereInput>;
    activities?: Prisma.SiteSubmissionActivityListRelationFilter;
    photos?: Prisma.SiteSubmissionPhotoListRelationFilter;
}, "id" | "tenantId_id">;
export type SiteSubmissionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    supervisorMembershipId?: Prisma.SortOrder;
    startChainage?: Prisma.SortOrder;
    endChainage?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    locationAccuracyM?: Prisma.SortOrderInput | Prisma.SortOrder;
    locationCapturedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.SiteSubmissionCountOrderByAggregateInput;
    _avg?: Prisma.SiteSubmissionAvgOrderByAggregateInput;
    _max?: Prisma.SiteSubmissionMaxOrderByAggregateInput;
    _min?: Prisma.SiteSubmissionMinOrderByAggregateInput;
    _sum?: Prisma.SiteSubmissionSumOrderByAggregateInput;
};
export type SiteSubmissionScalarWhereWithAggregatesInput = {
    AND?: Prisma.SiteSubmissionScalarWhereWithAggregatesInput | Prisma.SiteSubmissionScalarWhereWithAggregatesInput[];
    OR?: Prisma.SiteSubmissionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SiteSubmissionScalarWhereWithAggregatesInput | Prisma.SiteSubmissionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SiteSubmission"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"SiteSubmission"> | string;
    projectId?: Prisma.StringWithAggregatesFilter<"SiteSubmission"> | string;
    supervisorMembershipId?: Prisma.StringWithAggregatesFilter<"SiteSubmission"> | string;
    startChainage?: Prisma.StringWithAggregatesFilter<"SiteSubmission"> | string;
    endChainage?: Prisma.StringWithAggregatesFilter<"SiteSubmission"> | string;
    latitude?: Prisma.DecimalWithAggregatesFilter<"SiteSubmission"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalWithAggregatesFilter<"SiteSubmission"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.DecimalNullableWithAggregatesFilter<"SiteSubmission"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"SiteSubmission"> | Date | string | null;
    remarks?: Prisma.StringNullableWithAggregatesFilter<"SiteSubmission"> | string | null;
    submittedAt?: Prisma.DateTimeWithAggregatesFilter<"SiteSubmission"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SiteSubmission"> | Date | string;
};
export type SiteSubmissionCreateInput = {
    id?: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Date | string | null;
    remarks?: string | null;
    submittedAt?: Date | string;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutSiteSubmissionsInput;
    project: Prisma.ProjectCreateNestedOneWithoutSiteSubmissionsInput;
    supervisor: Prisma.TenantMembershipCreateNestedOneWithoutSiteSubmissionsInput;
    activities?: Prisma.SiteSubmissionActivityCreateNestedManyWithoutSubmissionInput;
    photos?: Prisma.SiteSubmissionPhotoCreateNestedManyWithoutSubmissionInput;
};
export type SiteSubmissionUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    projectId: string;
    supervisorMembershipId: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Date | string | null;
    remarks?: string | null;
    submittedAt?: Date | string;
    createdAt?: Date | string;
    activities?: Prisma.SiteSubmissionActivityUncheckedCreateNestedManyWithoutSubmissionInput;
    photos?: Prisma.SiteSubmissionPhotoUncheckedCreateNestedManyWithoutSubmissionInput;
};
export type SiteSubmissionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutSiteSubmissionsNestedInput;
    project?: Prisma.ProjectUpdateOneRequiredWithoutSiteSubmissionsNestedInput;
    supervisor?: Prisma.TenantMembershipUpdateOneRequiredWithoutSiteSubmissionsNestedInput;
    activities?: Prisma.SiteSubmissionActivityUpdateManyWithoutSubmissionNestedInput;
    photos?: Prisma.SiteSubmissionPhotoUpdateManyWithoutSubmissionNestedInput;
};
export type SiteSubmissionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    supervisorMembershipId?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activities?: Prisma.SiteSubmissionActivityUncheckedUpdateManyWithoutSubmissionNestedInput;
    photos?: Prisma.SiteSubmissionPhotoUncheckedUpdateManyWithoutSubmissionNestedInput;
};
export type SiteSubmissionCreateManyInput = {
    id?: string;
    tenantId: string;
    projectId: string;
    supervisorMembershipId: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Date | string | null;
    remarks?: string | null;
    submittedAt?: Date | string;
    createdAt?: Date | string;
};
export type SiteSubmissionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSubmissionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    supervisorMembershipId?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSubmissionListRelationFilter = {
    every?: Prisma.SiteSubmissionWhereInput;
    some?: Prisma.SiteSubmissionWhereInput;
    none?: Prisma.SiteSubmissionWhereInput;
};
export type SiteSubmissionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SiteSubmissionOrderByRelevanceInput = {
    fields: Prisma.SiteSubmissionOrderByRelevanceFieldEnum | Prisma.SiteSubmissionOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type SiteSubmissionTenantIdIdCompoundUniqueInput = {
    tenantId: string;
    id: string;
};
export type SiteSubmissionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    supervisorMembershipId?: Prisma.SortOrder;
    startChainage?: Prisma.SortOrder;
    endChainage?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    locationAccuracyM?: Prisma.SortOrder;
    locationCapturedAt?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SiteSubmissionAvgOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    locationAccuracyM?: Prisma.SortOrder;
};
export type SiteSubmissionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    supervisorMembershipId?: Prisma.SortOrder;
    startChainage?: Prisma.SortOrder;
    endChainage?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    locationAccuracyM?: Prisma.SortOrder;
    locationCapturedAt?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SiteSubmissionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    supervisorMembershipId?: Prisma.SortOrder;
    startChainage?: Prisma.SortOrder;
    endChainage?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    locationAccuracyM?: Prisma.SortOrder;
    locationCapturedAt?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SiteSubmissionSumOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    locationAccuracyM?: Prisma.SortOrder;
};
export type SiteSubmissionScalarRelationFilter = {
    is?: Prisma.SiteSubmissionWhereInput;
    isNot?: Prisma.SiteSubmissionWhereInput;
};
export type SiteSubmissionCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutTenantInput, Prisma.SiteSubmissionUncheckedCreateWithoutTenantInput> | Prisma.SiteSubmissionCreateWithoutTenantInput[] | Prisma.SiteSubmissionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.SiteSubmissionCreateOrConnectWithoutTenantInput | Prisma.SiteSubmissionCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.SiteSubmissionCreateManyTenantInputEnvelope;
    connect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
};
export type SiteSubmissionUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutTenantInput, Prisma.SiteSubmissionUncheckedCreateWithoutTenantInput> | Prisma.SiteSubmissionCreateWithoutTenantInput[] | Prisma.SiteSubmissionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.SiteSubmissionCreateOrConnectWithoutTenantInput | Prisma.SiteSubmissionCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.SiteSubmissionCreateManyTenantInputEnvelope;
    connect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
};
export type SiteSubmissionUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutTenantInput, Prisma.SiteSubmissionUncheckedCreateWithoutTenantInput> | Prisma.SiteSubmissionCreateWithoutTenantInput[] | Prisma.SiteSubmissionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.SiteSubmissionCreateOrConnectWithoutTenantInput | Prisma.SiteSubmissionCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.SiteSubmissionUpsertWithWhereUniqueWithoutTenantInput | Prisma.SiteSubmissionUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.SiteSubmissionCreateManyTenantInputEnvelope;
    set?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    disconnect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    delete?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    connect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    update?: Prisma.SiteSubmissionUpdateWithWhereUniqueWithoutTenantInput | Prisma.SiteSubmissionUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.SiteSubmissionUpdateManyWithWhereWithoutTenantInput | Prisma.SiteSubmissionUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.SiteSubmissionScalarWhereInput | Prisma.SiteSubmissionScalarWhereInput[];
};
export type SiteSubmissionUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutTenantInput, Prisma.SiteSubmissionUncheckedCreateWithoutTenantInput> | Prisma.SiteSubmissionCreateWithoutTenantInput[] | Prisma.SiteSubmissionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.SiteSubmissionCreateOrConnectWithoutTenantInput | Prisma.SiteSubmissionCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.SiteSubmissionUpsertWithWhereUniqueWithoutTenantInput | Prisma.SiteSubmissionUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.SiteSubmissionCreateManyTenantInputEnvelope;
    set?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    disconnect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    delete?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    connect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    update?: Prisma.SiteSubmissionUpdateWithWhereUniqueWithoutTenantInput | Prisma.SiteSubmissionUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.SiteSubmissionUpdateManyWithWhereWithoutTenantInput | Prisma.SiteSubmissionUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.SiteSubmissionScalarWhereInput | Prisma.SiteSubmissionScalarWhereInput[];
};
export type SiteSubmissionCreateNestedManyWithoutSupervisorInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutSupervisorInput, Prisma.SiteSubmissionUncheckedCreateWithoutSupervisorInput> | Prisma.SiteSubmissionCreateWithoutSupervisorInput[] | Prisma.SiteSubmissionUncheckedCreateWithoutSupervisorInput[];
    connectOrCreate?: Prisma.SiteSubmissionCreateOrConnectWithoutSupervisorInput | Prisma.SiteSubmissionCreateOrConnectWithoutSupervisorInput[];
    createMany?: Prisma.SiteSubmissionCreateManySupervisorInputEnvelope;
    connect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
};
export type SiteSubmissionUncheckedCreateNestedManyWithoutSupervisorInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutSupervisorInput, Prisma.SiteSubmissionUncheckedCreateWithoutSupervisorInput> | Prisma.SiteSubmissionCreateWithoutSupervisorInput[] | Prisma.SiteSubmissionUncheckedCreateWithoutSupervisorInput[];
    connectOrCreate?: Prisma.SiteSubmissionCreateOrConnectWithoutSupervisorInput | Prisma.SiteSubmissionCreateOrConnectWithoutSupervisorInput[];
    createMany?: Prisma.SiteSubmissionCreateManySupervisorInputEnvelope;
    connect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
};
export type SiteSubmissionUpdateManyWithoutSupervisorNestedInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutSupervisorInput, Prisma.SiteSubmissionUncheckedCreateWithoutSupervisorInput> | Prisma.SiteSubmissionCreateWithoutSupervisorInput[] | Prisma.SiteSubmissionUncheckedCreateWithoutSupervisorInput[];
    connectOrCreate?: Prisma.SiteSubmissionCreateOrConnectWithoutSupervisorInput | Prisma.SiteSubmissionCreateOrConnectWithoutSupervisorInput[];
    upsert?: Prisma.SiteSubmissionUpsertWithWhereUniqueWithoutSupervisorInput | Prisma.SiteSubmissionUpsertWithWhereUniqueWithoutSupervisorInput[];
    createMany?: Prisma.SiteSubmissionCreateManySupervisorInputEnvelope;
    set?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    disconnect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    delete?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    connect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    update?: Prisma.SiteSubmissionUpdateWithWhereUniqueWithoutSupervisorInput | Prisma.SiteSubmissionUpdateWithWhereUniqueWithoutSupervisorInput[];
    updateMany?: Prisma.SiteSubmissionUpdateManyWithWhereWithoutSupervisorInput | Prisma.SiteSubmissionUpdateManyWithWhereWithoutSupervisorInput[];
    deleteMany?: Prisma.SiteSubmissionScalarWhereInput | Prisma.SiteSubmissionScalarWhereInput[];
};
export type SiteSubmissionUncheckedUpdateManyWithoutSupervisorNestedInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutSupervisorInput, Prisma.SiteSubmissionUncheckedCreateWithoutSupervisorInput> | Prisma.SiteSubmissionCreateWithoutSupervisorInput[] | Prisma.SiteSubmissionUncheckedCreateWithoutSupervisorInput[];
    connectOrCreate?: Prisma.SiteSubmissionCreateOrConnectWithoutSupervisorInput | Prisma.SiteSubmissionCreateOrConnectWithoutSupervisorInput[];
    upsert?: Prisma.SiteSubmissionUpsertWithWhereUniqueWithoutSupervisorInput | Prisma.SiteSubmissionUpsertWithWhereUniqueWithoutSupervisorInput[];
    createMany?: Prisma.SiteSubmissionCreateManySupervisorInputEnvelope;
    set?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    disconnect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    delete?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    connect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    update?: Prisma.SiteSubmissionUpdateWithWhereUniqueWithoutSupervisorInput | Prisma.SiteSubmissionUpdateWithWhereUniqueWithoutSupervisorInput[];
    updateMany?: Prisma.SiteSubmissionUpdateManyWithWhereWithoutSupervisorInput | Prisma.SiteSubmissionUpdateManyWithWhereWithoutSupervisorInput[];
    deleteMany?: Prisma.SiteSubmissionScalarWhereInput | Prisma.SiteSubmissionScalarWhereInput[];
};
export type SiteSubmissionCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutProjectInput, Prisma.SiteSubmissionUncheckedCreateWithoutProjectInput> | Prisma.SiteSubmissionCreateWithoutProjectInput[] | Prisma.SiteSubmissionUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.SiteSubmissionCreateOrConnectWithoutProjectInput | Prisma.SiteSubmissionCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.SiteSubmissionCreateManyProjectInputEnvelope;
    connect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
};
export type SiteSubmissionUncheckedCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutProjectInput, Prisma.SiteSubmissionUncheckedCreateWithoutProjectInput> | Prisma.SiteSubmissionCreateWithoutProjectInput[] | Prisma.SiteSubmissionUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.SiteSubmissionCreateOrConnectWithoutProjectInput | Prisma.SiteSubmissionCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.SiteSubmissionCreateManyProjectInputEnvelope;
    connect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
};
export type SiteSubmissionUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutProjectInput, Prisma.SiteSubmissionUncheckedCreateWithoutProjectInput> | Prisma.SiteSubmissionCreateWithoutProjectInput[] | Prisma.SiteSubmissionUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.SiteSubmissionCreateOrConnectWithoutProjectInput | Prisma.SiteSubmissionCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.SiteSubmissionUpsertWithWhereUniqueWithoutProjectInput | Prisma.SiteSubmissionUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.SiteSubmissionCreateManyProjectInputEnvelope;
    set?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    disconnect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    delete?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    connect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    update?: Prisma.SiteSubmissionUpdateWithWhereUniqueWithoutProjectInput | Prisma.SiteSubmissionUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.SiteSubmissionUpdateManyWithWhereWithoutProjectInput | Prisma.SiteSubmissionUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.SiteSubmissionScalarWhereInput | Prisma.SiteSubmissionScalarWhereInput[];
};
export type SiteSubmissionUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutProjectInput, Prisma.SiteSubmissionUncheckedCreateWithoutProjectInput> | Prisma.SiteSubmissionCreateWithoutProjectInput[] | Prisma.SiteSubmissionUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.SiteSubmissionCreateOrConnectWithoutProjectInput | Prisma.SiteSubmissionCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.SiteSubmissionUpsertWithWhereUniqueWithoutProjectInput | Prisma.SiteSubmissionUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.SiteSubmissionCreateManyProjectInputEnvelope;
    set?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    disconnect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    delete?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    connect?: Prisma.SiteSubmissionWhereUniqueInput | Prisma.SiteSubmissionWhereUniqueInput[];
    update?: Prisma.SiteSubmissionUpdateWithWhereUniqueWithoutProjectInput | Prisma.SiteSubmissionUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.SiteSubmissionUpdateManyWithWhereWithoutProjectInput | Prisma.SiteSubmissionUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.SiteSubmissionScalarWhereInput | Prisma.SiteSubmissionScalarWhereInput[];
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type SiteSubmissionCreateNestedOneWithoutActivitiesInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutActivitiesInput, Prisma.SiteSubmissionUncheckedCreateWithoutActivitiesInput>;
    connectOrCreate?: Prisma.SiteSubmissionCreateOrConnectWithoutActivitiesInput;
    connect?: Prisma.SiteSubmissionWhereUniqueInput;
};
export type SiteSubmissionUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutActivitiesInput, Prisma.SiteSubmissionUncheckedCreateWithoutActivitiesInput>;
    connectOrCreate?: Prisma.SiteSubmissionCreateOrConnectWithoutActivitiesInput;
    upsert?: Prisma.SiteSubmissionUpsertWithoutActivitiesInput;
    connect?: Prisma.SiteSubmissionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SiteSubmissionUpdateToOneWithWhereWithoutActivitiesInput, Prisma.SiteSubmissionUpdateWithoutActivitiesInput>, Prisma.SiteSubmissionUncheckedUpdateWithoutActivitiesInput>;
};
export type SiteSubmissionCreateNestedOneWithoutPhotosInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutPhotosInput, Prisma.SiteSubmissionUncheckedCreateWithoutPhotosInput>;
    connectOrCreate?: Prisma.SiteSubmissionCreateOrConnectWithoutPhotosInput;
    connect?: Prisma.SiteSubmissionWhereUniqueInput;
};
export type SiteSubmissionUpdateOneRequiredWithoutPhotosNestedInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutPhotosInput, Prisma.SiteSubmissionUncheckedCreateWithoutPhotosInput>;
    connectOrCreate?: Prisma.SiteSubmissionCreateOrConnectWithoutPhotosInput;
    upsert?: Prisma.SiteSubmissionUpsertWithoutPhotosInput;
    connect?: Prisma.SiteSubmissionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SiteSubmissionUpdateToOneWithWhereWithoutPhotosInput, Prisma.SiteSubmissionUpdateWithoutPhotosInput>, Prisma.SiteSubmissionUncheckedUpdateWithoutPhotosInput>;
};
export type SiteSubmissionCreateWithoutTenantInput = {
    id?: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Date | string | null;
    remarks?: string | null;
    submittedAt?: Date | string;
    createdAt?: Date | string;
    project: Prisma.ProjectCreateNestedOneWithoutSiteSubmissionsInput;
    supervisor: Prisma.TenantMembershipCreateNestedOneWithoutSiteSubmissionsInput;
    activities?: Prisma.SiteSubmissionActivityCreateNestedManyWithoutSubmissionInput;
    photos?: Prisma.SiteSubmissionPhotoCreateNestedManyWithoutSubmissionInput;
};
export type SiteSubmissionUncheckedCreateWithoutTenantInput = {
    id?: string;
    projectId: string;
    supervisorMembershipId: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Date | string | null;
    remarks?: string | null;
    submittedAt?: Date | string;
    createdAt?: Date | string;
    activities?: Prisma.SiteSubmissionActivityUncheckedCreateNestedManyWithoutSubmissionInput;
    photos?: Prisma.SiteSubmissionPhotoUncheckedCreateNestedManyWithoutSubmissionInput;
};
export type SiteSubmissionCreateOrConnectWithoutTenantInput = {
    where: Prisma.SiteSubmissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutTenantInput, Prisma.SiteSubmissionUncheckedCreateWithoutTenantInput>;
};
export type SiteSubmissionCreateManyTenantInputEnvelope = {
    data: Prisma.SiteSubmissionCreateManyTenantInput | Prisma.SiteSubmissionCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type SiteSubmissionUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.SiteSubmissionWhereUniqueInput;
    update: Prisma.XOR<Prisma.SiteSubmissionUpdateWithoutTenantInput, Prisma.SiteSubmissionUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutTenantInput, Prisma.SiteSubmissionUncheckedCreateWithoutTenantInput>;
};
export type SiteSubmissionUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.SiteSubmissionWhereUniqueInput;
    data: Prisma.XOR<Prisma.SiteSubmissionUpdateWithoutTenantInput, Prisma.SiteSubmissionUncheckedUpdateWithoutTenantInput>;
};
export type SiteSubmissionUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.SiteSubmissionScalarWhereInput;
    data: Prisma.XOR<Prisma.SiteSubmissionUpdateManyMutationInput, Prisma.SiteSubmissionUncheckedUpdateManyWithoutTenantInput>;
};
export type SiteSubmissionScalarWhereInput = {
    AND?: Prisma.SiteSubmissionScalarWhereInput | Prisma.SiteSubmissionScalarWhereInput[];
    OR?: Prisma.SiteSubmissionScalarWhereInput[];
    NOT?: Prisma.SiteSubmissionScalarWhereInput | Prisma.SiteSubmissionScalarWhereInput[];
    id?: Prisma.StringFilter<"SiteSubmission"> | string;
    tenantId?: Prisma.StringFilter<"SiteSubmission"> | string;
    projectId?: Prisma.StringFilter<"SiteSubmission"> | string;
    supervisorMembershipId?: Prisma.StringFilter<"SiteSubmission"> | string;
    startChainage?: Prisma.StringFilter<"SiteSubmission"> | string;
    endChainage?: Prisma.StringFilter<"SiteSubmission"> | string;
    latitude?: Prisma.DecimalFilter<"SiteSubmission"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFilter<"SiteSubmission"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.DecimalNullableFilter<"SiteSubmission"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.DateTimeNullableFilter<"SiteSubmission"> | Date | string | null;
    remarks?: Prisma.StringNullableFilter<"SiteSubmission"> | string | null;
    submittedAt?: Prisma.DateTimeFilter<"SiteSubmission"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"SiteSubmission"> | Date | string;
};
export type SiteSubmissionCreateWithoutSupervisorInput = {
    id?: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Date | string | null;
    remarks?: string | null;
    submittedAt?: Date | string;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutSiteSubmissionsInput;
    project: Prisma.ProjectCreateNestedOneWithoutSiteSubmissionsInput;
    activities?: Prisma.SiteSubmissionActivityCreateNestedManyWithoutSubmissionInput;
    photos?: Prisma.SiteSubmissionPhotoCreateNestedManyWithoutSubmissionInput;
};
export type SiteSubmissionUncheckedCreateWithoutSupervisorInput = {
    id?: string;
    projectId: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Date | string | null;
    remarks?: string | null;
    submittedAt?: Date | string;
    createdAt?: Date | string;
    activities?: Prisma.SiteSubmissionActivityUncheckedCreateNestedManyWithoutSubmissionInput;
    photos?: Prisma.SiteSubmissionPhotoUncheckedCreateNestedManyWithoutSubmissionInput;
};
export type SiteSubmissionCreateOrConnectWithoutSupervisorInput = {
    where: Prisma.SiteSubmissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutSupervisorInput, Prisma.SiteSubmissionUncheckedCreateWithoutSupervisorInput>;
};
export type SiteSubmissionCreateManySupervisorInputEnvelope = {
    data: Prisma.SiteSubmissionCreateManySupervisorInput | Prisma.SiteSubmissionCreateManySupervisorInput[];
    skipDuplicates?: boolean;
};
export type SiteSubmissionUpsertWithWhereUniqueWithoutSupervisorInput = {
    where: Prisma.SiteSubmissionWhereUniqueInput;
    update: Prisma.XOR<Prisma.SiteSubmissionUpdateWithoutSupervisorInput, Prisma.SiteSubmissionUncheckedUpdateWithoutSupervisorInput>;
    create: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutSupervisorInput, Prisma.SiteSubmissionUncheckedCreateWithoutSupervisorInput>;
};
export type SiteSubmissionUpdateWithWhereUniqueWithoutSupervisorInput = {
    where: Prisma.SiteSubmissionWhereUniqueInput;
    data: Prisma.XOR<Prisma.SiteSubmissionUpdateWithoutSupervisorInput, Prisma.SiteSubmissionUncheckedUpdateWithoutSupervisorInput>;
};
export type SiteSubmissionUpdateManyWithWhereWithoutSupervisorInput = {
    where: Prisma.SiteSubmissionScalarWhereInput;
    data: Prisma.XOR<Prisma.SiteSubmissionUpdateManyMutationInput, Prisma.SiteSubmissionUncheckedUpdateManyWithoutSupervisorInput>;
};
export type SiteSubmissionCreateWithoutProjectInput = {
    id?: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Date | string | null;
    remarks?: string | null;
    submittedAt?: Date | string;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutSiteSubmissionsInput;
    supervisor: Prisma.TenantMembershipCreateNestedOneWithoutSiteSubmissionsInput;
    activities?: Prisma.SiteSubmissionActivityCreateNestedManyWithoutSubmissionInput;
    photos?: Prisma.SiteSubmissionPhotoCreateNestedManyWithoutSubmissionInput;
};
export type SiteSubmissionUncheckedCreateWithoutProjectInput = {
    id?: string;
    supervisorMembershipId: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Date | string | null;
    remarks?: string | null;
    submittedAt?: Date | string;
    createdAt?: Date | string;
    activities?: Prisma.SiteSubmissionActivityUncheckedCreateNestedManyWithoutSubmissionInput;
    photos?: Prisma.SiteSubmissionPhotoUncheckedCreateNestedManyWithoutSubmissionInput;
};
export type SiteSubmissionCreateOrConnectWithoutProjectInput = {
    where: Prisma.SiteSubmissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutProjectInput, Prisma.SiteSubmissionUncheckedCreateWithoutProjectInput>;
};
export type SiteSubmissionCreateManyProjectInputEnvelope = {
    data: Prisma.SiteSubmissionCreateManyProjectInput | Prisma.SiteSubmissionCreateManyProjectInput[];
    skipDuplicates?: boolean;
};
export type SiteSubmissionUpsertWithWhereUniqueWithoutProjectInput = {
    where: Prisma.SiteSubmissionWhereUniqueInput;
    update: Prisma.XOR<Prisma.SiteSubmissionUpdateWithoutProjectInput, Prisma.SiteSubmissionUncheckedUpdateWithoutProjectInput>;
    create: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutProjectInput, Prisma.SiteSubmissionUncheckedCreateWithoutProjectInput>;
};
export type SiteSubmissionUpdateWithWhereUniqueWithoutProjectInput = {
    where: Prisma.SiteSubmissionWhereUniqueInput;
    data: Prisma.XOR<Prisma.SiteSubmissionUpdateWithoutProjectInput, Prisma.SiteSubmissionUncheckedUpdateWithoutProjectInput>;
};
export type SiteSubmissionUpdateManyWithWhereWithoutProjectInput = {
    where: Prisma.SiteSubmissionScalarWhereInput;
    data: Prisma.XOR<Prisma.SiteSubmissionUpdateManyMutationInput, Prisma.SiteSubmissionUncheckedUpdateManyWithoutProjectInput>;
};
export type SiteSubmissionCreateWithoutActivitiesInput = {
    id?: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Date | string | null;
    remarks?: string | null;
    submittedAt?: Date | string;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutSiteSubmissionsInput;
    project: Prisma.ProjectCreateNestedOneWithoutSiteSubmissionsInput;
    supervisor: Prisma.TenantMembershipCreateNestedOneWithoutSiteSubmissionsInput;
    photos?: Prisma.SiteSubmissionPhotoCreateNestedManyWithoutSubmissionInput;
};
export type SiteSubmissionUncheckedCreateWithoutActivitiesInput = {
    id?: string;
    tenantId: string;
    projectId: string;
    supervisorMembershipId: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Date | string | null;
    remarks?: string | null;
    submittedAt?: Date | string;
    createdAt?: Date | string;
    photos?: Prisma.SiteSubmissionPhotoUncheckedCreateNestedManyWithoutSubmissionInput;
};
export type SiteSubmissionCreateOrConnectWithoutActivitiesInput = {
    where: Prisma.SiteSubmissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutActivitiesInput, Prisma.SiteSubmissionUncheckedCreateWithoutActivitiesInput>;
};
export type SiteSubmissionUpsertWithoutActivitiesInput = {
    update: Prisma.XOR<Prisma.SiteSubmissionUpdateWithoutActivitiesInput, Prisma.SiteSubmissionUncheckedUpdateWithoutActivitiesInput>;
    create: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutActivitiesInput, Prisma.SiteSubmissionUncheckedCreateWithoutActivitiesInput>;
    where?: Prisma.SiteSubmissionWhereInput;
};
export type SiteSubmissionUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: Prisma.SiteSubmissionWhereInput;
    data: Prisma.XOR<Prisma.SiteSubmissionUpdateWithoutActivitiesInput, Prisma.SiteSubmissionUncheckedUpdateWithoutActivitiesInput>;
};
export type SiteSubmissionUpdateWithoutActivitiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutSiteSubmissionsNestedInput;
    project?: Prisma.ProjectUpdateOneRequiredWithoutSiteSubmissionsNestedInput;
    supervisor?: Prisma.TenantMembershipUpdateOneRequiredWithoutSiteSubmissionsNestedInput;
    photos?: Prisma.SiteSubmissionPhotoUpdateManyWithoutSubmissionNestedInput;
};
export type SiteSubmissionUncheckedUpdateWithoutActivitiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    supervisorMembershipId?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    photos?: Prisma.SiteSubmissionPhotoUncheckedUpdateManyWithoutSubmissionNestedInput;
};
export type SiteSubmissionCreateWithoutPhotosInput = {
    id?: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Date | string | null;
    remarks?: string | null;
    submittedAt?: Date | string;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutSiteSubmissionsInput;
    project: Prisma.ProjectCreateNestedOneWithoutSiteSubmissionsInput;
    supervisor: Prisma.TenantMembershipCreateNestedOneWithoutSiteSubmissionsInput;
    activities?: Prisma.SiteSubmissionActivityCreateNestedManyWithoutSubmissionInput;
};
export type SiteSubmissionUncheckedCreateWithoutPhotosInput = {
    id?: string;
    tenantId: string;
    projectId: string;
    supervisorMembershipId: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Date | string | null;
    remarks?: string | null;
    submittedAt?: Date | string;
    createdAt?: Date | string;
    activities?: Prisma.SiteSubmissionActivityUncheckedCreateNestedManyWithoutSubmissionInput;
};
export type SiteSubmissionCreateOrConnectWithoutPhotosInput = {
    where: Prisma.SiteSubmissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutPhotosInput, Prisma.SiteSubmissionUncheckedCreateWithoutPhotosInput>;
};
export type SiteSubmissionUpsertWithoutPhotosInput = {
    update: Prisma.XOR<Prisma.SiteSubmissionUpdateWithoutPhotosInput, Prisma.SiteSubmissionUncheckedUpdateWithoutPhotosInput>;
    create: Prisma.XOR<Prisma.SiteSubmissionCreateWithoutPhotosInput, Prisma.SiteSubmissionUncheckedCreateWithoutPhotosInput>;
    where?: Prisma.SiteSubmissionWhereInput;
};
export type SiteSubmissionUpdateToOneWithWhereWithoutPhotosInput = {
    where?: Prisma.SiteSubmissionWhereInput;
    data: Prisma.XOR<Prisma.SiteSubmissionUpdateWithoutPhotosInput, Prisma.SiteSubmissionUncheckedUpdateWithoutPhotosInput>;
};
export type SiteSubmissionUpdateWithoutPhotosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutSiteSubmissionsNestedInput;
    project?: Prisma.ProjectUpdateOneRequiredWithoutSiteSubmissionsNestedInput;
    supervisor?: Prisma.TenantMembershipUpdateOneRequiredWithoutSiteSubmissionsNestedInput;
    activities?: Prisma.SiteSubmissionActivityUpdateManyWithoutSubmissionNestedInput;
};
export type SiteSubmissionUncheckedUpdateWithoutPhotosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    supervisorMembershipId?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activities?: Prisma.SiteSubmissionActivityUncheckedUpdateManyWithoutSubmissionNestedInput;
};
export type SiteSubmissionCreateManyTenantInput = {
    id?: string;
    projectId: string;
    supervisorMembershipId: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Date | string | null;
    remarks?: string | null;
    submittedAt?: Date | string;
    createdAt?: Date | string;
};
export type SiteSubmissionUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.ProjectUpdateOneRequiredWithoutSiteSubmissionsNestedInput;
    supervisor?: Prisma.TenantMembershipUpdateOneRequiredWithoutSiteSubmissionsNestedInput;
    activities?: Prisma.SiteSubmissionActivityUpdateManyWithoutSubmissionNestedInput;
    photos?: Prisma.SiteSubmissionPhotoUpdateManyWithoutSubmissionNestedInput;
};
export type SiteSubmissionUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    supervisorMembershipId?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activities?: Prisma.SiteSubmissionActivityUncheckedUpdateManyWithoutSubmissionNestedInput;
    photos?: Prisma.SiteSubmissionPhotoUncheckedUpdateManyWithoutSubmissionNestedInput;
};
export type SiteSubmissionUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    supervisorMembershipId?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSubmissionCreateManySupervisorInput = {
    id?: string;
    projectId: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Date | string | null;
    remarks?: string | null;
    submittedAt?: Date | string;
    createdAt?: Date | string;
};
export type SiteSubmissionUpdateWithoutSupervisorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutSiteSubmissionsNestedInput;
    project?: Prisma.ProjectUpdateOneRequiredWithoutSiteSubmissionsNestedInput;
    activities?: Prisma.SiteSubmissionActivityUpdateManyWithoutSubmissionNestedInput;
    photos?: Prisma.SiteSubmissionPhotoUpdateManyWithoutSubmissionNestedInput;
};
export type SiteSubmissionUncheckedUpdateWithoutSupervisorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activities?: Prisma.SiteSubmissionActivityUncheckedUpdateManyWithoutSubmissionNestedInput;
    photos?: Prisma.SiteSubmissionPhotoUncheckedUpdateManyWithoutSubmissionNestedInput;
};
export type SiteSubmissionUncheckedUpdateManyWithoutSupervisorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSubmissionCreateManyProjectInput = {
    id?: string;
    supervisorMembershipId: string;
    startChainage: string;
    endChainage: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Date | string | null;
    remarks?: string | null;
    submittedAt?: Date | string;
    createdAt?: Date | string;
};
export type SiteSubmissionUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutSiteSubmissionsNestedInput;
    supervisor?: Prisma.TenantMembershipUpdateOneRequiredWithoutSiteSubmissionsNestedInput;
    activities?: Prisma.SiteSubmissionActivityUpdateManyWithoutSubmissionNestedInput;
    photos?: Prisma.SiteSubmissionPhotoUpdateManyWithoutSubmissionNestedInput;
};
export type SiteSubmissionUncheckedUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    supervisorMembershipId?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activities?: Prisma.SiteSubmissionActivityUncheckedUpdateManyWithoutSubmissionNestedInput;
    photos?: Prisma.SiteSubmissionPhotoUncheckedUpdateManyWithoutSubmissionNestedInput;
};
export type SiteSubmissionUncheckedUpdateManyWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    supervisorMembershipId?: Prisma.StringFieldUpdateOperationsInput | string;
    startChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    endChainage?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    locationAccuracyM?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    locationCapturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSubmissionCountOutputType = {
    activities: number;
    photos: number;
};
export type SiteSubmissionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    activities?: boolean | SiteSubmissionCountOutputTypeCountActivitiesArgs;
    photos?: boolean | SiteSubmissionCountOutputTypeCountPhotosArgs;
};
export type SiteSubmissionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionCountOutputTypeSelect<ExtArgs> | null;
};
export type SiteSubmissionCountOutputTypeCountActivitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSubmissionActivityWhereInput;
};
export type SiteSubmissionCountOutputTypeCountPhotosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSubmissionPhotoWhereInput;
};
export type SiteSubmissionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    projectId?: boolean;
    supervisorMembershipId?: boolean;
    startChainage?: boolean;
    endChainage?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    locationAccuracyM?: boolean;
    locationCapturedAt?: boolean;
    remarks?: boolean;
    submittedAt?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    supervisor?: boolean | Prisma.TenantMembershipDefaultArgs<ExtArgs>;
    activities?: boolean | Prisma.SiteSubmission$activitiesArgs<ExtArgs>;
    photos?: boolean | Prisma.SiteSubmission$photosArgs<ExtArgs>;
    _count?: boolean | Prisma.SiteSubmissionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["siteSubmission"]>;
export type SiteSubmissionSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    projectId?: boolean;
    supervisorMembershipId?: boolean;
    startChainage?: boolean;
    endChainage?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    locationAccuracyM?: boolean;
    locationCapturedAt?: boolean;
    remarks?: boolean;
    submittedAt?: boolean;
    createdAt?: boolean;
};
export type SiteSubmissionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "projectId" | "supervisorMembershipId" | "startChainage" | "endChainage" | "latitude" | "longitude" | "locationAccuracyM" | "locationCapturedAt" | "remarks" | "submittedAt" | "createdAt", ExtArgs["result"]["siteSubmission"]>;
export type SiteSubmissionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    supervisor?: boolean | Prisma.TenantMembershipDefaultArgs<ExtArgs>;
    activities?: boolean | Prisma.SiteSubmission$activitiesArgs<ExtArgs>;
    photos?: boolean | Prisma.SiteSubmission$photosArgs<ExtArgs>;
    _count?: boolean | Prisma.SiteSubmissionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $SiteSubmissionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SiteSubmission";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        project: Prisma.$ProjectPayload<ExtArgs>;
        supervisor: Prisma.$TenantMembershipPayload<ExtArgs>;
        activities: Prisma.$SiteSubmissionActivityPayload<ExtArgs>[];
        photos: Prisma.$SiteSubmissionPhotoPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        projectId: string;
        supervisorMembershipId: string;
        startChainage: string;
        endChainage: string;
        latitude: runtime.Decimal;
        longitude: runtime.Decimal;
        locationAccuracyM: runtime.Decimal | null;
        locationCapturedAt: Date | null;
        remarks: string | null;
        submittedAt: Date;
        createdAt: Date;
    }, ExtArgs["result"]["siteSubmission"]>;
    composites: {};
};
export type SiteSubmissionGetPayload<S extends boolean | null | undefined | SiteSubmissionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPayload, S>;
export type SiteSubmissionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SiteSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SiteSubmissionCountAggregateInputType | true;
};
export interface SiteSubmissionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SiteSubmission'];
        meta: {
            name: 'SiteSubmission';
        };
    };
    findUnique<T extends SiteSubmissionFindUniqueArgs>(args: Prisma.SelectSubset<T, SiteSubmissionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SiteSubmissionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SiteSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SiteSubmissionFindFirstArgs>(args?: Prisma.SelectSubset<T, SiteSubmissionFindFirstArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SiteSubmissionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SiteSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SiteSubmissionFindManyArgs>(args?: Prisma.SelectSubset<T, SiteSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SiteSubmissionCreateArgs>(args: Prisma.SelectSubset<T, SiteSubmissionCreateArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SiteSubmissionCreateManyArgs>(args?: Prisma.SelectSubset<T, SiteSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends SiteSubmissionDeleteArgs>(args: Prisma.SelectSubset<T, SiteSubmissionDeleteArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SiteSubmissionUpdateArgs>(args: Prisma.SelectSubset<T, SiteSubmissionUpdateArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SiteSubmissionDeleteManyArgs>(args?: Prisma.SelectSubset<T, SiteSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SiteSubmissionUpdateManyArgs>(args: Prisma.SelectSubset<T, SiteSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends SiteSubmissionUpsertArgs>(args: Prisma.SelectSubset<T, SiteSubmissionUpsertArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SiteSubmissionCountArgs>(args?: Prisma.Subset<T, SiteSubmissionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SiteSubmissionCountAggregateOutputType> : number>;
    aggregate<T extends SiteSubmissionAggregateArgs>(args: Prisma.Subset<T, SiteSubmissionAggregateArgs>): Prisma.PrismaPromise<GetSiteSubmissionAggregateType<T>>;
    groupBy<T extends SiteSubmissionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SiteSubmissionGroupByArgs['orderBy'];
    } : {
        orderBy?: SiteSubmissionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SiteSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SiteSubmissionFieldRefs;
}
export interface Prisma__SiteSubmissionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    project<T extends Prisma.ProjectDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProjectDefaultArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    supervisor<T extends Prisma.TenantMembershipDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantMembershipDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantMembershipClient<runtime.Types.Result.GetResult<Prisma.$TenantMembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    activities<T extends Prisma.SiteSubmission$activitiesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SiteSubmission$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    photos<T extends Prisma.SiteSubmission$photosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SiteSubmission$photosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SiteSubmissionFieldRefs {
    readonly id: Prisma.FieldRef<"SiteSubmission", 'String'>;
    readonly tenantId: Prisma.FieldRef<"SiteSubmission", 'String'>;
    readonly projectId: Prisma.FieldRef<"SiteSubmission", 'String'>;
    readonly supervisorMembershipId: Prisma.FieldRef<"SiteSubmission", 'String'>;
    readonly startChainage: Prisma.FieldRef<"SiteSubmission", 'String'>;
    readonly endChainage: Prisma.FieldRef<"SiteSubmission", 'String'>;
    readonly latitude: Prisma.FieldRef<"SiteSubmission", 'Decimal'>;
    readonly longitude: Prisma.FieldRef<"SiteSubmission", 'Decimal'>;
    readonly locationAccuracyM: Prisma.FieldRef<"SiteSubmission", 'Decimal'>;
    readonly locationCapturedAt: Prisma.FieldRef<"SiteSubmission", 'DateTime'>;
    readonly remarks: Prisma.FieldRef<"SiteSubmission", 'String'>;
    readonly submittedAt: Prisma.FieldRef<"SiteSubmission", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"SiteSubmission", 'DateTime'>;
}
export type SiteSubmissionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionInclude<ExtArgs> | null;
    where: Prisma.SiteSubmissionWhereUniqueInput;
};
export type SiteSubmissionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionInclude<ExtArgs> | null;
    where: Prisma.SiteSubmissionWhereUniqueInput;
};
export type SiteSubmissionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SiteSubmissionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SiteSubmissionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SiteSubmissionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiteSubmissionCreateInput, Prisma.SiteSubmissionUncheckedCreateInput>;
};
export type SiteSubmissionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SiteSubmissionCreateManyInput | Prisma.SiteSubmissionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SiteSubmissionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiteSubmissionUpdateInput, Prisma.SiteSubmissionUncheckedUpdateInput>;
    where: Prisma.SiteSubmissionWhereUniqueInput;
};
export type SiteSubmissionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SiteSubmissionUpdateManyMutationInput, Prisma.SiteSubmissionUncheckedUpdateManyInput>;
    where?: Prisma.SiteSubmissionWhereInput;
    limit?: number;
};
export type SiteSubmissionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionInclude<ExtArgs> | null;
    where: Prisma.SiteSubmissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiteSubmissionCreateInput, Prisma.SiteSubmissionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SiteSubmissionUpdateInput, Prisma.SiteSubmissionUncheckedUpdateInput>;
};
export type SiteSubmissionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionInclude<ExtArgs> | null;
    where: Prisma.SiteSubmissionWhereUniqueInput;
};
export type SiteSubmissionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSubmissionWhereInput;
    limit?: number;
};
export type SiteSubmission$activitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionActivitySelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionActivityOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionActivityInclude<ExtArgs> | null;
    where?: Prisma.SiteSubmissionActivityWhereInput;
    orderBy?: Prisma.SiteSubmissionActivityOrderByWithRelationInput | Prisma.SiteSubmissionActivityOrderByWithRelationInput[];
    cursor?: Prisma.SiteSubmissionActivityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SiteSubmissionActivityScalarFieldEnum | Prisma.SiteSubmissionActivityScalarFieldEnum[];
};
export type SiteSubmission$photosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionPhotoOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionPhotoInclude<ExtArgs> | null;
    where?: Prisma.SiteSubmissionPhotoWhereInput;
    orderBy?: Prisma.SiteSubmissionPhotoOrderByWithRelationInput | Prisma.SiteSubmissionPhotoOrderByWithRelationInput[];
    cursor?: Prisma.SiteSubmissionPhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SiteSubmissionPhotoScalarFieldEnum | Prisma.SiteSubmissionPhotoScalarFieldEnum[];
};
export type SiteSubmissionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionInclude<ExtArgs> | null;
};
