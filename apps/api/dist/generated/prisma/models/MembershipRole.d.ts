import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MembershipRoleModel = runtime.Types.Result.DefaultSelection<Prisma.$MembershipRolePayload>;
export type AggregateMembershipRole = {
    _count: MembershipRoleCountAggregateOutputType | null;
    _min: MembershipRoleMinAggregateOutputType | null;
    _max: MembershipRoleMaxAggregateOutputType | null;
};
export type MembershipRoleMinAggregateOutputType = {
    tenantId: string | null;
    tenantMembershipId: string | null;
    roleId: string | null;
    assignedAt: Date | null;
};
export type MembershipRoleMaxAggregateOutputType = {
    tenantId: string | null;
    tenantMembershipId: string | null;
    roleId: string | null;
    assignedAt: Date | null;
};
export type MembershipRoleCountAggregateOutputType = {
    tenantId: number;
    tenantMembershipId: number;
    roleId: number;
    assignedAt: number;
    _all: number;
};
export type MembershipRoleMinAggregateInputType = {
    tenantId?: true;
    tenantMembershipId?: true;
    roleId?: true;
    assignedAt?: true;
};
export type MembershipRoleMaxAggregateInputType = {
    tenantId?: true;
    tenantMembershipId?: true;
    roleId?: true;
    assignedAt?: true;
};
export type MembershipRoleCountAggregateInputType = {
    tenantId?: true;
    tenantMembershipId?: true;
    roleId?: true;
    assignedAt?: true;
    _all?: true;
};
export type MembershipRoleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MembershipRoleWhereInput;
    orderBy?: Prisma.MembershipRoleOrderByWithRelationInput | Prisma.MembershipRoleOrderByWithRelationInput[];
    cursor?: Prisma.MembershipRoleWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MembershipRoleCountAggregateInputType;
    _min?: MembershipRoleMinAggregateInputType;
    _max?: MembershipRoleMaxAggregateInputType;
};
export type GetMembershipRoleAggregateType<T extends MembershipRoleAggregateArgs> = {
    [P in keyof T & keyof AggregateMembershipRole]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMembershipRole[P]> : Prisma.GetScalarType<T[P], AggregateMembershipRole[P]>;
};
export type MembershipRoleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MembershipRoleWhereInput;
    orderBy?: Prisma.MembershipRoleOrderByWithAggregationInput | Prisma.MembershipRoleOrderByWithAggregationInput[];
    by: Prisma.MembershipRoleScalarFieldEnum[] | Prisma.MembershipRoleScalarFieldEnum;
    having?: Prisma.MembershipRoleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MembershipRoleCountAggregateInputType | true;
    _min?: MembershipRoleMinAggregateInputType;
    _max?: MembershipRoleMaxAggregateInputType;
};
export type MembershipRoleGroupByOutputType = {
    tenantId: string;
    tenantMembershipId: string;
    roleId: string;
    assignedAt: Date;
    _count: MembershipRoleCountAggregateOutputType | null;
    _min: MembershipRoleMinAggregateOutputType | null;
    _max: MembershipRoleMaxAggregateOutputType | null;
};
export type GetMembershipRoleGroupByPayload<T extends MembershipRoleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MembershipRoleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MembershipRoleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MembershipRoleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MembershipRoleGroupByOutputType[P]>;
}>>;
export type MembershipRoleWhereInput = {
    AND?: Prisma.MembershipRoleWhereInput | Prisma.MembershipRoleWhereInput[];
    OR?: Prisma.MembershipRoleWhereInput[];
    NOT?: Prisma.MembershipRoleWhereInput | Prisma.MembershipRoleWhereInput[];
    tenantId?: Prisma.StringFilter<"MembershipRole"> | string;
    tenantMembershipId?: Prisma.StringFilter<"MembershipRole"> | string;
    roleId?: Prisma.StringFilter<"MembershipRole"> | string;
    assignedAt?: Prisma.DateTimeFilter<"MembershipRole"> | Date | string;
    membership?: Prisma.XOR<Prisma.TenantMembershipScalarRelationFilter, Prisma.TenantMembershipWhereInput>;
    role?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
};
export type MembershipRoleOrderByWithRelationInput = {
    tenantId?: Prisma.SortOrder;
    tenantMembershipId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    membership?: Prisma.TenantMembershipOrderByWithRelationInput;
    role?: Prisma.RoleOrderByWithRelationInput;
    _relevance?: Prisma.MembershipRoleOrderByRelevanceInput;
};
export type MembershipRoleWhereUniqueInput = Prisma.AtLeast<{
    tenantId_tenantMembershipId_roleId?: Prisma.MembershipRoleTenantIdTenantMembershipIdRoleIdCompoundUniqueInput;
    AND?: Prisma.MembershipRoleWhereInput | Prisma.MembershipRoleWhereInput[];
    OR?: Prisma.MembershipRoleWhereInput[];
    NOT?: Prisma.MembershipRoleWhereInput | Prisma.MembershipRoleWhereInput[];
    tenantId?: Prisma.StringFilter<"MembershipRole"> | string;
    tenantMembershipId?: Prisma.StringFilter<"MembershipRole"> | string;
    roleId?: Prisma.StringFilter<"MembershipRole"> | string;
    assignedAt?: Prisma.DateTimeFilter<"MembershipRole"> | Date | string;
    membership?: Prisma.XOR<Prisma.TenantMembershipScalarRelationFilter, Prisma.TenantMembershipWhereInput>;
    role?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
}, "tenantId_tenantMembershipId_roleId">;
export type MembershipRoleOrderByWithAggregationInput = {
    tenantId?: Prisma.SortOrder;
    tenantMembershipId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    _count?: Prisma.MembershipRoleCountOrderByAggregateInput;
    _max?: Prisma.MembershipRoleMaxOrderByAggregateInput;
    _min?: Prisma.MembershipRoleMinOrderByAggregateInput;
};
export type MembershipRoleScalarWhereWithAggregatesInput = {
    AND?: Prisma.MembershipRoleScalarWhereWithAggregatesInput | Prisma.MembershipRoleScalarWhereWithAggregatesInput[];
    OR?: Prisma.MembershipRoleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MembershipRoleScalarWhereWithAggregatesInput | Prisma.MembershipRoleScalarWhereWithAggregatesInput[];
    tenantId?: Prisma.StringWithAggregatesFilter<"MembershipRole"> | string;
    tenantMembershipId?: Prisma.StringWithAggregatesFilter<"MembershipRole"> | string;
    roleId?: Prisma.StringWithAggregatesFilter<"MembershipRole"> | string;
    assignedAt?: Prisma.DateTimeWithAggregatesFilter<"MembershipRole"> | Date | string;
};
export type MembershipRoleCreateInput = {
    assignedAt?: Date | string;
    membership: Prisma.TenantMembershipCreateNestedOneWithoutMembershipRolesInput;
    role: Prisma.RoleCreateNestedOneWithoutMembershipRolesInput;
};
export type MembershipRoleUncheckedCreateInput = {
    tenantId: string;
    tenantMembershipId: string;
    roleId: string;
    assignedAt?: Date | string;
};
export type MembershipRoleUpdateInput = {
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    membership?: Prisma.TenantMembershipUpdateOneRequiredWithoutMembershipRolesNestedInput;
    role?: Prisma.RoleUpdateOneRequiredWithoutMembershipRolesNestedInput;
};
export type MembershipRoleUncheckedUpdateInput = {
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantMembershipId?: Prisma.StringFieldUpdateOperationsInput | string;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MembershipRoleCreateManyInput = {
    tenantId: string;
    tenantMembershipId: string;
    roleId: string;
    assignedAt?: Date | string;
};
export type MembershipRoleUpdateManyMutationInput = {
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MembershipRoleUncheckedUpdateManyInput = {
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantMembershipId?: Prisma.StringFieldUpdateOperationsInput | string;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MembershipRoleListRelationFilter = {
    every?: Prisma.MembershipRoleWhereInput;
    some?: Prisma.MembershipRoleWhereInput;
    none?: Prisma.MembershipRoleWhereInput;
};
export type MembershipRoleOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MembershipRoleOrderByRelevanceInput = {
    fields: Prisma.MembershipRoleOrderByRelevanceFieldEnum | Prisma.MembershipRoleOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type MembershipRoleTenantIdTenantMembershipIdRoleIdCompoundUniqueInput = {
    tenantId: string;
    tenantMembershipId: string;
    roleId: string;
};
export type MembershipRoleCountOrderByAggregateInput = {
    tenantId?: Prisma.SortOrder;
    tenantMembershipId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
};
export type MembershipRoleMaxOrderByAggregateInput = {
    tenantId?: Prisma.SortOrder;
    tenantMembershipId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
};
export type MembershipRoleMinOrderByAggregateInput = {
    tenantId?: Prisma.SortOrder;
    tenantMembershipId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
};
export type MembershipRoleCreateNestedManyWithoutMembershipInput = {
    create?: Prisma.XOR<Prisma.MembershipRoleCreateWithoutMembershipInput, Prisma.MembershipRoleUncheckedCreateWithoutMembershipInput> | Prisma.MembershipRoleCreateWithoutMembershipInput[] | Prisma.MembershipRoleUncheckedCreateWithoutMembershipInput[];
    connectOrCreate?: Prisma.MembershipRoleCreateOrConnectWithoutMembershipInput | Prisma.MembershipRoleCreateOrConnectWithoutMembershipInput[];
    createMany?: Prisma.MembershipRoleCreateManyMembershipInputEnvelope;
    connect?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
};
export type MembershipRoleUncheckedCreateNestedManyWithoutMembershipInput = {
    create?: Prisma.XOR<Prisma.MembershipRoleCreateWithoutMembershipInput, Prisma.MembershipRoleUncheckedCreateWithoutMembershipInput> | Prisma.MembershipRoleCreateWithoutMembershipInput[] | Prisma.MembershipRoleUncheckedCreateWithoutMembershipInput[];
    connectOrCreate?: Prisma.MembershipRoleCreateOrConnectWithoutMembershipInput | Prisma.MembershipRoleCreateOrConnectWithoutMembershipInput[];
    createMany?: Prisma.MembershipRoleCreateManyMembershipInputEnvelope;
    connect?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
};
export type MembershipRoleUpdateManyWithoutMembershipNestedInput = {
    create?: Prisma.XOR<Prisma.MembershipRoleCreateWithoutMembershipInput, Prisma.MembershipRoleUncheckedCreateWithoutMembershipInput> | Prisma.MembershipRoleCreateWithoutMembershipInput[] | Prisma.MembershipRoleUncheckedCreateWithoutMembershipInput[];
    connectOrCreate?: Prisma.MembershipRoleCreateOrConnectWithoutMembershipInput | Prisma.MembershipRoleCreateOrConnectWithoutMembershipInput[];
    upsert?: Prisma.MembershipRoleUpsertWithWhereUniqueWithoutMembershipInput | Prisma.MembershipRoleUpsertWithWhereUniqueWithoutMembershipInput[];
    createMany?: Prisma.MembershipRoleCreateManyMembershipInputEnvelope;
    set?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
    disconnect?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
    delete?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
    connect?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
    update?: Prisma.MembershipRoleUpdateWithWhereUniqueWithoutMembershipInput | Prisma.MembershipRoleUpdateWithWhereUniqueWithoutMembershipInput[];
    updateMany?: Prisma.MembershipRoleUpdateManyWithWhereWithoutMembershipInput | Prisma.MembershipRoleUpdateManyWithWhereWithoutMembershipInput[];
    deleteMany?: Prisma.MembershipRoleScalarWhereInput | Prisma.MembershipRoleScalarWhereInput[];
};
export type MembershipRoleUncheckedUpdateManyWithoutMembershipNestedInput = {
    create?: Prisma.XOR<Prisma.MembershipRoleCreateWithoutMembershipInput, Prisma.MembershipRoleUncheckedCreateWithoutMembershipInput> | Prisma.MembershipRoleCreateWithoutMembershipInput[] | Prisma.MembershipRoleUncheckedCreateWithoutMembershipInput[];
    connectOrCreate?: Prisma.MembershipRoleCreateOrConnectWithoutMembershipInput | Prisma.MembershipRoleCreateOrConnectWithoutMembershipInput[];
    upsert?: Prisma.MembershipRoleUpsertWithWhereUniqueWithoutMembershipInput | Prisma.MembershipRoleUpsertWithWhereUniqueWithoutMembershipInput[];
    createMany?: Prisma.MembershipRoleCreateManyMembershipInputEnvelope;
    set?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
    disconnect?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
    delete?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
    connect?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
    update?: Prisma.MembershipRoleUpdateWithWhereUniqueWithoutMembershipInput | Prisma.MembershipRoleUpdateWithWhereUniqueWithoutMembershipInput[];
    updateMany?: Prisma.MembershipRoleUpdateManyWithWhereWithoutMembershipInput | Prisma.MembershipRoleUpdateManyWithWhereWithoutMembershipInput[];
    deleteMany?: Prisma.MembershipRoleScalarWhereInput | Prisma.MembershipRoleScalarWhereInput[];
};
export type MembershipRoleCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.MembershipRoleCreateWithoutRoleInput, Prisma.MembershipRoleUncheckedCreateWithoutRoleInput> | Prisma.MembershipRoleCreateWithoutRoleInput[] | Prisma.MembershipRoleUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.MembershipRoleCreateOrConnectWithoutRoleInput | Prisma.MembershipRoleCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.MembershipRoleCreateManyRoleInputEnvelope;
    connect?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
};
export type MembershipRoleUncheckedCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.MembershipRoleCreateWithoutRoleInput, Prisma.MembershipRoleUncheckedCreateWithoutRoleInput> | Prisma.MembershipRoleCreateWithoutRoleInput[] | Prisma.MembershipRoleUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.MembershipRoleCreateOrConnectWithoutRoleInput | Prisma.MembershipRoleCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.MembershipRoleCreateManyRoleInputEnvelope;
    connect?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
};
export type MembershipRoleUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.MembershipRoleCreateWithoutRoleInput, Prisma.MembershipRoleUncheckedCreateWithoutRoleInput> | Prisma.MembershipRoleCreateWithoutRoleInput[] | Prisma.MembershipRoleUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.MembershipRoleCreateOrConnectWithoutRoleInput | Prisma.MembershipRoleCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.MembershipRoleUpsertWithWhereUniqueWithoutRoleInput | Prisma.MembershipRoleUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.MembershipRoleCreateManyRoleInputEnvelope;
    set?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
    disconnect?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
    delete?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
    connect?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
    update?: Prisma.MembershipRoleUpdateWithWhereUniqueWithoutRoleInput | Prisma.MembershipRoleUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.MembershipRoleUpdateManyWithWhereWithoutRoleInput | Prisma.MembershipRoleUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.MembershipRoleScalarWhereInput | Prisma.MembershipRoleScalarWhereInput[];
};
export type MembershipRoleUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.MembershipRoleCreateWithoutRoleInput, Prisma.MembershipRoleUncheckedCreateWithoutRoleInput> | Prisma.MembershipRoleCreateWithoutRoleInput[] | Prisma.MembershipRoleUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.MembershipRoleCreateOrConnectWithoutRoleInput | Prisma.MembershipRoleCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.MembershipRoleUpsertWithWhereUniqueWithoutRoleInput | Prisma.MembershipRoleUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.MembershipRoleCreateManyRoleInputEnvelope;
    set?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
    disconnect?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
    delete?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
    connect?: Prisma.MembershipRoleWhereUniqueInput | Prisma.MembershipRoleWhereUniqueInput[];
    update?: Prisma.MembershipRoleUpdateWithWhereUniqueWithoutRoleInput | Prisma.MembershipRoleUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.MembershipRoleUpdateManyWithWhereWithoutRoleInput | Prisma.MembershipRoleUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.MembershipRoleScalarWhereInput | Prisma.MembershipRoleScalarWhereInput[];
};
export type MembershipRoleCreateWithoutMembershipInput = {
    assignedAt?: Date | string;
    role: Prisma.RoleCreateNestedOneWithoutMembershipRolesInput;
};
export type MembershipRoleUncheckedCreateWithoutMembershipInput = {
    roleId: string;
    assignedAt?: Date | string;
};
export type MembershipRoleCreateOrConnectWithoutMembershipInput = {
    where: Prisma.MembershipRoleWhereUniqueInput;
    create: Prisma.XOR<Prisma.MembershipRoleCreateWithoutMembershipInput, Prisma.MembershipRoleUncheckedCreateWithoutMembershipInput>;
};
export type MembershipRoleCreateManyMembershipInputEnvelope = {
    data: Prisma.MembershipRoleCreateManyMembershipInput | Prisma.MembershipRoleCreateManyMembershipInput[];
    skipDuplicates?: boolean;
};
export type MembershipRoleUpsertWithWhereUniqueWithoutMembershipInput = {
    where: Prisma.MembershipRoleWhereUniqueInput;
    update: Prisma.XOR<Prisma.MembershipRoleUpdateWithoutMembershipInput, Prisma.MembershipRoleUncheckedUpdateWithoutMembershipInput>;
    create: Prisma.XOR<Prisma.MembershipRoleCreateWithoutMembershipInput, Prisma.MembershipRoleUncheckedCreateWithoutMembershipInput>;
};
export type MembershipRoleUpdateWithWhereUniqueWithoutMembershipInput = {
    where: Prisma.MembershipRoleWhereUniqueInput;
    data: Prisma.XOR<Prisma.MembershipRoleUpdateWithoutMembershipInput, Prisma.MembershipRoleUncheckedUpdateWithoutMembershipInput>;
};
export type MembershipRoleUpdateManyWithWhereWithoutMembershipInput = {
    where: Prisma.MembershipRoleScalarWhereInput;
    data: Prisma.XOR<Prisma.MembershipRoleUpdateManyMutationInput, Prisma.MembershipRoleUncheckedUpdateManyWithoutMembershipInput>;
};
export type MembershipRoleScalarWhereInput = {
    AND?: Prisma.MembershipRoleScalarWhereInput | Prisma.MembershipRoleScalarWhereInput[];
    OR?: Prisma.MembershipRoleScalarWhereInput[];
    NOT?: Prisma.MembershipRoleScalarWhereInput | Prisma.MembershipRoleScalarWhereInput[];
    tenantId?: Prisma.StringFilter<"MembershipRole"> | string;
    tenantMembershipId?: Prisma.StringFilter<"MembershipRole"> | string;
    roleId?: Prisma.StringFilter<"MembershipRole"> | string;
    assignedAt?: Prisma.DateTimeFilter<"MembershipRole"> | Date | string;
};
export type MembershipRoleCreateWithoutRoleInput = {
    assignedAt?: Date | string;
    membership: Prisma.TenantMembershipCreateNestedOneWithoutMembershipRolesInput;
};
export type MembershipRoleUncheckedCreateWithoutRoleInput = {
    tenantMembershipId: string;
    assignedAt?: Date | string;
};
export type MembershipRoleCreateOrConnectWithoutRoleInput = {
    where: Prisma.MembershipRoleWhereUniqueInput;
    create: Prisma.XOR<Prisma.MembershipRoleCreateWithoutRoleInput, Prisma.MembershipRoleUncheckedCreateWithoutRoleInput>;
};
export type MembershipRoleCreateManyRoleInputEnvelope = {
    data: Prisma.MembershipRoleCreateManyRoleInput | Prisma.MembershipRoleCreateManyRoleInput[];
    skipDuplicates?: boolean;
};
export type MembershipRoleUpsertWithWhereUniqueWithoutRoleInput = {
    where: Prisma.MembershipRoleWhereUniqueInput;
    update: Prisma.XOR<Prisma.MembershipRoleUpdateWithoutRoleInput, Prisma.MembershipRoleUncheckedUpdateWithoutRoleInput>;
    create: Prisma.XOR<Prisma.MembershipRoleCreateWithoutRoleInput, Prisma.MembershipRoleUncheckedCreateWithoutRoleInput>;
};
export type MembershipRoleUpdateWithWhereUniqueWithoutRoleInput = {
    where: Prisma.MembershipRoleWhereUniqueInput;
    data: Prisma.XOR<Prisma.MembershipRoleUpdateWithoutRoleInput, Prisma.MembershipRoleUncheckedUpdateWithoutRoleInput>;
};
export type MembershipRoleUpdateManyWithWhereWithoutRoleInput = {
    where: Prisma.MembershipRoleScalarWhereInput;
    data: Prisma.XOR<Prisma.MembershipRoleUpdateManyMutationInput, Prisma.MembershipRoleUncheckedUpdateManyWithoutRoleInput>;
};
export type MembershipRoleCreateManyMembershipInput = {
    roleId: string;
    assignedAt?: Date | string;
};
export type MembershipRoleUpdateWithoutMembershipInput = {
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.RoleUpdateOneRequiredWithoutMembershipRolesNestedInput;
};
export type MembershipRoleUncheckedUpdateWithoutMembershipInput = {
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MembershipRoleUncheckedUpdateManyWithoutMembershipInput = {
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MembershipRoleCreateManyRoleInput = {
    tenantMembershipId: string;
    assignedAt?: Date | string;
};
export type MembershipRoleUpdateWithoutRoleInput = {
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    membership?: Prisma.TenantMembershipUpdateOneRequiredWithoutMembershipRolesNestedInput;
};
export type MembershipRoleUncheckedUpdateWithoutRoleInput = {
    tenantMembershipId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MembershipRoleUncheckedUpdateManyWithoutRoleInput = {
    tenantMembershipId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MembershipRoleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    tenantId?: boolean;
    tenantMembershipId?: boolean;
    roleId?: boolean;
    assignedAt?: boolean;
    membership?: boolean | Prisma.TenantMembershipDefaultArgs<ExtArgs>;
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["membershipRole"]>;
export type MembershipRoleSelectScalar = {
    tenantId?: boolean;
    tenantMembershipId?: boolean;
    roleId?: boolean;
    assignedAt?: boolean;
};
export type MembershipRoleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"tenantId" | "tenantMembershipId" | "roleId" | "assignedAt", ExtArgs["result"]["membershipRole"]>;
export type MembershipRoleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    membership?: boolean | Prisma.TenantMembershipDefaultArgs<ExtArgs>;
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
};
export type $MembershipRolePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MembershipRole";
    objects: {
        membership: Prisma.$TenantMembershipPayload<ExtArgs>;
        role: Prisma.$RolePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        tenantId: string;
        tenantMembershipId: string;
        roleId: string;
        assignedAt: Date;
    }, ExtArgs["result"]["membershipRole"]>;
    composites: {};
};
export type MembershipRoleGetPayload<S extends boolean | null | undefined | MembershipRoleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MembershipRolePayload, S>;
export type MembershipRoleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MembershipRoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MembershipRoleCountAggregateInputType | true;
};
export interface MembershipRoleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MembershipRole'];
        meta: {
            name: 'MembershipRole';
        };
    };
    findUnique<T extends MembershipRoleFindUniqueArgs>(args: Prisma.SelectSubset<T, MembershipRoleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MembershipRoleClient<runtime.Types.Result.GetResult<Prisma.$MembershipRolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MembershipRoleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MembershipRoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MembershipRoleClient<runtime.Types.Result.GetResult<Prisma.$MembershipRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MembershipRoleFindFirstArgs>(args?: Prisma.SelectSubset<T, MembershipRoleFindFirstArgs<ExtArgs>>): Prisma.Prisma__MembershipRoleClient<runtime.Types.Result.GetResult<Prisma.$MembershipRolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MembershipRoleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MembershipRoleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MembershipRoleClient<runtime.Types.Result.GetResult<Prisma.$MembershipRolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MembershipRoleFindManyArgs>(args?: Prisma.SelectSubset<T, MembershipRoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MembershipRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MembershipRoleCreateArgs>(args: Prisma.SelectSubset<T, MembershipRoleCreateArgs<ExtArgs>>): Prisma.Prisma__MembershipRoleClient<runtime.Types.Result.GetResult<Prisma.$MembershipRolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MembershipRoleCreateManyArgs>(args?: Prisma.SelectSubset<T, MembershipRoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends MembershipRoleDeleteArgs>(args: Prisma.SelectSubset<T, MembershipRoleDeleteArgs<ExtArgs>>): Prisma.Prisma__MembershipRoleClient<runtime.Types.Result.GetResult<Prisma.$MembershipRolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MembershipRoleUpdateArgs>(args: Prisma.SelectSubset<T, MembershipRoleUpdateArgs<ExtArgs>>): Prisma.Prisma__MembershipRoleClient<runtime.Types.Result.GetResult<Prisma.$MembershipRolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MembershipRoleDeleteManyArgs>(args?: Prisma.SelectSubset<T, MembershipRoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MembershipRoleUpdateManyArgs>(args: Prisma.SelectSubset<T, MembershipRoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends MembershipRoleUpsertArgs>(args: Prisma.SelectSubset<T, MembershipRoleUpsertArgs<ExtArgs>>): Prisma.Prisma__MembershipRoleClient<runtime.Types.Result.GetResult<Prisma.$MembershipRolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MembershipRoleCountArgs>(args?: Prisma.Subset<T, MembershipRoleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MembershipRoleCountAggregateOutputType> : number>;
    aggregate<T extends MembershipRoleAggregateArgs>(args: Prisma.Subset<T, MembershipRoleAggregateArgs>): Prisma.PrismaPromise<GetMembershipRoleAggregateType<T>>;
    groupBy<T extends MembershipRoleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MembershipRoleGroupByArgs['orderBy'];
    } : {
        orderBy?: MembershipRoleGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MembershipRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMembershipRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MembershipRoleFieldRefs;
}
export interface Prisma__MembershipRoleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    membership<T extends Prisma.TenantMembershipDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantMembershipDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantMembershipClient<runtime.Types.Result.GetResult<Prisma.$TenantMembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    role<T extends Prisma.RoleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoleDefaultArgs<ExtArgs>>): Prisma.Prisma__RoleClient<runtime.Types.Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MembershipRoleFieldRefs {
    readonly tenantId: Prisma.FieldRef<"MembershipRole", 'String'>;
    readonly tenantMembershipId: Prisma.FieldRef<"MembershipRole", 'String'>;
    readonly roleId: Prisma.FieldRef<"MembershipRole", 'String'>;
    readonly assignedAt: Prisma.FieldRef<"MembershipRole", 'DateTime'>;
}
export type MembershipRoleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipRoleSelect<ExtArgs> | null;
    omit?: Prisma.MembershipRoleOmit<ExtArgs> | null;
    include?: Prisma.MembershipRoleInclude<ExtArgs> | null;
    where: Prisma.MembershipRoleWhereUniqueInput;
};
export type MembershipRoleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipRoleSelect<ExtArgs> | null;
    omit?: Prisma.MembershipRoleOmit<ExtArgs> | null;
    include?: Prisma.MembershipRoleInclude<ExtArgs> | null;
    where: Prisma.MembershipRoleWhereUniqueInput;
};
export type MembershipRoleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MembershipRoleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MembershipRoleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MembershipRoleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipRoleSelect<ExtArgs> | null;
    omit?: Prisma.MembershipRoleOmit<ExtArgs> | null;
    include?: Prisma.MembershipRoleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MembershipRoleCreateInput, Prisma.MembershipRoleUncheckedCreateInput>;
};
export type MembershipRoleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MembershipRoleCreateManyInput | Prisma.MembershipRoleCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MembershipRoleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipRoleSelect<ExtArgs> | null;
    omit?: Prisma.MembershipRoleOmit<ExtArgs> | null;
    include?: Prisma.MembershipRoleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MembershipRoleUpdateInput, Prisma.MembershipRoleUncheckedUpdateInput>;
    where: Prisma.MembershipRoleWhereUniqueInput;
};
export type MembershipRoleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MembershipRoleUpdateManyMutationInput, Prisma.MembershipRoleUncheckedUpdateManyInput>;
    where?: Prisma.MembershipRoleWhereInput;
    limit?: number;
};
export type MembershipRoleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipRoleSelect<ExtArgs> | null;
    omit?: Prisma.MembershipRoleOmit<ExtArgs> | null;
    include?: Prisma.MembershipRoleInclude<ExtArgs> | null;
    where: Prisma.MembershipRoleWhereUniqueInput;
    create: Prisma.XOR<Prisma.MembershipRoleCreateInput, Prisma.MembershipRoleUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MembershipRoleUpdateInput, Prisma.MembershipRoleUncheckedUpdateInput>;
};
export type MembershipRoleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipRoleSelect<ExtArgs> | null;
    omit?: Prisma.MembershipRoleOmit<ExtArgs> | null;
    include?: Prisma.MembershipRoleInclude<ExtArgs> | null;
    where: Prisma.MembershipRoleWhereUniqueInput;
};
export type MembershipRoleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MembershipRoleWhereInput;
    limit?: number;
};
export type MembershipRoleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipRoleSelect<ExtArgs> | null;
    omit?: Prisma.MembershipRoleOmit<ExtArgs> | null;
    include?: Prisma.MembershipRoleInclude<ExtArgs> | null;
};
