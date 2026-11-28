import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AuditLogModel = runtime.Types.Result.DefaultSelection<Prisma.$AuditLogPayload>;
export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null;
    _min: AuditLogMinAggregateOutputType | null;
    _max: AuditLogMaxAggregateOutputType | null;
};
export type AuditLogMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    actorMembershipId: string | null;
    action: string | null;
    entityType: string | null;
    entityId: string | null;
    occurredAt: Date | null;
    correlationId: string | null;
};
export type AuditLogMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    actorMembershipId: string | null;
    action: string | null;
    entityType: string | null;
    entityId: string | null;
    occurredAt: Date | null;
    correlationId: string | null;
};
export type AuditLogCountAggregateOutputType = {
    id: number;
    tenantId: number;
    actorMembershipId: number;
    action: number;
    entityType: number;
    entityId: number;
    occurredAt: number;
    correlationId: number;
    metadata: number;
    _all: number;
};
export type AuditLogMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    actorMembershipId?: true;
    action?: true;
    entityType?: true;
    entityId?: true;
    occurredAt?: true;
    correlationId?: true;
};
export type AuditLogMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    actorMembershipId?: true;
    action?: true;
    entityType?: true;
    entityId?: true;
    occurredAt?: true;
    correlationId?: true;
};
export type AuditLogCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    actorMembershipId?: true;
    action?: true;
    entityType?: true;
    entityId?: true;
    occurredAt?: true;
    correlationId?: true;
    metadata?: true;
    _all?: true;
};
export type AuditLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AuditLogCountAggregateInputType;
    _min?: AuditLogMinAggregateInputType;
    _max?: AuditLogMaxAggregateInputType;
};
export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
    [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAuditLog[P]> : Prisma.GetScalarType<T[P], AggregateAuditLog[P]>;
};
export type AuditLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithAggregationInput | Prisma.AuditLogOrderByWithAggregationInput[];
    by: Prisma.AuditLogScalarFieldEnum[] | Prisma.AuditLogScalarFieldEnum;
    having?: Prisma.AuditLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AuditLogCountAggregateInputType | true;
    _min?: AuditLogMinAggregateInputType;
    _max?: AuditLogMaxAggregateInputType;
};
export type AuditLogGroupByOutputType = {
    id: string;
    tenantId: string;
    actorMembershipId: string | null;
    action: string;
    entityType: string;
    entityId: string | null;
    occurredAt: Date;
    correlationId: string | null;
    metadata: runtime.JsonValue;
    _count: AuditLogCountAggregateOutputType | null;
    _min: AuditLogMinAggregateOutputType | null;
    _max: AuditLogMaxAggregateOutputType | null;
};
export type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AuditLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AuditLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AuditLogGroupByOutputType[P]>;
}>>;
export type AuditLogWhereInput = {
    AND?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    OR?: Prisma.AuditLogWhereInput[];
    NOT?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    id?: Prisma.StringFilter<"AuditLog"> | string;
    tenantId?: Prisma.StringFilter<"AuditLog"> | string;
    actorMembershipId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    action?: Prisma.StringFilter<"AuditLog"> | string;
    entityType?: Prisma.StringFilter<"AuditLog"> | string;
    entityId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    occurredAt?: Prisma.DateTimeFilter<"AuditLog"> | Date | string;
    correlationId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    metadata?: Prisma.JsonFilter<"AuditLog">;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    actorMembership?: Prisma.XOR<Prisma.TenantMembershipNullableScalarRelationFilter, Prisma.TenantMembershipWhereInput> | null;
};
export type AuditLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    actorMembershipId?: Prisma.SortOrderInput | Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    occurredAt?: Prisma.SortOrder;
    correlationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    actorMembership?: Prisma.TenantMembershipOrderByWithRelationInput;
    _relevance?: Prisma.AuditLogOrderByRelevanceInput;
};
export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    OR?: Prisma.AuditLogWhereInput[];
    NOT?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    tenantId?: Prisma.StringFilter<"AuditLog"> | string;
    actorMembershipId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    action?: Prisma.StringFilter<"AuditLog"> | string;
    entityType?: Prisma.StringFilter<"AuditLog"> | string;
    entityId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    occurredAt?: Prisma.DateTimeFilter<"AuditLog"> | Date | string;
    correlationId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    metadata?: Prisma.JsonFilter<"AuditLog">;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    actorMembership?: Prisma.XOR<Prisma.TenantMembershipNullableScalarRelationFilter, Prisma.TenantMembershipWhereInput> | null;
}, "id">;
export type AuditLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    actorMembershipId?: Prisma.SortOrderInput | Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    occurredAt?: Prisma.SortOrder;
    correlationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    _count?: Prisma.AuditLogCountOrderByAggregateInput;
    _max?: Prisma.AuditLogMaxOrderByAggregateInput;
    _min?: Prisma.AuditLogMinOrderByAggregateInput;
};
export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.AuditLogScalarWhereWithAggregatesInput | Prisma.AuditLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.AuditLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AuditLogScalarWhereWithAggregatesInput | Prisma.AuditLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AuditLog"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"AuditLog"> | string;
    actorMembershipId?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    action?: Prisma.StringWithAggregatesFilter<"AuditLog"> | string;
    entityType?: Prisma.StringWithAggregatesFilter<"AuditLog"> | string;
    entityId?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    occurredAt?: Prisma.DateTimeWithAggregatesFilter<"AuditLog"> | Date | string;
    correlationId?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    metadata?: Prisma.JsonWithAggregatesFilter<"AuditLog">;
};
export type AuditLogCreateInput = {
    id?: string;
    action: string;
    entityType: string;
    entityId?: string | null;
    occurredAt?: Date | string;
    correlationId?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tenant: Prisma.TenantCreateNestedOneWithoutAuditLogsInput;
    actorMembership?: Prisma.TenantMembershipCreateNestedOneWithoutAuditLogsInput;
};
export type AuditLogUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    actorMembershipId?: string | null;
    action: string;
    entityType: string;
    entityId?: string | null;
    occurredAt?: Date | string;
    correlationId?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type AuditLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    correlationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutAuditLogsNestedInput;
    actorMembership?: Prisma.TenantMembershipUpdateOneWithoutAuditLogsNestedInput;
};
export type AuditLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorMembershipId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    correlationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type AuditLogCreateManyInput = {
    id?: string;
    tenantId: string;
    actorMembershipId?: string | null;
    action: string;
    entityType: string;
    entityId?: string | null;
    occurredAt?: Date | string;
    correlationId?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type AuditLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    correlationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type AuditLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorMembershipId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    correlationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type AuditLogListRelationFilter = {
    every?: Prisma.AuditLogWhereInput;
    some?: Prisma.AuditLogWhereInput;
    none?: Prisma.AuditLogWhereInput;
};
export type AuditLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AuditLogOrderByRelevanceInput = {
    fields: Prisma.AuditLogOrderByRelevanceFieldEnum | Prisma.AuditLogOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type AuditLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    actorMembershipId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    occurredAt?: Prisma.SortOrder;
    correlationId?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
};
export type AuditLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    actorMembershipId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    occurredAt?: Prisma.SortOrder;
    correlationId?: Prisma.SortOrder;
};
export type AuditLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    actorMembershipId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    occurredAt?: Prisma.SortOrder;
    correlationId?: Prisma.SortOrder;
};
export type AuditLogCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutTenantInput, Prisma.AuditLogUncheckedCreateWithoutTenantInput> | Prisma.AuditLogCreateWithoutTenantInput[] | Prisma.AuditLogUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutTenantInput | Prisma.AuditLogCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.AuditLogCreateManyTenantInputEnvelope;
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
};
export type AuditLogUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutTenantInput, Prisma.AuditLogUncheckedCreateWithoutTenantInput> | Prisma.AuditLogCreateWithoutTenantInput[] | Prisma.AuditLogUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutTenantInput | Prisma.AuditLogCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.AuditLogCreateManyTenantInputEnvelope;
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
};
export type AuditLogUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutTenantInput, Prisma.AuditLogUncheckedCreateWithoutTenantInput> | Prisma.AuditLogCreateWithoutTenantInput[] | Prisma.AuditLogUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutTenantInput | Prisma.AuditLogCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.AuditLogUpsertWithWhereUniqueWithoutTenantInput | Prisma.AuditLogUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.AuditLogCreateManyTenantInputEnvelope;
    set?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    disconnect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    delete?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    update?: Prisma.AuditLogUpdateWithWhereUniqueWithoutTenantInput | Prisma.AuditLogUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.AuditLogUpdateManyWithWhereWithoutTenantInput | Prisma.AuditLogUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
};
export type AuditLogUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutTenantInput, Prisma.AuditLogUncheckedCreateWithoutTenantInput> | Prisma.AuditLogCreateWithoutTenantInput[] | Prisma.AuditLogUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutTenantInput | Prisma.AuditLogCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.AuditLogUpsertWithWhereUniqueWithoutTenantInput | Prisma.AuditLogUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.AuditLogCreateManyTenantInputEnvelope;
    set?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    disconnect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    delete?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    update?: Prisma.AuditLogUpdateWithWhereUniqueWithoutTenantInput | Prisma.AuditLogUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.AuditLogUpdateManyWithWhereWithoutTenantInput | Prisma.AuditLogUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
};
export type AuditLogCreateNestedManyWithoutActorMembershipInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutActorMembershipInput, Prisma.AuditLogUncheckedCreateWithoutActorMembershipInput> | Prisma.AuditLogCreateWithoutActorMembershipInput[] | Prisma.AuditLogUncheckedCreateWithoutActorMembershipInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutActorMembershipInput | Prisma.AuditLogCreateOrConnectWithoutActorMembershipInput[];
    createMany?: Prisma.AuditLogCreateManyActorMembershipInputEnvelope;
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
};
export type AuditLogUncheckedCreateNestedManyWithoutActorMembershipInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutActorMembershipInput, Prisma.AuditLogUncheckedCreateWithoutActorMembershipInput> | Prisma.AuditLogCreateWithoutActorMembershipInput[] | Prisma.AuditLogUncheckedCreateWithoutActorMembershipInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutActorMembershipInput | Prisma.AuditLogCreateOrConnectWithoutActorMembershipInput[];
    createMany?: Prisma.AuditLogCreateManyActorMembershipInputEnvelope;
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
};
export type AuditLogUpdateManyWithoutActorMembershipNestedInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutActorMembershipInput, Prisma.AuditLogUncheckedCreateWithoutActorMembershipInput> | Prisma.AuditLogCreateWithoutActorMembershipInput[] | Prisma.AuditLogUncheckedCreateWithoutActorMembershipInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutActorMembershipInput | Prisma.AuditLogCreateOrConnectWithoutActorMembershipInput[];
    upsert?: Prisma.AuditLogUpsertWithWhereUniqueWithoutActorMembershipInput | Prisma.AuditLogUpsertWithWhereUniqueWithoutActorMembershipInput[];
    createMany?: Prisma.AuditLogCreateManyActorMembershipInputEnvelope;
    set?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    disconnect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    delete?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    update?: Prisma.AuditLogUpdateWithWhereUniqueWithoutActorMembershipInput | Prisma.AuditLogUpdateWithWhereUniqueWithoutActorMembershipInput[];
    updateMany?: Prisma.AuditLogUpdateManyWithWhereWithoutActorMembershipInput | Prisma.AuditLogUpdateManyWithWhereWithoutActorMembershipInput[];
    deleteMany?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
};
export type AuditLogUncheckedUpdateManyWithoutActorMembershipNestedInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutActorMembershipInput, Prisma.AuditLogUncheckedCreateWithoutActorMembershipInput> | Prisma.AuditLogCreateWithoutActorMembershipInput[] | Prisma.AuditLogUncheckedCreateWithoutActorMembershipInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutActorMembershipInput | Prisma.AuditLogCreateOrConnectWithoutActorMembershipInput[];
    upsert?: Prisma.AuditLogUpsertWithWhereUniqueWithoutActorMembershipInput | Prisma.AuditLogUpsertWithWhereUniqueWithoutActorMembershipInput[];
    createMany?: Prisma.AuditLogCreateManyActorMembershipInputEnvelope;
    set?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    disconnect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    delete?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    update?: Prisma.AuditLogUpdateWithWhereUniqueWithoutActorMembershipInput | Prisma.AuditLogUpdateWithWhereUniqueWithoutActorMembershipInput[];
    updateMany?: Prisma.AuditLogUpdateManyWithWhereWithoutActorMembershipInput | Prisma.AuditLogUpdateManyWithWhereWithoutActorMembershipInput[];
    deleteMany?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
};
export type AuditLogCreateWithoutTenantInput = {
    id?: string;
    action: string;
    entityType: string;
    entityId?: string | null;
    occurredAt?: Date | string;
    correlationId?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    actorMembership?: Prisma.TenantMembershipCreateNestedOneWithoutAuditLogsInput;
};
export type AuditLogUncheckedCreateWithoutTenantInput = {
    id?: string;
    actorMembershipId?: string | null;
    action: string;
    entityType: string;
    entityId?: string | null;
    occurredAt?: Date | string;
    correlationId?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type AuditLogCreateOrConnectWithoutTenantInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditLogCreateWithoutTenantInput, Prisma.AuditLogUncheckedCreateWithoutTenantInput>;
};
export type AuditLogCreateManyTenantInputEnvelope = {
    data: Prisma.AuditLogCreateManyTenantInput | Prisma.AuditLogCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type AuditLogUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuditLogUpdateWithoutTenantInput, Prisma.AuditLogUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.AuditLogCreateWithoutTenantInput, Prisma.AuditLogUncheckedCreateWithoutTenantInput>;
};
export type AuditLogUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuditLogUpdateWithoutTenantInput, Prisma.AuditLogUncheckedUpdateWithoutTenantInput>;
};
export type AuditLogUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.AuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.AuditLogUpdateManyMutationInput, Prisma.AuditLogUncheckedUpdateManyWithoutTenantInput>;
};
export type AuditLogScalarWhereInput = {
    AND?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
    OR?: Prisma.AuditLogScalarWhereInput[];
    NOT?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
    id?: Prisma.StringFilter<"AuditLog"> | string;
    tenantId?: Prisma.StringFilter<"AuditLog"> | string;
    actorMembershipId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    action?: Prisma.StringFilter<"AuditLog"> | string;
    entityType?: Prisma.StringFilter<"AuditLog"> | string;
    entityId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    occurredAt?: Prisma.DateTimeFilter<"AuditLog"> | Date | string;
    correlationId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    metadata?: Prisma.JsonFilter<"AuditLog">;
};
export type AuditLogCreateWithoutActorMembershipInput = {
    id?: string;
    action: string;
    entityType: string;
    entityId?: string | null;
    occurredAt?: Date | string;
    correlationId?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tenant: Prisma.TenantCreateNestedOneWithoutAuditLogsInput;
};
export type AuditLogUncheckedCreateWithoutActorMembershipInput = {
    id?: string;
    action: string;
    entityType: string;
    entityId?: string | null;
    occurredAt?: Date | string;
    correlationId?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type AuditLogCreateOrConnectWithoutActorMembershipInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditLogCreateWithoutActorMembershipInput, Prisma.AuditLogUncheckedCreateWithoutActorMembershipInput>;
};
export type AuditLogCreateManyActorMembershipInputEnvelope = {
    data: Prisma.AuditLogCreateManyActorMembershipInput | Prisma.AuditLogCreateManyActorMembershipInput[];
    skipDuplicates?: boolean;
};
export type AuditLogUpsertWithWhereUniqueWithoutActorMembershipInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuditLogUpdateWithoutActorMembershipInput, Prisma.AuditLogUncheckedUpdateWithoutActorMembershipInput>;
    create: Prisma.XOR<Prisma.AuditLogCreateWithoutActorMembershipInput, Prisma.AuditLogUncheckedCreateWithoutActorMembershipInput>;
};
export type AuditLogUpdateWithWhereUniqueWithoutActorMembershipInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuditLogUpdateWithoutActorMembershipInput, Prisma.AuditLogUncheckedUpdateWithoutActorMembershipInput>;
};
export type AuditLogUpdateManyWithWhereWithoutActorMembershipInput = {
    where: Prisma.AuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.AuditLogUpdateManyMutationInput, Prisma.AuditLogUncheckedUpdateManyWithoutActorMembershipInput>;
};
export type AuditLogCreateManyTenantInput = {
    id?: string;
    actorMembershipId?: string | null;
    action: string;
    entityType: string;
    entityId?: string | null;
    occurredAt?: Date | string;
    correlationId?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type AuditLogUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    correlationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    actorMembership?: Prisma.TenantMembershipUpdateOneWithoutAuditLogsNestedInput;
};
export type AuditLogUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorMembershipId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    correlationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type AuditLogUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorMembershipId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    correlationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type AuditLogCreateManyActorMembershipInput = {
    id?: string;
    action: string;
    entityType: string;
    entityId?: string | null;
    occurredAt?: Date | string;
    correlationId?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type AuditLogUpdateWithoutActorMembershipInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    correlationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutAuditLogsNestedInput;
};
export type AuditLogUncheckedUpdateWithoutActorMembershipInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    correlationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type AuditLogUncheckedUpdateManyWithoutActorMembershipInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    correlationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type AuditLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    actorMembershipId?: boolean;
    action?: boolean;
    entityType?: boolean;
    entityId?: boolean;
    occurredAt?: boolean;
    correlationId?: boolean;
    metadata?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    actorMembership?: boolean | Prisma.AuditLog$actorMembershipArgs<ExtArgs>;
}, ExtArgs["result"]["auditLog"]>;
export type AuditLogSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    actorMembershipId?: boolean;
    action?: boolean;
    entityType?: boolean;
    entityId?: boolean;
    occurredAt?: boolean;
    correlationId?: boolean;
    metadata?: boolean;
};
export type AuditLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "actorMembershipId" | "action" | "entityType" | "entityId" | "occurredAt" | "correlationId" | "metadata", ExtArgs["result"]["auditLog"]>;
export type AuditLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    actorMembership?: boolean | Prisma.AuditLog$actorMembershipArgs<ExtArgs>;
};
export type $AuditLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AuditLog";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        actorMembership: Prisma.$TenantMembershipPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        actorMembershipId: string | null;
        action: string;
        entityType: string;
        entityId: string | null;
        occurredAt: Date;
        correlationId: string | null;
        metadata: runtime.JsonValue;
    }, ExtArgs["result"]["auditLog"]>;
    composites: {};
};
export type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AuditLogPayload, S>;
export type AuditLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AuditLogCountAggregateInputType | true;
};
export interface AuditLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'];
        meta: {
            name: 'AuditLog';
        };
    };
    findUnique<T extends AuditLogFindUniqueArgs>(args: Prisma.SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AuditLogFindFirstArgs>(args?: Prisma.SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AuditLogFindManyArgs>(args?: Prisma.SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AuditLogCreateArgs>(args: Prisma.SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AuditLogCreateManyArgs>(args?: Prisma.SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends AuditLogDeleteArgs>(args: Prisma.SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AuditLogUpdateArgs>(args: Prisma.SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AuditLogUpdateManyArgs>(args: Prisma.SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends AuditLogUpsertArgs>(args: Prisma.SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AuditLogCountArgs>(args?: Prisma.Subset<T, AuditLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AuditLogCountAggregateOutputType> : number>;
    aggregate<T extends AuditLogAggregateArgs>(args: Prisma.Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>;
    groupBy<T extends AuditLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AuditLogGroupByArgs['orderBy'];
    } : {
        orderBy?: AuditLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AuditLogFieldRefs;
}
export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    actorMembership<T extends Prisma.AuditLog$actorMembershipArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AuditLog$actorMembershipArgs<ExtArgs>>): Prisma.Prisma__TenantMembershipClient<runtime.Types.Result.GetResult<Prisma.$TenantMembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AuditLogFieldRefs {
    readonly id: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly tenantId: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly actorMembershipId: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly action: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly entityType: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly entityId: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly occurredAt: Prisma.FieldRef<"AuditLog", 'DateTime'>;
    readonly correlationId: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly metadata: Prisma.FieldRef<"AuditLog", 'Json'>;
}
export type AuditLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where: Prisma.AuditLogWhereUniqueInput;
};
export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where: Prisma.AuditLogWhereUniqueInput;
};
export type AuditLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AuditLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AuditLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AuditLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuditLogCreateInput, Prisma.AuditLogUncheckedCreateInput>;
};
export type AuditLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AuditLogCreateManyInput | Prisma.AuditLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AuditLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuditLogUpdateInput, Prisma.AuditLogUncheckedUpdateInput>;
    where: Prisma.AuditLogWhereUniqueInput;
};
export type AuditLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AuditLogUpdateManyMutationInput, Prisma.AuditLogUncheckedUpdateManyInput>;
    where?: Prisma.AuditLogWhereInput;
    limit?: number;
};
export type AuditLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where: Prisma.AuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditLogCreateInput, Prisma.AuditLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AuditLogUpdateInput, Prisma.AuditLogUncheckedUpdateInput>;
};
export type AuditLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where: Prisma.AuditLogWhereUniqueInput;
};
export type AuditLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
    limit?: number;
};
export type AuditLog$actorMembershipArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantMembershipSelect<ExtArgs> | null;
    omit?: Prisma.TenantMembershipOmit<ExtArgs> | null;
    include?: Prisma.TenantMembershipInclude<ExtArgs> | null;
    where?: Prisma.TenantMembershipWhereInput;
};
export type AuditLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
};
