import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SiteSubmissionActivityModel = runtime.Types.Result.DefaultSelection<Prisma.$SiteSubmissionActivityPayload>;
export type AggregateSiteSubmissionActivity = {
    _count: SiteSubmissionActivityCountAggregateOutputType | null;
    _min: SiteSubmissionActivityMinAggregateOutputType | null;
    _max: SiteSubmissionActivityMaxAggregateOutputType | null;
};
export type SiteSubmissionActivityMinAggregateOutputType = {
    tenantId: string | null;
    submissionId: string | null;
    activityId: string | null;
};
export type SiteSubmissionActivityMaxAggregateOutputType = {
    tenantId: string | null;
    submissionId: string | null;
    activityId: string | null;
};
export type SiteSubmissionActivityCountAggregateOutputType = {
    tenantId: number;
    submissionId: number;
    activityId: number;
    _all: number;
};
export type SiteSubmissionActivityMinAggregateInputType = {
    tenantId?: true;
    submissionId?: true;
    activityId?: true;
};
export type SiteSubmissionActivityMaxAggregateInputType = {
    tenantId?: true;
    submissionId?: true;
    activityId?: true;
};
export type SiteSubmissionActivityCountAggregateInputType = {
    tenantId?: true;
    submissionId?: true;
    activityId?: true;
    _all?: true;
};
export type SiteSubmissionActivityAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSubmissionActivityWhereInput;
    orderBy?: Prisma.SiteSubmissionActivityOrderByWithRelationInput | Prisma.SiteSubmissionActivityOrderByWithRelationInput[];
    cursor?: Prisma.SiteSubmissionActivityWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SiteSubmissionActivityCountAggregateInputType;
    _min?: SiteSubmissionActivityMinAggregateInputType;
    _max?: SiteSubmissionActivityMaxAggregateInputType;
};
export type GetSiteSubmissionActivityAggregateType<T extends SiteSubmissionActivityAggregateArgs> = {
    [P in keyof T & keyof AggregateSiteSubmissionActivity]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSiteSubmissionActivity[P]> : Prisma.GetScalarType<T[P], AggregateSiteSubmissionActivity[P]>;
};
export type SiteSubmissionActivityGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSubmissionActivityWhereInput;
    orderBy?: Prisma.SiteSubmissionActivityOrderByWithAggregationInput | Prisma.SiteSubmissionActivityOrderByWithAggregationInput[];
    by: Prisma.SiteSubmissionActivityScalarFieldEnum[] | Prisma.SiteSubmissionActivityScalarFieldEnum;
    having?: Prisma.SiteSubmissionActivityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SiteSubmissionActivityCountAggregateInputType | true;
    _min?: SiteSubmissionActivityMinAggregateInputType;
    _max?: SiteSubmissionActivityMaxAggregateInputType;
};
export type SiteSubmissionActivityGroupByOutputType = {
    tenantId: string;
    submissionId: string;
    activityId: string;
    _count: SiteSubmissionActivityCountAggregateOutputType | null;
    _min: SiteSubmissionActivityMinAggregateOutputType | null;
    _max: SiteSubmissionActivityMaxAggregateOutputType | null;
};
export type GetSiteSubmissionActivityGroupByPayload<T extends SiteSubmissionActivityGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SiteSubmissionActivityGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SiteSubmissionActivityGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SiteSubmissionActivityGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SiteSubmissionActivityGroupByOutputType[P]>;
}>>;
export type SiteSubmissionActivityWhereInput = {
    AND?: Prisma.SiteSubmissionActivityWhereInput | Prisma.SiteSubmissionActivityWhereInput[];
    OR?: Prisma.SiteSubmissionActivityWhereInput[];
    NOT?: Prisma.SiteSubmissionActivityWhereInput | Prisma.SiteSubmissionActivityWhereInput[];
    tenantId?: Prisma.StringFilter<"SiteSubmissionActivity"> | string;
    submissionId?: Prisma.StringFilter<"SiteSubmissionActivity"> | string;
    activityId?: Prisma.StringFilter<"SiteSubmissionActivity"> | string;
    submission?: Prisma.XOR<Prisma.SiteSubmissionScalarRelationFilter, Prisma.SiteSubmissionWhereInput>;
    activity?: Prisma.XOR<Prisma.ActivityScalarRelationFilter, Prisma.ActivityWhereInput>;
};
export type SiteSubmissionActivityOrderByWithRelationInput = {
    tenantId?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    activityId?: Prisma.SortOrder;
    submission?: Prisma.SiteSubmissionOrderByWithRelationInput;
    activity?: Prisma.ActivityOrderByWithRelationInput;
    _relevance?: Prisma.SiteSubmissionActivityOrderByRelevanceInput;
};
export type SiteSubmissionActivityWhereUniqueInput = Prisma.AtLeast<{
    tenantId_submissionId_activityId?: Prisma.SiteSubmissionActivityTenantIdSubmissionIdActivityIdCompoundUniqueInput;
    AND?: Prisma.SiteSubmissionActivityWhereInput | Prisma.SiteSubmissionActivityWhereInput[];
    OR?: Prisma.SiteSubmissionActivityWhereInput[];
    NOT?: Prisma.SiteSubmissionActivityWhereInput | Prisma.SiteSubmissionActivityWhereInput[];
    tenantId?: Prisma.StringFilter<"SiteSubmissionActivity"> | string;
    submissionId?: Prisma.StringFilter<"SiteSubmissionActivity"> | string;
    activityId?: Prisma.StringFilter<"SiteSubmissionActivity"> | string;
    submission?: Prisma.XOR<Prisma.SiteSubmissionScalarRelationFilter, Prisma.SiteSubmissionWhereInput>;
    activity?: Prisma.XOR<Prisma.ActivityScalarRelationFilter, Prisma.ActivityWhereInput>;
}, "tenantId_submissionId_activityId">;
export type SiteSubmissionActivityOrderByWithAggregationInput = {
    tenantId?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    activityId?: Prisma.SortOrder;
    _count?: Prisma.SiteSubmissionActivityCountOrderByAggregateInput;
    _max?: Prisma.SiteSubmissionActivityMaxOrderByAggregateInput;
    _min?: Prisma.SiteSubmissionActivityMinOrderByAggregateInput;
};
export type SiteSubmissionActivityScalarWhereWithAggregatesInput = {
    AND?: Prisma.SiteSubmissionActivityScalarWhereWithAggregatesInput | Prisma.SiteSubmissionActivityScalarWhereWithAggregatesInput[];
    OR?: Prisma.SiteSubmissionActivityScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SiteSubmissionActivityScalarWhereWithAggregatesInput | Prisma.SiteSubmissionActivityScalarWhereWithAggregatesInput[];
    tenantId?: Prisma.StringWithAggregatesFilter<"SiteSubmissionActivity"> | string;
    submissionId?: Prisma.StringWithAggregatesFilter<"SiteSubmissionActivity"> | string;
    activityId?: Prisma.StringWithAggregatesFilter<"SiteSubmissionActivity"> | string;
};
export type SiteSubmissionActivityCreateInput = {
    submission: Prisma.SiteSubmissionCreateNestedOneWithoutActivitiesInput;
    activity: Prisma.ActivityCreateNestedOneWithoutSiteSubmissionActivitiesInput;
};
export type SiteSubmissionActivityUncheckedCreateInput = {
    tenantId: string;
    submissionId: string;
    activityId: string;
};
export type SiteSubmissionActivityUpdateInput = {
    submission?: Prisma.SiteSubmissionUpdateOneRequiredWithoutActivitiesNestedInput;
    activity?: Prisma.ActivityUpdateOneRequiredWithoutSiteSubmissionActivitiesNestedInput;
};
export type SiteSubmissionActivityUncheckedUpdateInput = {
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    submissionId?: Prisma.StringFieldUpdateOperationsInput | string;
    activityId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SiteSubmissionActivityCreateManyInput = {
    tenantId: string;
    submissionId: string;
    activityId: string;
};
export type SiteSubmissionActivityUpdateManyMutationInput = {};
export type SiteSubmissionActivityUncheckedUpdateManyInput = {
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    submissionId?: Prisma.StringFieldUpdateOperationsInput | string;
    activityId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SiteSubmissionActivityListRelationFilter = {
    every?: Prisma.SiteSubmissionActivityWhereInput;
    some?: Prisma.SiteSubmissionActivityWhereInput;
    none?: Prisma.SiteSubmissionActivityWhereInput;
};
export type SiteSubmissionActivityOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SiteSubmissionActivityOrderByRelevanceInput = {
    fields: Prisma.SiteSubmissionActivityOrderByRelevanceFieldEnum | Prisma.SiteSubmissionActivityOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type SiteSubmissionActivityTenantIdSubmissionIdActivityIdCompoundUniqueInput = {
    tenantId: string;
    submissionId: string;
    activityId: string;
};
export type SiteSubmissionActivityCountOrderByAggregateInput = {
    tenantId?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    activityId?: Prisma.SortOrder;
};
export type SiteSubmissionActivityMaxOrderByAggregateInput = {
    tenantId?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    activityId?: Prisma.SortOrder;
};
export type SiteSubmissionActivityMinOrderByAggregateInput = {
    tenantId?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    activityId?: Prisma.SortOrder;
};
export type SiteSubmissionActivityCreateNestedManyWithoutActivityInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionActivityCreateWithoutActivityInput, Prisma.SiteSubmissionActivityUncheckedCreateWithoutActivityInput> | Prisma.SiteSubmissionActivityCreateWithoutActivityInput[] | Prisma.SiteSubmissionActivityUncheckedCreateWithoutActivityInput[];
    connectOrCreate?: Prisma.SiteSubmissionActivityCreateOrConnectWithoutActivityInput | Prisma.SiteSubmissionActivityCreateOrConnectWithoutActivityInput[];
    createMany?: Prisma.SiteSubmissionActivityCreateManyActivityInputEnvelope;
    connect?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
};
export type SiteSubmissionActivityUncheckedCreateNestedManyWithoutActivityInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionActivityCreateWithoutActivityInput, Prisma.SiteSubmissionActivityUncheckedCreateWithoutActivityInput> | Prisma.SiteSubmissionActivityCreateWithoutActivityInput[] | Prisma.SiteSubmissionActivityUncheckedCreateWithoutActivityInput[];
    connectOrCreate?: Prisma.SiteSubmissionActivityCreateOrConnectWithoutActivityInput | Prisma.SiteSubmissionActivityCreateOrConnectWithoutActivityInput[];
    createMany?: Prisma.SiteSubmissionActivityCreateManyActivityInputEnvelope;
    connect?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
};
export type SiteSubmissionActivityUpdateManyWithoutActivityNestedInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionActivityCreateWithoutActivityInput, Prisma.SiteSubmissionActivityUncheckedCreateWithoutActivityInput> | Prisma.SiteSubmissionActivityCreateWithoutActivityInput[] | Prisma.SiteSubmissionActivityUncheckedCreateWithoutActivityInput[];
    connectOrCreate?: Prisma.SiteSubmissionActivityCreateOrConnectWithoutActivityInput | Prisma.SiteSubmissionActivityCreateOrConnectWithoutActivityInput[];
    upsert?: Prisma.SiteSubmissionActivityUpsertWithWhereUniqueWithoutActivityInput | Prisma.SiteSubmissionActivityUpsertWithWhereUniqueWithoutActivityInput[];
    createMany?: Prisma.SiteSubmissionActivityCreateManyActivityInputEnvelope;
    set?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
    disconnect?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
    delete?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
    connect?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
    update?: Prisma.SiteSubmissionActivityUpdateWithWhereUniqueWithoutActivityInput | Prisma.SiteSubmissionActivityUpdateWithWhereUniqueWithoutActivityInput[];
    updateMany?: Prisma.SiteSubmissionActivityUpdateManyWithWhereWithoutActivityInput | Prisma.SiteSubmissionActivityUpdateManyWithWhereWithoutActivityInput[];
    deleteMany?: Prisma.SiteSubmissionActivityScalarWhereInput | Prisma.SiteSubmissionActivityScalarWhereInput[];
};
export type SiteSubmissionActivityUncheckedUpdateManyWithoutActivityNestedInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionActivityCreateWithoutActivityInput, Prisma.SiteSubmissionActivityUncheckedCreateWithoutActivityInput> | Prisma.SiteSubmissionActivityCreateWithoutActivityInput[] | Prisma.SiteSubmissionActivityUncheckedCreateWithoutActivityInput[];
    connectOrCreate?: Prisma.SiteSubmissionActivityCreateOrConnectWithoutActivityInput | Prisma.SiteSubmissionActivityCreateOrConnectWithoutActivityInput[];
    upsert?: Prisma.SiteSubmissionActivityUpsertWithWhereUniqueWithoutActivityInput | Prisma.SiteSubmissionActivityUpsertWithWhereUniqueWithoutActivityInput[];
    createMany?: Prisma.SiteSubmissionActivityCreateManyActivityInputEnvelope;
    set?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
    disconnect?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
    delete?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
    connect?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
    update?: Prisma.SiteSubmissionActivityUpdateWithWhereUniqueWithoutActivityInput | Prisma.SiteSubmissionActivityUpdateWithWhereUniqueWithoutActivityInput[];
    updateMany?: Prisma.SiteSubmissionActivityUpdateManyWithWhereWithoutActivityInput | Prisma.SiteSubmissionActivityUpdateManyWithWhereWithoutActivityInput[];
    deleteMany?: Prisma.SiteSubmissionActivityScalarWhereInput | Prisma.SiteSubmissionActivityScalarWhereInput[];
};
export type SiteSubmissionActivityCreateNestedManyWithoutSubmissionInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionActivityCreateWithoutSubmissionInput, Prisma.SiteSubmissionActivityUncheckedCreateWithoutSubmissionInput> | Prisma.SiteSubmissionActivityCreateWithoutSubmissionInput[] | Prisma.SiteSubmissionActivityUncheckedCreateWithoutSubmissionInput[];
    connectOrCreate?: Prisma.SiteSubmissionActivityCreateOrConnectWithoutSubmissionInput | Prisma.SiteSubmissionActivityCreateOrConnectWithoutSubmissionInput[];
    createMany?: Prisma.SiteSubmissionActivityCreateManySubmissionInputEnvelope;
    connect?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
};
export type SiteSubmissionActivityUncheckedCreateNestedManyWithoutSubmissionInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionActivityCreateWithoutSubmissionInput, Prisma.SiteSubmissionActivityUncheckedCreateWithoutSubmissionInput> | Prisma.SiteSubmissionActivityCreateWithoutSubmissionInput[] | Prisma.SiteSubmissionActivityUncheckedCreateWithoutSubmissionInput[];
    connectOrCreate?: Prisma.SiteSubmissionActivityCreateOrConnectWithoutSubmissionInput | Prisma.SiteSubmissionActivityCreateOrConnectWithoutSubmissionInput[];
    createMany?: Prisma.SiteSubmissionActivityCreateManySubmissionInputEnvelope;
    connect?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
};
export type SiteSubmissionActivityUpdateManyWithoutSubmissionNestedInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionActivityCreateWithoutSubmissionInput, Prisma.SiteSubmissionActivityUncheckedCreateWithoutSubmissionInput> | Prisma.SiteSubmissionActivityCreateWithoutSubmissionInput[] | Prisma.SiteSubmissionActivityUncheckedCreateWithoutSubmissionInput[];
    connectOrCreate?: Prisma.SiteSubmissionActivityCreateOrConnectWithoutSubmissionInput | Prisma.SiteSubmissionActivityCreateOrConnectWithoutSubmissionInput[];
    upsert?: Prisma.SiteSubmissionActivityUpsertWithWhereUniqueWithoutSubmissionInput | Prisma.SiteSubmissionActivityUpsertWithWhereUniqueWithoutSubmissionInput[];
    createMany?: Prisma.SiteSubmissionActivityCreateManySubmissionInputEnvelope;
    set?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
    disconnect?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
    delete?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
    connect?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
    update?: Prisma.SiteSubmissionActivityUpdateWithWhereUniqueWithoutSubmissionInput | Prisma.SiteSubmissionActivityUpdateWithWhereUniqueWithoutSubmissionInput[];
    updateMany?: Prisma.SiteSubmissionActivityUpdateManyWithWhereWithoutSubmissionInput | Prisma.SiteSubmissionActivityUpdateManyWithWhereWithoutSubmissionInput[];
    deleteMany?: Prisma.SiteSubmissionActivityScalarWhereInput | Prisma.SiteSubmissionActivityScalarWhereInput[];
};
export type SiteSubmissionActivityUncheckedUpdateManyWithoutSubmissionNestedInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionActivityCreateWithoutSubmissionInput, Prisma.SiteSubmissionActivityUncheckedCreateWithoutSubmissionInput> | Prisma.SiteSubmissionActivityCreateWithoutSubmissionInput[] | Prisma.SiteSubmissionActivityUncheckedCreateWithoutSubmissionInput[];
    connectOrCreate?: Prisma.SiteSubmissionActivityCreateOrConnectWithoutSubmissionInput | Prisma.SiteSubmissionActivityCreateOrConnectWithoutSubmissionInput[];
    upsert?: Prisma.SiteSubmissionActivityUpsertWithWhereUniqueWithoutSubmissionInput | Prisma.SiteSubmissionActivityUpsertWithWhereUniqueWithoutSubmissionInput[];
    createMany?: Prisma.SiteSubmissionActivityCreateManySubmissionInputEnvelope;
    set?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
    disconnect?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
    delete?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
    connect?: Prisma.SiteSubmissionActivityWhereUniqueInput | Prisma.SiteSubmissionActivityWhereUniqueInput[];
    update?: Prisma.SiteSubmissionActivityUpdateWithWhereUniqueWithoutSubmissionInput | Prisma.SiteSubmissionActivityUpdateWithWhereUniqueWithoutSubmissionInput[];
    updateMany?: Prisma.SiteSubmissionActivityUpdateManyWithWhereWithoutSubmissionInput | Prisma.SiteSubmissionActivityUpdateManyWithWhereWithoutSubmissionInput[];
    deleteMany?: Prisma.SiteSubmissionActivityScalarWhereInput | Prisma.SiteSubmissionActivityScalarWhereInput[];
};
export type SiteSubmissionActivityCreateWithoutActivityInput = {
    submission: Prisma.SiteSubmissionCreateNestedOneWithoutActivitiesInput;
};
export type SiteSubmissionActivityUncheckedCreateWithoutActivityInput = {
    submissionId: string;
};
export type SiteSubmissionActivityCreateOrConnectWithoutActivityInput = {
    where: Prisma.SiteSubmissionActivityWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiteSubmissionActivityCreateWithoutActivityInput, Prisma.SiteSubmissionActivityUncheckedCreateWithoutActivityInput>;
};
export type SiteSubmissionActivityCreateManyActivityInputEnvelope = {
    data: Prisma.SiteSubmissionActivityCreateManyActivityInput | Prisma.SiteSubmissionActivityCreateManyActivityInput[];
    skipDuplicates?: boolean;
};
export type SiteSubmissionActivityUpsertWithWhereUniqueWithoutActivityInput = {
    where: Prisma.SiteSubmissionActivityWhereUniqueInput;
    update: Prisma.XOR<Prisma.SiteSubmissionActivityUpdateWithoutActivityInput, Prisma.SiteSubmissionActivityUncheckedUpdateWithoutActivityInput>;
    create: Prisma.XOR<Prisma.SiteSubmissionActivityCreateWithoutActivityInput, Prisma.SiteSubmissionActivityUncheckedCreateWithoutActivityInput>;
};
export type SiteSubmissionActivityUpdateWithWhereUniqueWithoutActivityInput = {
    where: Prisma.SiteSubmissionActivityWhereUniqueInput;
    data: Prisma.XOR<Prisma.SiteSubmissionActivityUpdateWithoutActivityInput, Prisma.SiteSubmissionActivityUncheckedUpdateWithoutActivityInput>;
};
export type SiteSubmissionActivityUpdateManyWithWhereWithoutActivityInput = {
    where: Prisma.SiteSubmissionActivityScalarWhereInput;
    data: Prisma.XOR<Prisma.SiteSubmissionActivityUpdateManyMutationInput, Prisma.SiteSubmissionActivityUncheckedUpdateManyWithoutActivityInput>;
};
export type SiteSubmissionActivityScalarWhereInput = {
    AND?: Prisma.SiteSubmissionActivityScalarWhereInput | Prisma.SiteSubmissionActivityScalarWhereInput[];
    OR?: Prisma.SiteSubmissionActivityScalarWhereInput[];
    NOT?: Prisma.SiteSubmissionActivityScalarWhereInput | Prisma.SiteSubmissionActivityScalarWhereInput[];
    tenantId?: Prisma.StringFilter<"SiteSubmissionActivity"> | string;
    submissionId?: Prisma.StringFilter<"SiteSubmissionActivity"> | string;
    activityId?: Prisma.StringFilter<"SiteSubmissionActivity"> | string;
};
export type SiteSubmissionActivityCreateWithoutSubmissionInput = {
    activity: Prisma.ActivityCreateNestedOneWithoutSiteSubmissionActivitiesInput;
};
export type SiteSubmissionActivityUncheckedCreateWithoutSubmissionInput = {
    activityId: string;
};
export type SiteSubmissionActivityCreateOrConnectWithoutSubmissionInput = {
    where: Prisma.SiteSubmissionActivityWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiteSubmissionActivityCreateWithoutSubmissionInput, Prisma.SiteSubmissionActivityUncheckedCreateWithoutSubmissionInput>;
};
export type SiteSubmissionActivityCreateManySubmissionInputEnvelope = {
    data: Prisma.SiteSubmissionActivityCreateManySubmissionInput | Prisma.SiteSubmissionActivityCreateManySubmissionInput[];
    skipDuplicates?: boolean;
};
export type SiteSubmissionActivityUpsertWithWhereUniqueWithoutSubmissionInput = {
    where: Prisma.SiteSubmissionActivityWhereUniqueInput;
    update: Prisma.XOR<Prisma.SiteSubmissionActivityUpdateWithoutSubmissionInput, Prisma.SiteSubmissionActivityUncheckedUpdateWithoutSubmissionInput>;
    create: Prisma.XOR<Prisma.SiteSubmissionActivityCreateWithoutSubmissionInput, Prisma.SiteSubmissionActivityUncheckedCreateWithoutSubmissionInput>;
};
export type SiteSubmissionActivityUpdateWithWhereUniqueWithoutSubmissionInput = {
    where: Prisma.SiteSubmissionActivityWhereUniqueInput;
    data: Prisma.XOR<Prisma.SiteSubmissionActivityUpdateWithoutSubmissionInput, Prisma.SiteSubmissionActivityUncheckedUpdateWithoutSubmissionInput>;
};
export type SiteSubmissionActivityUpdateManyWithWhereWithoutSubmissionInput = {
    where: Prisma.SiteSubmissionActivityScalarWhereInput;
    data: Prisma.XOR<Prisma.SiteSubmissionActivityUpdateManyMutationInput, Prisma.SiteSubmissionActivityUncheckedUpdateManyWithoutSubmissionInput>;
};
export type SiteSubmissionActivityCreateManyActivityInput = {
    submissionId: string;
};
export type SiteSubmissionActivityUpdateWithoutActivityInput = {
    submission?: Prisma.SiteSubmissionUpdateOneRequiredWithoutActivitiesNestedInput;
};
export type SiteSubmissionActivityUncheckedUpdateWithoutActivityInput = {
    submissionId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SiteSubmissionActivityUncheckedUpdateManyWithoutActivityInput = {
    submissionId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SiteSubmissionActivityCreateManySubmissionInput = {
    activityId: string;
};
export type SiteSubmissionActivityUpdateWithoutSubmissionInput = {
    activity?: Prisma.ActivityUpdateOneRequiredWithoutSiteSubmissionActivitiesNestedInput;
};
export type SiteSubmissionActivityUncheckedUpdateWithoutSubmissionInput = {
    activityId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SiteSubmissionActivityUncheckedUpdateManyWithoutSubmissionInput = {
    activityId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SiteSubmissionActivitySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    tenantId?: boolean;
    submissionId?: boolean;
    activityId?: boolean;
    submission?: boolean | Prisma.SiteSubmissionDefaultArgs<ExtArgs>;
    activity?: boolean | Prisma.ActivityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["siteSubmissionActivity"]>;
export type SiteSubmissionActivitySelectScalar = {
    tenantId?: boolean;
    submissionId?: boolean;
    activityId?: boolean;
};
export type SiteSubmissionActivityOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"tenantId" | "submissionId" | "activityId", ExtArgs["result"]["siteSubmissionActivity"]>;
export type SiteSubmissionActivityInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    submission?: boolean | Prisma.SiteSubmissionDefaultArgs<ExtArgs>;
    activity?: boolean | Prisma.ActivityDefaultArgs<ExtArgs>;
};
export type $SiteSubmissionActivityPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SiteSubmissionActivity";
    objects: {
        submission: Prisma.$SiteSubmissionPayload<ExtArgs>;
        activity: Prisma.$ActivityPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        tenantId: string;
        submissionId: string;
        activityId: string;
    }, ExtArgs["result"]["siteSubmissionActivity"]>;
    composites: {};
};
export type SiteSubmissionActivityGetPayload<S extends boolean | null | undefined | SiteSubmissionActivityDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SiteSubmissionActivityPayload, S>;
export type SiteSubmissionActivityCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SiteSubmissionActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SiteSubmissionActivityCountAggregateInputType | true;
};
export interface SiteSubmissionActivityDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SiteSubmissionActivity'];
        meta: {
            name: 'SiteSubmissionActivity';
        };
    };
    findUnique<T extends SiteSubmissionActivityFindUniqueArgs>(args: Prisma.SelectSubset<T, SiteSubmissionActivityFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionActivityClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SiteSubmissionActivityFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SiteSubmissionActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionActivityClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SiteSubmissionActivityFindFirstArgs>(args?: Prisma.SelectSubset<T, SiteSubmissionActivityFindFirstArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionActivityClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SiteSubmissionActivityFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SiteSubmissionActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionActivityClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SiteSubmissionActivityFindManyArgs>(args?: Prisma.SelectSubset<T, SiteSubmissionActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SiteSubmissionActivityCreateArgs>(args: Prisma.SelectSubset<T, SiteSubmissionActivityCreateArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionActivityClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SiteSubmissionActivityCreateManyArgs>(args?: Prisma.SelectSubset<T, SiteSubmissionActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends SiteSubmissionActivityDeleteArgs>(args: Prisma.SelectSubset<T, SiteSubmissionActivityDeleteArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionActivityClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SiteSubmissionActivityUpdateArgs>(args: Prisma.SelectSubset<T, SiteSubmissionActivityUpdateArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionActivityClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SiteSubmissionActivityDeleteManyArgs>(args?: Prisma.SelectSubset<T, SiteSubmissionActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SiteSubmissionActivityUpdateManyArgs>(args: Prisma.SelectSubset<T, SiteSubmissionActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends SiteSubmissionActivityUpsertArgs>(args: Prisma.SelectSubset<T, SiteSubmissionActivityUpsertArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionActivityClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SiteSubmissionActivityCountArgs>(args?: Prisma.Subset<T, SiteSubmissionActivityCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SiteSubmissionActivityCountAggregateOutputType> : number>;
    aggregate<T extends SiteSubmissionActivityAggregateArgs>(args: Prisma.Subset<T, SiteSubmissionActivityAggregateArgs>): Prisma.PrismaPromise<GetSiteSubmissionActivityAggregateType<T>>;
    groupBy<T extends SiteSubmissionActivityGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SiteSubmissionActivityGroupByArgs['orderBy'];
    } : {
        orderBy?: SiteSubmissionActivityGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SiteSubmissionActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteSubmissionActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SiteSubmissionActivityFieldRefs;
}
export interface Prisma__SiteSubmissionActivityClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    submission<T extends Prisma.SiteSubmissionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SiteSubmissionDefaultArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    activity<T extends Prisma.ActivityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ActivityDefaultArgs<ExtArgs>>): Prisma.Prisma__ActivityClient<runtime.Types.Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SiteSubmissionActivityFieldRefs {
    readonly tenantId: Prisma.FieldRef<"SiteSubmissionActivity", 'String'>;
    readonly submissionId: Prisma.FieldRef<"SiteSubmissionActivity", 'String'>;
    readonly activityId: Prisma.FieldRef<"SiteSubmissionActivity", 'String'>;
}
export type SiteSubmissionActivityFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionActivitySelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionActivityOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionActivityInclude<ExtArgs> | null;
    where: Prisma.SiteSubmissionActivityWhereUniqueInput;
};
export type SiteSubmissionActivityFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionActivitySelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionActivityOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionActivityInclude<ExtArgs> | null;
    where: Prisma.SiteSubmissionActivityWhereUniqueInput;
};
export type SiteSubmissionActivityFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SiteSubmissionActivityFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SiteSubmissionActivityFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SiteSubmissionActivityCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionActivitySelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionActivityOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionActivityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiteSubmissionActivityCreateInput, Prisma.SiteSubmissionActivityUncheckedCreateInput>;
};
export type SiteSubmissionActivityCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SiteSubmissionActivityCreateManyInput | Prisma.SiteSubmissionActivityCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SiteSubmissionActivityUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionActivitySelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionActivityOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionActivityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiteSubmissionActivityUpdateInput, Prisma.SiteSubmissionActivityUncheckedUpdateInput>;
    where: Prisma.SiteSubmissionActivityWhereUniqueInput;
};
export type SiteSubmissionActivityUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SiteSubmissionActivityUpdateManyMutationInput, Prisma.SiteSubmissionActivityUncheckedUpdateManyInput>;
    where?: Prisma.SiteSubmissionActivityWhereInput;
    limit?: number;
};
export type SiteSubmissionActivityUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionActivitySelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionActivityOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionActivityInclude<ExtArgs> | null;
    where: Prisma.SiteSubmissionActivityWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiteSubmissionActivityCreateInput, Prisma.SiteSubmissionActivityUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SiteSubmissionActivityUpdateInput, Prisma.SiteSubmissionActivityUncheckedUpdateInput>;
};
export type SiteSubmissionActivityDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionActivitySelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionActivityOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionActivityInclude<ExtArgs> | null;
    where: Prisma.SiteSubmissionActivityWhereUniqueInput;
};
export type SiteSubmissionActivityDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSubmissionActivityWhereInput;
    limit?: number;
};
export type SiteSubmissionActivityDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionActivitySelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionActivityOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionActivityInclude<ExtArgs> | null;
};
