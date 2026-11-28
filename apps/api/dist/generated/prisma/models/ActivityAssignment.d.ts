import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ActivityAssignmentModel = runtime.Types.Result.DefaultSelection<Prisma.$ActivityAssignmentPayload>;
export type AggregateActivityAssignment = {
    _count: ActivityAssignmentCountAggregateOutputType | null;
    _min: ActivityAssignmentMinAggregateOutputType | null;
    _max: ActivityAssignmentMaxAggregateOutputType | null;
};
export type ActivityAssignmentMinAggregateOutputType = {
    tenantId: string | null;
    activityId: string | null;
    tenantMembershipId: string | null;
    assignedAt: Date | null;
};
export type ActivityAssignmentMaxAggregateOutputType = {
    tenantId: string | null;
    activityId: string | null;
    tenantMembershipId: string | null;
    assignedAt: Date | null;
};
export type ActivityAssignmentCountAggregateOutputType = {
    tenantId: number;
    activityId: number;
    tenantMembershipId: number;
    assignedAt: number;
    _all: number;
};
export type ActivityAssignmentMinAggregateInputType = {
    tenantId?: true;
    activityId?: true;
    tenantMembershipId?: true;
    assignedAt?: true;
};
export type ActivityAssignmentMaxAggregateInputType = {
    tenantId?: true;
    activityId?: true;
    tenantMembershipId?: true;
    assignedAt?: true;
};
export type ActivityAssignmentCountAggregateInputType = {
    tenantId?: true;
    activityId?: true;
    tenantMembershipId?: true;
    assignedAt?: true;
    _all?: true;
};
export type ActivityAssignmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ActivityAssignmentWhereInput;
    orderBy?: Prisma.ActivityAssignmentOrderByWithRelationInput | Prisma.ActivityAssignmentOrderByWithRelationInput[];
    cursor?: Prisma.ActivityAssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ActivityAssignmentCountAggregateInputType;
    _min?: ActivityAssignmentMinAggregateInputType;
    _max?: ActivityAssignmentMaxAggregateInputType;
};
export type GetActivityAssignmentAggregateType<T extends ActivityAssignmentAggregateArgs> = {
    [P in keyof T & keyof AggregateActivityAssignment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateActivityAssignment[P]> : Prisma.GetScalarType<T[P], AggregateActivityAssignment[P]>;
};
export type ActivityAssignmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ActivityAssignmentWhereInput;
    orderBy?: Prisma.ActivityAssignmentOrderByWithAggregationInput | Prisma.ActivityAssignmentOrderByWithAggregationInput[];
    by: Prisma.ActivityAssignmentScalarFieldEnum[] | Prisma.ActivityAssignmentScalarFieldEnum;
    having?: Prisma.ActivityAssignmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ActivityAssignmentCountAggregateInputType | true;
    _min?: ActivityAssignmentMinAggregateInputType;
    _max?: ActivityAssignmentMaxAggregateInputType;
};
export type ActivityAssignmentGroupByOutputType = {
    tenantId: string;
    activityId: string;
    tenantMembershipId: string;
    assignedAt: Date;
    _count: ActivityAssignmentCountAggregateOutputType | null;
    _min: ActivityAssignmentMinAggregateOutputType | null;
    _max: ActivityAssignmentMaxAggregateOutputType | null;
};
export type GetActivityAssignmentGroupByPayload<T extends ActivityAssignmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ActivityAssignmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ActivityAssignmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ActivityAssignmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ActivityAssignmentGroupByOutputType[P]>;
}>>;
export type ActivityAssignmentWhereInput = {
    AND?: Prisma.ActivityAssignmentWhereInput | Prisma.ActivityAssignmentWhereInput[];
    OR?: Prisma.ActivityAssignmentWhereInput[];
    NOT?: Prisma.ActivityAssignmentWhereInput | Prisma.ActivityAssignmentWhereInput[];
    tenantId?: Prisma.StringFilter<"ActivityAssignment"> | string;
    activityId?: Prisma.StringFilter<"ActivityAssignment"> | string;
    tenantMembershipId?: Prisma.StringFilter<"ActivityAssignment"> | string;
    assignedAt?: Prisma.DateTimeFilter<"ActivityAssignment"> | Date | string;
    activity?: Prisma.XOR<Prisma.ActivityScalarRelationFilter, Prisma.ActivityWhereInput>;
    membership?: Prisma.XOR<Prisma.TenantMembershipScalarRelationFilter, Prisma.TenantMembershipWhereInput>;
};
export type ActivityAssignmentOrderByWithRelationInput = {
    tenantId?: Prisma.SortOrder;
    activityId?: Prisma.SortOrder;
    tenantMembershipId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    activity?: Prisma.ActivityOrderByWithRelationInput;
    membership?: Prisma.TenantMembershipOrderByWithRelationInput;
    _relevance?: Prisma.ActivityAssignmentOrderByRelevanceInput;
};
export type ActivityAssignmentWhereUniqueInput = Prisma.AtLeast<{
    tenantId_activityId_tenantMembershipId?: Prisma.ActivityAssignmentTenantIdActivityIdTenantMembershipIdCompoundUniqueInput;
    AND?: Prisma.ActivityAssignmentWhereInput | Prisma.ActivityAssignmentWhereInput[];
    OR?: Prisma.ActivityAssignmentWhereInput[];
    NOT?: Prisma.ActivityAssignmentWhereInput | Prisma.ActivityAssignmentWhereInput[];
    tenantId?: Prisma.StringFilter<"ActivityAssignment"> | string;
    activityId?: Prisma.StringFilter<"ActivityAssignment"> | string;
    tenantMembershipId?: Prisma.StringFilter<"ActivityAssignment"> | string;
    assignedAt?: Prisma.DateTimeFilter<"ActivityAssignment"> | Date | string;
    activity?: Prisma.XOR<Prisma.ActivityScalarRelationFilter, Prisma.ActivityWhereInput>;
    membership?: Prisma.XOR<Prisma.TenantMembershipScalarRelationFilter, Prisma.TenantMembershipWhereInput>;
}, "tenantId_activityId_tenantMembershipId">;
export type ActivityAssignmentOrderByWithAggregationInput = {
    tenantId?: Prisma.SortOrder;
    activityId?: Prisma.SortOrder;
    tenantMembershipId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    _count?: Prisma.ActivityAssignmentCountOrderByAggregateInput;
    _max?: Prisma.ActivityAssignmentMaxOrderByAggregateInput;
    _min?: Prisma.ActivityAssignmentMinOrderByAggregateInput;
};
export type ActivityAssignmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.ActivityAssignmentScalarWhereWithAggregatesInput | Prisma.ActivityAssignmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.ActivityAssignmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ActivityAssignmentScalarWhereWithAggregatesInput | Prisma.ActivityAssignmentScalarWhereWithAggregatesInput[];
    tenantId?: Prisma.StringWithAggregatesFilter<"ActivityAssignment"> | string;
    activityId?: Prisma.StringWithAggregatesFilter<"ActivityAssignment"> | string;
    tenantMembershipId?: Prisma.StringWithAggregatesFilter<"ActivityAssignment"> | string;
    assignedAt?: Prisma.DateTimeWithAggregatesFilter<"ActivityAssignment"> | Date | string;
};
export type ActivityAssignmentCreateInput = {
    assignedAt?: Date | string;
    activity: Prisma.ActivityCreateNestedOneWithoutAssignmentsInput;
    membership: Prisma.TenantMembershipCreateNestedOneWithoutActivityAssignmentsInput;
};
export type ActivityAssignmentUncheckedCreateInput = {
    tenantId: string;
    activityId: string;
    tenantMembershipId: string;
    assignedAt?: Date | string;
};
export type ActivityAssignmentUpdateInput = {
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activity?: Prisma.ActivityUpdateOneRequiredWithoutAssignmentsNestedInput;
    membership?: Prisma.TenantMembershipUpdateOneRequiredWithoutActivityAssignmentsNestedInput;
};
export type ActivityAssignmentUncheckedUpdateInput = {
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    activityId?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantMembershipId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ActivityAssignmentCreateManyInput = {
    tenantId: string;
    activityId: string;
    tenantMembershipId: string;
    assignedAt?: Date | string;
};
export type ActivityAssignmentUpdateManyMutationInput = {
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ActivityAssignmentUncheckedUpdateManyInput = {
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    activityId?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantMembershipId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ActivityAssignmentListRelationFilter = {
    every?: Prisma.ActivityAssignmentWhereInput;
    some?: Prisma.ActivityAssignmentWhereInput;
    none?: Prisma.ActivityAssignmentWhereInput;
};
export type ActivityAssignmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ActivityAssignmentOrderByRelevanceInput = {
    fields: Prisma.ActivityAssignmentOrderByRelevanceFieldEnum | Prisma.ActivityAssignmentOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type ActivityAssignmentTenantIdActivityIdTenantMembershipIdCompoundUniqueInput = {
    tenantId: string;
    activityId: string;
    tenantMembershipId: string;
};
export type ActivityAssignmentCountOrderByAggregateInput = {
    tenantId?: Prisma.SortOrder;
    activityId?: Prisma.SortOrder;
    tenantMembershipId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
};
export type ActivityAssignmentMaxOrderByAggregateInput = {
    tenantId?: Prisma.SortOrder;
    activityId?: Prisma.SortOrder;
    tenantMembershipId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
};
export type ActivityAssignmentMinOrderByAggregateInput = {
    tenantId?: Prisma.SortOrder;
    activityId?: Prisma.SortOrder;
    tenantMembershipId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
};
export type ActivityAssignmentCreateNestedManyWithoutMembershipInput = {
    create?: Prisma.XOR<Prisma.ActivityAssignmentCreateWithoutMembershipInput, Prisma.ActivityAssignmentUncheckedCreateWithoutMembershipInput> | Prisma.ActivityAssignmentCreateWithoutMembershipInput[] | Prisma.ActivityAssignmentUncheckedCreateWithoutMembershipInput[];
    connectOrCreate?: Prisma.ActivityAssignmentCreateOrConnectWithoutMembershipInput | Prisma.ActivityAssignmentCreateOrConnectWithoutMembershipInput[];
    createMany?: Prisma.ActivityAssignmentCreateManyMembershipInputEnvelope;
    connect?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
};
export type ActivityAssignmentUncheckedCreateNestedManyWithoutMembershipInput = {
    create?: Prisma.XOR<Prisma.ActivityAssignmentCreateWithoutMembershipInput, Prisma.ActivityAssignmentUncheckedCreateWithoutMembershipInput> | Prisma.ActivityAssignmentCreateWithoutMembershipInput[] | Prisma.ActivityAssignmentUncheckedCreateWithoutMembershipInput[];
    connectOrCreate?: Prisma.ActivityAssignmentCreateOrConnectWithoutMembershipInput | Prisma.ActivityAssignmentCreateOrConnectWithoutMembershipInput[];
    createMany?: Prisma.ActivityAssignmentCreateManyMembershipInputEnvelope;
    connect?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
};
export type ActivityAssignmentUpdateManyWithoutMembershipNestedInput = {
    create?: Prisma.XOR<Prisma.ActivityAssignmentCreateWithoutMembershipInput, Prisma.ActivityAssignmentUncheckedCreateWithoutMembershipInput> | Prisma.ActivityAssignmentCreateWithoutMembershipInput[] | Prisma.ActivityAssignmentUncheckedCreateWithoutMembershipInput[];
    connectOrCreate?: Prisma.ActivityAssignmentCreateOrConnectWithoutMembershipInput | Prisma.ActivityAssignmentCreateOrConnectWithoutMembershipInput[];
    upsert?: Prisma.ActivityAssignmentUpsertWithWhereUniqueWithoutMembershipInput | Prisma.ActivityAssignmentUpsertWithWhereUniqueWithoutMembershipInput[];
    createMany?: Prisma.ActivityAssignmentCreateManyMembershipInputEnvelope;
    set?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
    disconnect?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
    delete?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
    connect?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
    update?: Prisma.ActivityAssignmentUpdateWithWhereUniqueWithoutMembershipInput | Prisma.ActivityAssignmentUpdateWithWhereUniqueWithoutMembershipInput[];
    updateMany?: Prisma.ActivityAssignmentUpdateManyWithWhereWithoutMembershipInput | Prisma.ActivityAssignmentUpdateManyWithWhereWithoutMembershipInput[];
    deleteMany?: Prisma.ActivityAssignmentScalarWhereInput | Prisma.ActivityAssignmentScalarWhereInput[];
};
export type ActivityAssignmentUncheckedUpdateManyWithoutMembershipNestedInput = {
    create?: Prisma.XOR<Prisma.ActivityAssignmentCreateWithoutMembershipInput, Prisma.ActivityAssignmentUncheckedCreateWithoutMembershipInput> | Prisma.ActivityAssignmentCreateWithoutMembershipInput[] | Prisma.ActivityAssignmentUncheckedCreateWithoutMembershipInput[];
    connectOrCreate?: Prisma.ActivityAssignmentCreateOrConnectWithoutMembershipInput | Prisma.ActivityAssignmentCreateOrConnectWithoutMembershipInput[];
    upsert?: Prisma.ActivityAssignmentUpsertWithWhereUniqueWithoutMembershipInput | Prisma.ActivityAssignmentUpsertWithWhereUniqueWithoutMembershipInput[];
    createMany?: Prisma.ActivityAssignmentCreateManyMembershipInputEnvelope;
    set?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
    disconnect?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
    delete?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
    connect?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
    update?: Prisma.ActivityAssignmentUpdateWithWhereUniqueWithoutMembershipInput | Prisma.ActivityAssignmentUpdateWithWhereUniqueWithoutMembershipInput[];
    updateMany?: Prisma.ActivityAssignmentUpdateManyWithWhereWithoutMembershipInput | Prisma.ActivityAssignmentUpdateManyWithWhereWithoutMembershipInput[];
    deleteMany?: Prisma.ActivityAssignmentScalarWhereInput | Prisma.ActivityAssignmentScalarWhereInput[];
};
export type ActivityAssignmentCreateNestedManyWithoutActivityInput = {
    create?: Prisma.XOR<Prisma.ActivityAssignmentCreateWithoutActivityInput, Prisma.ActivityAssignmentUncheckedCreateWithoutActivityInput> | Prisma.ActivityAssignmentCreateWithoutActivityInput[] | Prisma.ActivityAssignmentUncheckedCreateWithoutActivityInput[];
    connectOrCreate?: Prisma.ActivityAssignmentCreateOrConnectWithoutActivityInput | Prisma.ActivityAssignmentCreateOrConnectWithoutActivityInput[];
    createMany?: Prisma.ActivityAssignmentCreateManyActivityInputEnvelope;
    connect?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
};
export type ActivityAssignmentUncheckedCreateNestedManyWithoutActivityInput = {
    create?: Prisma.XOR<Prisma.ActivityAssignmentCreateWithoutActivityInput, Prisma.ActivityAssignmentUncheckedCreateWithoutActivityInput> | Prisma.ActivityAssignmentCreateWithoutActivityInput[] | Prisma.ActivityAssignmentUncheckedCreateWithoutActivityInput[];
    connectOrCreate?: Prisma.ActivityAssignmentCreateOrConnectWithoutActivityInput | Prisma.ActivityAssignmentCreateOrConnectWithoutActivityInput[];
    createMany?: Prisma.ActivityAssignmentCreateManyActivityInputEnvelope;
    connect?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
};
export type ActivityAssignmentUpdateManyWithoutActivityNestedInput = {
    create?: Prisma.XOR<Prisma.ActivityAssignmentCreateWithoutActivityInput, Prisma.ActivityAssignmentUncheckedCreateWithoutActivityInput> | Prisma.ActivityAssignmentCreateWithoutActivityInput[] | Prisma.ActivityAssignmentUncheckedCreateWithoutActivityInput[];
    connectOrCreate?: Prisma.ActivityAssignmentCreateOrConnectWithoutActivityInput | Prisma.ActivityAssignmentCreateOrConnectWithoutActivityInput[];
    upsert?: Prisma.ActivityAssignmentUpsertWithWhereUniqueWithoutActivityInput | Prisma.ActivityAssignmentUpsertWithWhereUniqueWithoutActivityInput[];
    createMany?: Prisma.ActivityAssignmentCreateManyActivityInputEnvelope;
    set?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
    disconnect?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
    delete?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
    connect?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
    update?: Prisma.ActivityAssignmentUpdateWithWhereUniqueWithoutActivityInput | Prisma.ActivityAssignmentUpdateWithWhereUniqueWithoutActivityInput[];
    updateMany?: Prisma.ActivityAssignmentUpdateManyWithWhereWithoutActivityInput | Prisma.ActivityAssignmentUpdateManyWithWhereWithoutActivityInput[];
    deleteMany?: Prisma.ActivityAssignmentScalarWhereInput | Prisma.ActivityAssignmentScalarWhereInput[];
};
export type ActivityAssignmentUncheckedUpdateManyWithoutActivityNestedInput = {
    create?: Prisma.XOR<Prisma.ActivityAssignmentCreateWithoutActivityInput, Prisma.ActivityAssignmentUncheckedCreateWithoutActivityInput> | Prisma.ActivityAssignmentCreateWithoutActivityInput[] | Prisma.ActivityAssignmentUncheckedCreateWithoutActivityInput[];
    connectOrCreate?: Prisma.ActivityAssignmentCreateOrConnectWithoutActivityInput | Prisma.ActivityAssignmentCreateOrConnectWithoutActivityInput[];
    upsert?: Prisma.ActivityAssignmentUpsertWithWhereUniqueWithoutActivityInput | Prisma.ActivityAssignmentUpsertWithWhereUniqueWithoutActivityInput[];
    createMany?: Prisma.ActivityAssignmentCreateManyActivityInputEnvelope;
    set?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
    disconnect?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
    delete?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
    connect?: Prisma.ActivityAssignmentWhereUniqueInput | Prisma.ActivityAssignmentWhereUniqueInput[];
    update?: Prisma.ActivityAssignmentUpdateWithWhereUniqueWithoutActivityInput | Prisma.ActivityAssignmentUpdateWithWhereUniqueWithoutActivityInput[];
    updateMany?: Prisma.ActivityAssignmentUpdateManyWithWhereWithoutActivityInput | Prisma.ActivityAssignmentUpdateManyWithWhereWithoutActivityInput[];
    deleteMany?: Prisma.ActivityAssignmentScalarWhereInput | Prisma.ActivityAssignmentScalarWhereInput[];
};
export type ActivityAssignmentCreateWithoutMembershipInput = {
    assignedAt?: Date | string;
    activity: Prisma.ActivityCreateNestedOneWithoutAssignmentsInput;
};
export type ActivityAssignmentUncheckedCreateWithoutMembershipInput = {
    activityId: string;
    assignedAt?: Date | string;
};
export type ActivityAssignmentCreateOrConnectWithoutMembershipInput = {
    where: Prisma.ActivityAssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.ActivityAssignmentCreateWithoutMembershipInput, Prisma.ActivityAssignmentUncheckedCreateWithoutMembershipInput>;
};
export type ActivityAssignmentCreateManyMembershipInputEnvelope = {
    data: Prisma.ActivityAssignmentCreateManyMembershipInput | Prisma.ActivityAssignmentCreateManyMembershipInput[];
    skipDuplicates?: boolean;
};
export type ActivityAssignmentUpsertWithWhereUniqueWithoutMembershipInput = {
    where: Prisma.ActivityAssignmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.ActivityAssignmentUpdateWithoutMembershipInput, Prisma.ActivityAssignmentUncheckedUpdateWithoutMembershipInput>;
    create: Prisma.XOR<Prisma.ActivityAssignmentCreateWithoutMembershipInput, Prisma.ActivityAssignmentUncheckedCreateWithoutMembershipInput>;
};
export type ActivityAssignmentUpdateWithWhereUniqueWithoutMembershipInput = {
    where: Prisma.ActivityAssignmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.ActivityAssignmentUpdateWithoutMembershipInput, Prisma.ActivityAssignmentUncheckedUpdateWithoutMembershipInput>;
};
export type ActivityAssignmentUpdateManyWithWhereWithoutMembershipInput = {
    where: Prisma.ActivityAssignmentScalarWhereInput;
    data: Prisma.XOR<Prisma.ActivityAssignmentUpdateManyMutationInput, Prisma.ActivityAssignmentUncheckedUpdateManyWithoutMembershipInput>;
};
export type ActivityAssignmentScalarWhereInput = {
    AND?: Prisma.ActivityAssignmentScalarWhereInput | Prisma.ActivityAssignmentScalarWhereInput[];
    OR?: Prisma.ActivityAssignmentScalarWhereInput[];
    NOT?: Prisma.ActivityAssignmentScalarWhereInput | Prisma.ActivityAssignmentScalarWhereInput[];
    tenantId?: Prisma.StringFilter<"ActivityAssignment"> | string;
    activityId?: Prisma.StringFilter<"ActivityAssignment"> | string;
    tenantMembershipId?: Prisma.StringFilter<"ActivityAssignment"> | string;
    assignedAt?: Prisma.DateTimeFilter<"ActivityAssignment"> | Date | string;
};
export type ActivityAssignmentCreateWithoutActivityInput = {
    assignedAt?: Date | string;
    membership: Prisma.TenantMembershipCreateNestedOneWithoutActivityAssignmentsInput;
};
export type ActivityAssignmentUncheckedCreateWithoutActivityInput = {
    tenantMembershipId: string;
    assignedAt?: Date | string;
};
export type ActivityAssignmentCreateOrConnectWithoutActivityInput = {
    where: Prisma.ActivityAssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.ActivityAssignmentCreateWithoutActivityInput, Prisma.ActivityAssignmentUncheckedCreateWithoutActivityInput>;
};
export type ActivityAssignmentCreateManyActivityInputEnvelope = {
    data: Prisma.ActivityAssignmentCreateManyActivityInput | Prisma.ActivityAssignmentCreateManyActivityInput[];
    skipDuplicates?: boolean;
};
export type ActivityAssignmentUpsertWithWhereUniqueWithoutActivityInput = {
    where: Prisma.ActivityAssignmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.ActivityAssignmentUpdateWithoutActivityInput, Prisma.ActivityAssignmentUncheckedUpdateWithoutActivityInput>;
    create: Prisma.XOR<Prisma.ActivityAssignmentCreateWithoutActivityInput, Prisma.ActivityAssignmentUncheckedCreateWithoutActivityInput>;
};
export type ActivityAssignmentUpdateWithWhereUniqueWithoutActivityInput = {
    where: Prisma.ActivityAssignmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.ActivityAssignmentUpdateWithoutActivityInput, Prisma.ActivityAssignmentUncheckedUpdateWithoutActivityInput>;
};
export type ActivityAssignmentUpdateManyWithWhereWithoutActivityInput = {
    where: Prisma.ActivityAssignmentScalarWhereInput;
    data: Prisma.XOR<Prisma.ActivityAssignmentUpdateManyMutationInput, Prisma.ActivityAssignmentUncheckedUpdateManyWithoutActivityInput>;
};
export type ActivityAssignmentCreateManyMembershipInput = {
    activityId: string;
    assignedAt?: Date | string;
};
export type ActivityAssignmentUpdateWithoutMembershipInput = {
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activity?: Prisma.ActivityUpdateOneRequiredWithoutAssignmentsNestedInput;
};
export type ActivityAssignmentUncheckedUpdateWithoutMembershipInput = {
    activityId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ActivityAssignmentUncheckedUpdateManyWithoutMembershipInput = {
    activityId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ActivityAssignmentCreateManyActivityInput = {
    tenantMembershipId: string;
    assignedAt?: Date | string;
};
export type ActivityAssignmentUpdateWithoutActivityInput = {
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    membership?: Prisma.TenantMembershipUpdateOneRequiredWithoutActivityAssignmentsNestedInput;
};
export type ActivityAssignmentUncheckedUpdateWithoutActivityInput = {
    tenantMembershipId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ActivityAssignmentUncheckedUpdateManyWithoutActivityInput = {
    tenantMembershipId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ActivityAssignmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    tenantId?: boolean;
    activityId?: boolean;
    tenantMembershipId?: boolean;
    assignedAt?: boolean;
    activity?: boolean | Prisma.ActivityDefaultArgs<ExtArgs>;
    membership?: boolean | Prisma.TenantMembershipDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["activityAssignment"]>;
export type ActivityAssignmentSelectScalar = {
    tenantId?: boolean;
    activityId?: boolean;
    tenantMembershipId?: boolean;
    assignedAt?: boolean;
};
export type ActivityAssignmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"tenantId" | "activityId" | "tenantMembershipId" | "assignedAt", ExtArgs["result"]["activityAssignment"]>;
export type ActivityAssignmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    activity?: boolean | Prisma.ActivityDefaultArgs<ExtArgs>;
    membership?: boolean | Prisma.TenantMembershipDefaultArgs<ExtArgs>;
};
export type $ActivityAssignmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ActivityAssignment";
    objects: {
        activity: Prisma.$ActivityPayload<ExtArgs>;
        membership: Prisma.$TenantMembershipPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        tenantId: string;
        activityId: string;
        tenantMembershipId: string;
        assignedAt: Date;
    }, ExtArgs["result"]["activityAssignment"]>;
    composites: {};
};
export type ActivityAssignmentGetPayload<S extends boolean | null | undefined | ActivityAssignmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ActivityAssignmentPayload, S>;
export type ActivityAssignmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ActivityAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ActivityAssignmentCountAggregateInputType | true;
};
export interface ActivityAssignmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ActivityAssignment'];
        meta: {
            name: 'ActivityAssignment';
        };
    };
    findUnique<T extends ActivityAssignmentFindUniqueArgs>(args: Prisma.SelectSubset<T, ActivityAssignmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ActivityAssignmentClient<runtime.Types.Result.GetResult<Prisma.$ActivityAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ActivityAssignmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ActivityAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ActivityAssignmentClient<runtime.Types.Result.GetResult<Prisma.$ActivityAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ActivityAssignmentFindFirstArgs>(args?: Prisma.SelectSubset<T, ActivityAssignmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__ActivityAssignmentClient<runtime.Types.Result.GetResult<Prisma.$ActivityAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ActivityAssignmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ActivityAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ActivityAssignmentClient<runtime.Types.Result.GetResult<Prisma.$ActivityAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ActivityAssignmentFindManyArgs>(args?: Prisma.SelectSubset<T, ActivityAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ActivityAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ActivityAssignmentCreateArgs>(args: Prisma.SelectSubset<T, ActivityAssignmentCreateArgs<ExtArgs>>): Prisma.Prisma__ActivityAssignmentClient<runtime.Types.Result.GetResult<Prisma.$ActivityAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ActivityAssignmentCreateManyArgs>(args?: Prisma.SelectSubset<T, ActivityAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends ActivityAssignmentDeleteArgs>(args: Prisma.SelectSubset<T, ActivityAssignmentDeleteArgs<ExtArgs>>): Prisma.Prisma__ActivityAssignmentClient<runtime.Types.Result.GetResult<Prisma.$ActivityAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ActivityAssignmentUpdateArgs>(args: Prisma.SelectSubset<T, ActivityAssignmentUpdateArgs<ExtArgs>>): Prisma.Prisma__ActivityAssignmentClient<runtime.Types.Result.GetResult<Prisma.$ActivityAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ActivityAssignmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, ActivityAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ActivityAssignmentUpdateManyArgs>(args: Prisma.SelectSubset<T, ActivityAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends ActivityAssignmentUpsertArgs>(args: Prisma.SelectSubset<T, ActivityAssignmentUpsertArgs<ExtArgs>>): Prisma.Prisma__ActivityAssignmentClient<runtime.Types.Result.GetResult<Prisma.$ActivityAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ActivityAssignmentCountArgs>(args?: Prisma.Subset<T, ActivityAssignmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ActivityAssignmentCountAggregateOutputType> : number>;
    aggregate<T extends ActivityAssignmentAggregateArgs>(args: Prisma.Subset<T, ActivityAssignmentAggregateArgs>): Prisma.PrismaPromise<GetActivityAssignmentAggregateType<T>>;
    groupBy<T extends ActivityAssignmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ActivityAssignmentGroupByArgs['orderBy'];
    } : {
        orderBy?: ActivityAssignmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ActivityAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ActivityAssignmentFieldRefs;
}
export interface Prisma__ActivityAssignmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    activity<T extends Prisma.ActivityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ActivityDefaultArgs<ExtArgs>>): Prisma.Prisma__ActivityClient<runtime.Types.Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    membership<T extends Prisma.TenantMembershipDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantMembershipDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantMembershipClient<runtime.Types.Result.GetResult<Prisma.$TenantMembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ActivityAssignmentFieldRefs {
    readonly tenantId: Prisma.FieldRef<"ActivityAssignment", 'String'>;
    readonly activityId: Prisma.FieldRef<"ActivityAssignment", 'String'>;
    readonly tenantMembershipId: Prisma.FieldRef<"ActivityAssignment", 'String'>;
    readonly assignedAt: Prisma.FieldRef<"ActivityAssignment", 'DateTime'>;
}
export type ActivityAssignmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ActivityAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.ActivityAssignmentOmit<ExtArgs> | null;
    include?: Prisma.ActivityAssignmentInclude<ExtArgs> | null;
    where: Prisma.ActivityAssignmentWhereUniqueInput;
};
export type ActivityAssignmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ActivityAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.ActivityAssignmentOmit<ExtArgs> | null;
    include?: Prisma.ActivityAssignmentInclude<ExtArgs> | null;
    where: Prisma.ActivityAssignmentWhereUniqueInput;
};
export type ActivityAssignmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ActivityAssignmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ActivityAssignmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ActivityAssignmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ActivityAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.ActivityAssignmentOmit<ExtArgs> | null;
    include?: Prisma.ActivityAssignmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ActivityAssignmentCreateInput, Prisma.ActivityAssignmentUncheckedCreateInput>;
};
export type ActivityAssignmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ActivityAssignmentCreateManyInput | Prisma.ActivityAssignmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ActivityAssignmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ActivityAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.ActivityAssignmentOmit<ExtArgs> | null;
    include?: Prisma.ActivityAssignmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ActivityAssignmentUpdateInput, Prisma.ActivityAssignmentUncheckedUpdateInput>;
    where: Prisma.ActivityAssignmentWhereUniqueInput;
};
export type ActivityAssignmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ActivityAssignmentUpdateManyMutationInput, Prisma.ActivityAssignmentUncheckedUpdateManyInput>;
    where?: Prisma.ActivityAssignmentWhereInput;
    limit?: number;
};
export type ActivityAssignmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ActivityAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.ActivityAssignmentOmit<ExtArgs> | null;
    include?: Prisma.ActivityAssignmentInclude<ExtArgs> | null;
    where: Prisma.ActivityAssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.ActivityAssignmentCreateInput, Prisma.ActivityAssignmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ActivityAssignmentUpdateInput, Prisma.ActivityAssignmentUncheckedUpdateInput>;
};
export type ActivityAssignmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ActivityAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.ActivityAssignmentOmit<ExtArgs> | null;
    include?: Prisma.ActivityAssignmentInclude<ExtArgs> | null;
    where: Prisma.ActivityAssignmentWhereUniqueInput;
};
export type ActivityAssignmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ActivityAssignmentWhereInput;
    limit?: number;
};
export type ActivityAssignmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ActivityAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.ActivityAssignmentOmit<ExtArgs> | null;
    include?: Prisma.ActivityAssignmentInclude<ExtArgs> | null;
};
