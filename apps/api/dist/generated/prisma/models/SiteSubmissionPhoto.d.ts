import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SiteSubmissionPhotoModel = runtime.Types.Result.DefaultSelection<Prisma.$SiteSubmissionPhotoPayload>;
export type AggregateSiteSubmissionPhoto = {
    _count: SiteSubmissionPhotoCountAggregateOutputType | null;
    _avg: SiteSubmissionPhotoAvgAggregateOutputType | null;
    _sum: SiteSubmissionPhotoSumAggregateOutputType | null;
    _min: SiteSubmissionPhotoMinAggregateOutputType | null;
    _max: SiteSubmissionPhotoMaxAggregateOutputType | null;
};
export type SiteSubmissionPhotoAvgAggregateOutputType = {
    fileSize: number | null;
};
export type SiteSubmissionPhotoSumAggregateOutputType = {
    fileSize: number | null;
};
export type SiteSubmissionPhotoMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    submissionId: string | null;
    storageKey: string | null;
    mimeType: string | null;
    fileSize: number | null;
    capturedAt: Date | null;
    uploadedAt: Date | null;
};
export type SiteSubmissionPhotoMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    submissionId: string | null;
    storageKey: string | null;
    mimeType: string | null;
    fileSize: number | null;
    capturedAt: Date | null;
    uploadedAt: Date | null;
};
export type SiteSubmissionPhotoCountAggregateOutputType = {
    id: number;
    tenantId: number;
    submissionId: number;
    storageKey: number;
    mimeType: number;
    fileSize: number;
    capturedAt: number;
    uploadedAt: number;
    _all: number;
};
export type SiteSubmissionPhotoAvgAggregateInputType = {
    fileSize?: true;
};
export type SiteSubmissionPhotoSumAggregateInputType = {
    fileSize?: true;
};
export type SiteSubmissionPhotoMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    submissionId?: true;
    storageKey?: true;
    mimeType?: true;
    fileSize?: true;
    capturedAt?: true;
    uploadedAt?: true;
};
export type SiteSubmissionPhotoMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    submissionId?: true;
    storageKey?: true;
    mimeType?: true;
    fileSize?: true;
    capturedAt?: true;
    uploadedAt?: true;
};
export type SiteSubmissionPhotoCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    submissionId?: true;
    storageKey?: true;
    mimeType?: true;
    fileSize?: true;
    capturedAt?: true;
    uploadedAt?: true;
    _all?: true;
};
export type SiteSubmissionPhotoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSubmissionPhotoWhereInput;
    orderBy?: Prisma.SiteSubmissionPhotoOrderByWithRelationInput | Prisma.SiteSubmissionPhotoOrderByWithRelationInput[];
    cursor?: Prisma.SiteSubmissionPhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SiteSubmissionPhotoCountAggregateInputType;
    _avg?: SiteSubmissionPhotoAvgAggregateInputType;
    _sum?: SiteSubmissionPhotoSumAggregateInputType;
    _min?: SiteSubmissionPhotoMinAggregateInputType;
    _max?: SiteSubmissionPhotoMaxAggregateInputType;
};
export type GetSiteSubmissionPhotoAggregateType<T extends SiteSubmissionPhotoAggregateArgs> = {
    [P in keyof T & keyof AggregateSiteSubmissionPhoto]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSiteSubmissionPhoto[P]> : Prisma.GetScalarType<T[P], AggregateSiteSubmissionPhoto[P]>;
};
export type SiteSubmissionPhotoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSubmissionPhotoWhereInput;
    orderBy?: Prisma.SiteSubmissionPhotoOrderByWithAggregationInput | Prisma.SiteSubmissionPhotoOrderByWithAggregationInput[];
    by: Prisma.SiteSubmissionPhotoScalarFieldEnum[] | Prisma.SiteSubmissionPhotoScalarFieldEnum;
    having?: Prisma.SiteSubmissionPhotoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SiteSubmissionPhotoCountAggregateInputType | true;
    _avg?: SiteSubmissionPhotoAvgAggregateInputType;
    _sum?: SiteSubmissionPhotoSumAggregateInputType;
    _min?: SiteSubmissionPhotoMinAggregateInputType;
    _max?: SiteSubmissionPhotoMaxAggregateInputType;
};
export type SiteSubmissionPhotoGroupByOutputType = {
    id: string;
    tenantId: string;
    submissionId: string;
    storageKey: string;
    mimeType: string;
    fileSize: number;
    capturedAt: Date | null;
    uploadedAt: Date;
    _count: SiteSubmissionPhotoCountAggregateOutputType | null;
    _avg: SiteSubmissionPhotoAvgAggregateOutputType | null;
    _sum: SiteSubmissionPhotoSumAggregateOutputType | null;
    _min: SiteSubmissionPhotoMinAggregateOutputType | null;
    _max: SiteSubmissionPhotoMaxAggregateOutputType | null;
};
export type GetSiteSubmissionPhotoGroupByPayload<T extends SiteSubmissionPhotoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SiteSubmissionPhotoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SiteSubmissionPhotoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SiteSubmissionPhotoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SiteSubmissionPhotoGroupByOutputType[P]>;
}>>;
export type SiteSubmissionPhotoWhereInput = {
    AND?: Prisma.SiteSubmissionPhotoWhereInput | Prisma.SiteSubmissionPhotoWhereInput[];
    OR?: Prisma.SiteSubmissionPhotoWhereInput[];
    NOT?: Prisma.SiteSubmissionPhotoWhereInput | Prisma.SiteSubmissionPhotoWhereInput[];
    id?: Prisma.StringFilter<"SiteSubmissionPhoto"> | string;
    tenantId?: Prisma.StringFilter<"SiteSubmissionPhoto"> | string;
    submissionId?: Prisma.StringFilter<"SiteSubmissionPhoto"> | string;
    storageKey?: Prisma.StringFilter<"SiteSubmissionPhoto"> | string;
    mimeType?: Prisma.StringFilter<"SiteSubmissionPhoto"> | string;
    fileSize?: Prisma.IntFilter<"SiteSubmissionPhoto"> | number;
    capturedAt?: Prisma.DateTimeNullableFilter<"SiteSubmissionPhoto"> | Date | string | null;
    uploadedAt?: Prisma.DateTimeFilter<"SiteSubmissionPhoto"> | Date | string;
    submission?: Prisma.XOR<Prisma.SiteSubmissionScalarRelationFilter, Prisma.SiteSubmissionWhereInput>;
};
export type SiteSubmissionPhotoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    fileSize?: Prisma.SortOrder;
    capturedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
    submission?: Prisma.SiteSubmissionOrderByWithRelationInput;
    _relevance?: Prisma.SiteSubmissionPhotoOrderByRelevanceInput;
};
export type SiteSubmissionPhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_id?: Prisma.SiteSubmissionPhotoTenantIdIdCompoundUniqueInput;
    AND?: Prisma.SiteSubmissionPhotoWhereInput | Prisma.SiteSubmissionPhotoWhereInput[];
    OR?: Prisma.SiteSubmissionPhotoWhereInput[];
    NOT?: Prisma.SiteSubmissionPhotoWhereInput | Prisma.SiteSubmissionPhotoWhereInput[];
    tenantId?: Prisma.StringFilter<"SiteSubmissionPhoto"> | string;
    submissionId?: Prisma.StringFilter<"SiteSubmissionPhoto"> | string;
    storageKey?: Prisma.StringFilter<"SiteSubmissionPhoto"> | string;
    mimeType?: Prisma.StringFilter<"SiteSubmissionPhoto"> | string;
    fileSize?: Prisma.IntFilter<"SiteSubmissionPhoto"> | number;
    capturedAt?: Prisma.DateTimeNullableFilter<"SiteSubmissionPhoto"> | Date | string | null;
    uploadedAt?: Prisma.DateTimeFilter<"SiteSubmissionPhoto"> | Date | string;
    submission?: Prisma.XOR<Prisma.SiteSubmissionScalarRelationFilter, Prisma.SiteSubmissionWhereInput>;
}, "id" | "tenantId_id">;
export type SiteSubmissionPhotoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    fileSize?: Prisma.SortOrder;
    capturedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
    _count?: Prisma.SiteSubmissionPhotoCountOrderByAggregateInput;
    _avg?: Prisma.SiteSubmissionPhotoAvgOrderByAggregateInput;
    _max?: Prisma.SiteSubmissionPhotoMaxOrderByAggregateInput;
    _min?: Prisma.SiteSubmissionPhotoMinOrderByAggregateInput;
    _sum?: Prisma.SiteSubmissionPhotoSumOrderByAggregateInput;
};
export type SiteSubmissionPhotoScalarWhereWithAggregatesInput = {
    AND?: Prisma.SiteSubmissionPhotoScalarWhereWithAggregatesInput | Prisma.SiteSubmissionPhotoScalarWhereWithAggregatesInput[];
    OR?: Prisma.SiteSubmissionPhotoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SiteSubmissionPhotoScalarWhereWithAggregatesInput | Prisma.SiteSubmissionPhotoScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SiteSubmissionPhoto"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"SiteSubmissionPhoto"> | string;
    submissionId?: Prisma.StringWithAggregatesFilter<"SiteSubmissionPhoto"> | string;
    storageKey?: Prisma.StringWithAggregatesFilter<"SiteSubmissionPhoto"> | string;
    mimeType?: Prisma.StringWithAggregatesFilter<"SiteSubmissionPhoto"> | string;
    fileSize?: Prisma.IntWithAggregatesFilter<"SiteSubmissionPhoto"> | number;
    capturedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"SiteSubmissionPhoto"> | Date | string | null;
    uploadedAt?: Prisma.DateTimeWithAggregatesFilter<"SiteSubmissionPhoto"> | Date | string;
};
export type SiteSubmissionPhotoCreateInput = {
    id?: string;
    storageKey: string;
    mimeType: string;
    fileSize: number;
    capturedAt?: Date | string | null;
    uploadedAt?: Date | string;
    submission: Prisma.SiteSubmissionCreateNestedOneWithoutPhotosInput;
};
export type SiteSubmissionPhotoUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    submissionId: string;
    storageKey: string;
    mimeType: string;
    fileSize: number;
    capturedAt?: Date | string | null;
    uploadedAt?: Date | string;
};
export type SiteSubmissionPhotoUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    fileSize?: Prisma.IntFieldUpdateOperationsInput | number;
    capturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submission?: Prisma.SiteSubmissionUpdateOneRequiredWithoutPhotosNestedInput;
};
export type SiteSubmissionPhotoUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    submissionId?: Prisma.StringFieldUpdateOperationsInput | string;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    fileSize?: Prisma.IntFieldUpdateOperationsInput | number;
    capturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSubmissionPhotoCreateManyInput = {
    id?: string;
    tenantId: string;
    submissionId: string;
    storageKey: string;
    mimeType: string;
    fileSize: number;
    capturedAt?: Date | string | null;
    uploadedAt?: Date | string;
};
export type SiteSubmissionPhotoUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    fileSize?: Prisma.IntFieldUpdateOperationsInput | number;
    capturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSubmissionPhotoUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    submissionId?: Prisma.StringFieldUpdateOperationsInput | string;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    fileSize?: Prisma.IntFieldUpdateOperationsInput | number;
    capturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSubmissionPhotoListRelationFilter = {
    every?: Prisma.SiteSubmissionPhotoWhereInput;
    some?: Prisma.SiteSubmissionPhotoWhereInput;
    none?: Prisma.SiteSubmissionPhotoWhereInput;
};
export type SiteSubmissionPhotoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SiteSubmissionPhotoOrderByRelevanceInput = {
    fields: Prisma.SiteSubmissionPhotoOrderByRelevanceFieldEnum | Prisma.SiteSubmissionPhotoOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type SiteSubmissionPhotoTenantIdIdCompoundUniqueInput = {
    tenantId: string;
    id: string;
};
export type SiteSubmissionPhotoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    fileSize?: Prisma.SortOrder;
    capturedAt?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
};
export type SiteSubmissionPhotoAvgOrderByAggregateInput = {
    fileSize?: Prisma.SortOrder;
};
export type SiteSubmissionPhotoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    fileSize?: Prisma.SortOrder;
    capturedAt?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
};
export type SiteSubmissionPhotoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    fileSize?: Prisma.SortOrder;
    capturedAt?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
};
export type SiteSubmissionPhotoSumOrderByAggregateInput = {
    fileSize?: Prisma.SortOrder;
};
export type SiteSubmissionPhotoCreateNestedManyWithoutSubmissionInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionPhotoCreateWithoutSubmissionInput, Prisma.SiteSubmissionPhotoUncheckedCreateWithoutSubmissionInput> | Prisma.SiteSubmissionPhotoCreateWithoutSubmissionInput[] | Prisma.SiteSubmissionPhotoUncheckedCreateWithoutSubmissionInput[];
    connectOrCreate?: Prisma.SiteSubmissionPhotoCreateOrConnectWithoutSubmissionInput | Prisma.SiteSubmissionPhotoCreateOrConnectWithoutSubmissionInput[];
    createMany?: Prisma.SiteSubmissionPhotoCreateManySubmissionInputEnvelope;
    connect?: Prisma.SiteSubmissionPhotoWhereUniqueInput | Prisma.SiteSubmissionPhotoWhereUniqueInput[];
};
export type SiteSubmissionPhotoUncheckedCreateNestedManyWithoutSubmissionInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionPhotoCreateWithoutSubmissionInput, Prisma.SiteSubmissionPhotoUncheckedCreateWithoutSubmissionInput> | Prisma.SiteSubmissionPhotoCreateWithoutSubmissionInput[] | Prisma.SiteSubmissionPhotoUncheckedCreateWithoutSubmissionInput[];
    connectOrCreate?: Prisma.SiteSubmissionPhotoCreateOrConnectWithoutSubmissionInput | Prisma.SiteSubmissionPhotoCreateOrConnectWithoutSubmissionInput[];
    createMany?: Prisma.SiteSubmissionPhotoCreateManySubmissionInputEnvelope;
    connect?: Prisma.SiteSubmissionPhotoWhereUniqueInput | Prisma.SiteSubmissionPhotoWhereUniqueInput[];
};
export type SiteSubmissionPhotoUpdateManyWithoutSubmissionNestedInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionPhotoCreateWithoutSubmissionInput, Prisma.SiteSubmissionPhotoUncheckedCreateWithoutSubmissionInput> | Prisma.SiteSubmissionPhotoCreateWithoutSubmissionInput[] | Prisma.SiteSubmissionPhotoUncheckedCreateWithoutSubmissionInput[];
    connectOrCreate?: Prisma.SiteSubmissionPhotoCreateOrConnectWithoutSubmissionInput | Prisma.SiteSubmissionPhotoCreateOrConnectWithoutSubmissionInput[];
    upsert?: Prisma.SiteSubmissionPhotoUpsertWithWhereUniqueWithoutSubmissionInput | Prisma.SiteSubmissionPhotoUpsertWithWhereUniqueWithoutSubmissionInput[];
    createMany?: Prisma.SiteSubmissionPhotoCreateManySubmissionInputEnvelope;
    set?: Prisma.SiteSubmissionPhotoWhereUniqueInput | Prisma.SiteSubmissionPhotoWhereUniqueInput[];
    disconnect?: Prisma.SiteSubmissionPhotoWhereUniqueInput | Prisma.SiteSubmissionPhotoWhereUniqueInput[];
    delete?: Prisma.SiteSubmissionPhotoWhereUniqueInput | Prisma.SiteSubmissionPhotoWhereUniqueInput[];
    connect?: Prisma.SiteSubmissionPhotoWhereUniqueInput | Prisma.SiteSubmissionPhotoWhereUniqueInput[];
    update?: Prisma.SiteSubmissionPhotoUpdateWithWhereUniqueWithoutSubmissionInput | Prisma.SiteSubmissionPhotoUpdateWithWhereUniqueWithoutSubmissionInput[];
    updateMany?: Prisma.SiteSubmissionPhotoUpdateManyWithWhereWithoutSubmissionInput | Prisma.SiteSubmissionPhotoUpdateManyWithWhereWithoutSubmissionInput[];
    deleteMany?: Prisma.SiteSubmissionPhotoScalarWhereInput | Prisma.SiteSubmissionPhotoScalarWhereInput[];
};
export type SiteSubmissionPhotoUncheckedUpdateManyWithoutSubmissionNestedInput = {
    create?: Prisma.XOR<Prisma.SiteSubmissionPhotoCreateWithoutSubmissionInput, Prisma.SiteSubmissionPhotoUncheckedCreateWithoutSubmissionInput> | Prisma.SiteSubmissionPhotoCreateWithoutSubmissionInput[] | Prisma.SiteSubmissionPhotoUncheckedCreateWithoutSubmissionInput[];
    connectOrCreate?: Prisma.SiteSubmissionPhotoCreateOrConnectWithoutSubmissionInput | Prisma.SiteSubmissionPhotoCreateOrConnectWithoutSubmissionInput[];
    upsert?: Prisma.SiteSubmissionPhotoUpsertWithWhereUniqueWithoutSubmissionInput | Prisma.SiteSubmissionPhotoUpsertWithWhereUniqueWithoutSubmissionInput[];
    createMany?: Prisma.SiteSubmissionPhotoCreateManySubmissionInputEnvelope;
    set?: Prisma.SiteSubmissionPhotoWhereUniqueInput | Prisma.SiteSubmissionPhotoWhereUniqueInput[];
    disconnect?: Prisma.SiteSubmissionPhotoWhereUniqueInput | Prisma.SiteSubmissionPhotoWhereUniqueInput[];
    delete?: Prisma.SiteSubmissionPhotoWhereUniqueInput | Prisma.SiteSubmissionPhotoWhereUniqueInput[];
    connect?: Prisma.SiteSubmissionPhotoWhereUniqueInput | Prisma.SiteSubmissionPhotoWhereUniqueInput[];
    update?: Prisma.SiteSubmissionPhotoUpdateWithWhereUniqueWithoutSubmissionInput | Prisma.SiteSubmissionPhotoUpdateWithWhereUniqueWithoutSubmissionInput[];
    updateMany?: Prisma.SiteSubmissionPhotoUpdateManyWithWhereWithoutSubmissionInput | Prisma.SiteSubmissionPhotoUpdateManyWithWhereWithoutSubmissionInput[];
    deleteMany?: Prisma.SiteSubmissionPhotoScalarWhereInput | Prisma.SiteSubmissionPhotoScalarWhereInput[];
};
export type SiteSubmissionPhotoCreateWithoutSubmissionInput = {
    id?: string;
    storageKey: string;
    mimeType: string;
    fileSize: number;
    capturedAt?: Date | string | null;
    uploadedAt?: Date | string;
};
export type SiteSubmissionPhotoUncheckedCreateWithoutSubmissionInput = {
    id?: string;
    storageKey: string;
    mimeType: string;
    fileSize: number;
    capturedAt?: Date | string | null;
    uploadedAt?: Date | string;
};
export type SiteSubmissionPhotoCreateOrConnectWithoutSubmissionInput = {
    where: Prisma.SiteSubmissionPhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiteSubmissionPhotoCreateWithoutSubmissionInput, Prisma.SiteSubmissionPhotoUncheckedCreateWithoutSubmissionInput>;
};
export type SiteSubmissionPhotoCreateManySubmissionInputEnvelope = {
    data: Prisma.SiteSubmissionPhotoCreateManySubmissionInput | Prisma.SiteSubmissionPhotoCreateManySubmissionInput[];
    skipDuplicates?: boolean;
};
export type SiteSubmissionPhotoUpsertWithWhereUniqueWithoutSubmissionInput = {
    where: Prisma.SiteSubmissionPhotoWhereUniqueInput;
    update: Prisma.XOR<Prisma.SiteSubmissionPhotoUpdateWithoutSubmissionInput, Prisma.SiteSubmissionPhotoUncheckedUpdateWithoutSubmissionInput>;
    create: Prisma.XOR<Prisma.SiteSubmissionPhotoCreateWithoutSubmissionInput, Prisma.SiteSubmissionPhotoUncheckedCreateWithoutSubmissionInput>;
};
export type SiteSubmissionPhotoUpdateWithWhereUniqueWithoutSubmissionInput = {
    where: Prisma.SiteSubmissionPhotoWhereUniqueInput;
    data: Prisma.XOR<Prisma.SiteSubmissionPhotoUpdateWithoutSubmissionInput, Prisma.SiteSubmissionPhotoUncheckedUpdateWithoutSubmissionInput>;
};
export type SiteSubmissionPhotoUpdateManyWithWhereWithoutSubmissionInput = {
    where: Prisma.SiteSubmissionPhotoScalarWhereInput;
    data: Prisma.XOR<Prisma.SiteSubmissionPhotoUpdateManyMutationInput, Prisma.SiteSubmissionPhotoUncheckedUpdateManyWithoutSubmissionInput>;
};
export type SiteSubmissionPhotoScalarWhereInput = {
    AND?: Prisma.SiteSubmissionPhotoScalarWhereInput | Prisma.SiteSubmissionPhotoScalarWhereInput[];
    OR?: Prisma.SiteSubmissionPhotoScalarWhereInput[];
    NOT?: Prisma.SiteSubmissionPhotoScalarWhereInput | Prisma.SiteSubmissionPhotoScalarWhereInput[];
    id?: Prisma.StringFilter<"SiteSubmissionPhoto"> | string;
    tenantId?: Prisma.StringFilter<"SiteSubmissionPhoto"> | string;
    submissionId?: Prisma.StringFilter<"SiteSubmissionPhoto"> | string;
    storageKey?: Prisma.StringFilter<"SiteSubmissionPhoto"> | string;
    mimeType?: Prisma.StringFilter<"SiteSubmissionPhoto"> | string;
    fileSize?: Prisma.IntFilter<"SiteSubmissionPhoto"> | number;
    capturedAt?: Prisma.DateTimeNullableFilter<"SiteSubmissionPhoto"> | Date | string | null;
    uploadedAt?: Prisma.DateTimeFilter<"SiteSubmissionPhoto"> | Date | string;
};
export type SiteSubmissionPhotoCreateManySubmissionInput = {
    id?: string;
    storageKey: string;
    mimeType: string;
    fileSize: number;
    capturedAt?: Date | string | null;
    uploadedAt?: Date | string;
};
export type SiteSubmissionPhotoUpdateWithoutSubmissionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    fileSize?: Prisma.IntFieldUpdateOperationsInput | number;
    capturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSubmissionPhotoUncheckedUpdateWithoutSubmissionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    fileSize?: Prisma.IntFieldUpdateOperationsInput | number;
    capturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSubmissionPhotoUncheckedUpdateManyWithoutSubmissionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    fileSize?: Prisma.IntFieldUpdateOperationsInput | number;
    capturedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSubmissionPhotoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    submissionId?: boolean;
    storageKey?: boolean;
    mimeType?: boolean;
    fileSize?: boolean;
    capturedAt?: boolean;
    uploadedAt?: boolean;
    submission?: boolean | Prisma.SiteSubmissionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["siteSubmissionPhoto"]>;
export type SiteSubmissionPhotoSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    submissionId?: boolean;
    storageKey?: boolean;
    mimeType?: boolean;
    fileSize?: boolean;
    capturedAt?: boolean;
    uploadedAt?: boolean;
};
export type SiteSubmissionPhotoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "submissionId" | "storageKey" | "mimeType" | "fileSize" | "capturedAt" | "uploadedAt", ExtArgs["result"]["siteSubmissionPhoto"]>;
export type SiteSubmissionPhotoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    submission?: boolean | Prisma.SiteSubmissionDefaultArgs<ExtArgs>;
};
export type $SiteSubmissionPhotoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SiteSubmissionPhoto";
    objects: {
        submission: Prisma.$SiteSubmissionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        submissionId: string;
        storageKey: string;
        mimeType: string;
        fileSize: number;
        capturedAt: Date | null;
        uploadedAt: Date;
    }, ExtArgs["result"]["siteSubmissionPhoto"]>;
    composites: {};
};
export type SiteSubmissionPhotoGetPayload<S extends boolean | null | undefined | SiteSubmissionPhotoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPhotoPayload, S>;
export type SiteSubmissionPhotoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SiteSubmissionPhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SiteSubmissionPhotoCountAggregateInputType | true;
};
export interface SiteSubmissionPhotoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SiteSubmissionPhoto'];
        meta: {
            name: 'SiteSubmissionPhoto';
        };
    };
    findUnique<T extends SiteSubmissionPhotoFindUniqueArgs>(args: Prisma.SelectSubset<T, SiteSubmissionPhotoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionPhotoClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SiteSubmissionPhotoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SiteSubmissionPhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionPhotoClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SiteSubmissionPhotoFindFirstArgs>(args?: Prisma.SelectSubset<T, SiteSubmissionPhotoFindFirstArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionPhotoClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SiteSubmissionPhotoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SiteSubmissionPhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionPhotoClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SiteSubmissionPhotoFindManyArgs>(args?: Prisma.SelectSubset<T, SiteSubmissionPhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SiteSubmissionPhotoCreateArgs>(args: Prisma.SelectSubset<T, SiteSubmissionPhotoCreateArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionPhotoClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SiteSubmissionPhotoCreateManyArgs>(args?: Prisma.SelectSubset<T, SiteSubmissionPhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends SiteSubmissionPhotoDeleteArgs>(args: Prisma.SelectSubset<T, SiteSubmissionPhotoDeleteArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionPhotoClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SiteSubmissionPhotoUpdateArgs>(args: Prisma.SelectSubset<T, SiteSubmissionPhotoUpdateArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionPhotoClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SiteSubmissionPhotoDeleteManyArgs>(args?: Prisma.SelectSubset<T, SiteSubmissionPhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SiteSubmissionPhotoUpdateManyArgs>(args: Prisma.SelectSubset<T, SiteSubmissionPhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends SiteSubmissionPhotoUpsertArgs>(args: Prisma.SelectSubset<T, SiteSubmissionPhotoUpsertArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionPhotoClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SiteSubmissionPhotoCountArgs>(args?: Prisma.Subset<T, SiteSubmissionPhotoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SiteSubmissionPhotoCountAggregateOutputType> : number>;
    aggregate<T extends SiteSubmissionPhotoAggregateArgs>(args: Prisma.Subset<T, SiteSubmissionPhotoAggregateArgs>): Prisma.PrismaPromise<GetSiteSubmissionPhotoAggregateType<T>>;
    groupBy<T extends SiteSubmissionPhotoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SiteSubmissionPhotoGroupByArgs['orderBy'];
    } : {
        orderBy?: SiteSubmissionPhotoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SiteSubmissionPhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteSubmissionPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SiteSubmissionPhotoFieldRefs;
}
export interface Prisma__SiteSubmissionPhotoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    submission<T extends Prisma.SiteSubmissionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SiteSubmissionDefaultArgs<ExtArgs>>): Prisma.Prisma__SiteSubmissionClient<runtime.Types.Result.GetResult<Prisma.$SiteSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SiteSubmissionPhotoFieldRefs {
    readonly id: Prisma.FieldRef<"SiteSubmissionPhoto", 'String'>;
    readonly tenantId: Prisma.FieldRef<"SiteSubmissionPhoto", 'String'>;
    readonly submissionId: Prisma.FieldRef<"SiteSubmissionPhoto", 'String'>;
    readonly storageKey: Prisma.FieldRef<"SiteSubmissionPhoto", 'String'>;
    readonly mimeType: Prisma.FieldRef<"SiteSubmissionPhoto", 'String'>;
    readonly fileSize: Prisma.FieldRef<"SiteSubmissionPhoto", 'Int'>;
    readonly capturedAt: Prisma.FieldRef<"SiteSubmissionPhoto", 'DateTime'>;
    readonly uploadedAt: Prisma.FieldRef<"SiteSubmissionPhoto", 'DateTime'>;
}
export type SiteSubmissionPhotoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionPhotoOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionPhotoInclude<ExtArgs> | null;
    where: Prisma.SiteSubmissionPhotoWhereUniqueInput;
};
export type SiteSubmissionPhotoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionPhotoOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionPhotoInclude<ExtArgs> | null;
    where: Prisma.SiteSubmissionPhotoWhereUniqueInput;
};
export type SiteSubmissionPhotoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SiteSubmissionPhotoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SiteSubmissionPhotoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SiteSubmissionPhotoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionPhotoOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionPhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiteSubmissionPhotoCreateInput, Prisma.SiteSubmissionPhotoUncheckedCreateInput>;
};
export type SiteSubmissionPhotoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SiteSubmissionPhotoCreateManyInput | Prisma.SiteSubmissionPhotoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SiteSubmissionPhotoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionPhotoOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionPhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiteSubmissionPhotoUpdateInput, Prisma.SiteSubmissionPhotoUncheckedUpdateInput>;
    where: Prisma.SiteSubmissionPhotoWhereUniqueInput;
};
export type SiteSubmissionPhotoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SiteSubmissionPhotoUpdateManyMutationInput, Prisma.SiteSubmissionPhotoUncheckedUpdateManyInput>;
    where?: Prisma.SiteSubmissionPhotoWhereInput;
    limit?: number;
};
export type SiteSubmissionPhotoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionPhotoOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionPhotoInclude<ExtArgs> | null;
    where: Prisma.SiteSubmissionPhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiteSubmissionPhotoCreateInput, Prisma.SiteSubmissionPhotoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SiteSubmissionPhotoUpdateInput, Prisma.SiteSubmissionPhotoUncheckedUpdateInput>;
};
export type SiteSubmissionPhotoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionPhotoOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionPhotoInclude<ExtArgs> | null;
    where: Prisma.SiteSubmissionPhotoWhereUniqueInput;
};
export type SiteSubmissionPhotoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSubmissionPhotoWhereInput;
    limit?: number;
};
export type SiteSubmissionPhotoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSubmissionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.SiteSubmissionPhotoOmit<ExtArgs> | null;
    include?: Prisma.SiteSubmissionPhotoInclude<ExtArgs> | null;
};
