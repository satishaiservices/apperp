import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions
] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? ((Without<T, U> & U) | (Without<U, T> & T)) & object : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
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
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "tenant" | "user" | "tenantMembership" | "permission" | "role" | "rolePermission" | "membershipRole" | "auditLog" | "project" | "activity" | "activityAssignment" | "dailyProgressReport" | "siteSubmission" | "siteSubmissionActivity" | "siteSubmissionPhoto" | "attendanceSession";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        Tenant: {
            payload: Prisma.$TenantPayload<ExtArgs>;
            fields: Prisma.TenantFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TenantFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload>;
                };
                findFirst: {
                    args: Prisma.TenantFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload>;
                };
                findMany: {
                    args: Prisma.TenantFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload>[];
                };
                create: {
                    args: Prisma.TenantCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload>;
                };
                createMany: {
                    args: Prisma.TenantCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.TenantDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload>;
                };
                update: {
                    args: Prisma.TenantUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload>;
                };
                deleteMany: {
                    args: Prisma.TenantDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TenantUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.TenantUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload>;
                };
                aggregate: {
                    args: Prisma.TenantAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTenant>;
                };
                groupBy: {
                    args: Prisma.TenantGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TenantGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TenantCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TenantCountAggregateOutputType> | number;
                };
            };
        };
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        TenantMembership: {
            payload: Prisma.$TenantMembershipPayload<ExtArgs>;
            fields: Prisma.TenantMembershipFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TenantMembershipFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantMembershipPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TenantMembershipFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantMembershipPayload>;
                };
                findFirst: {
                    args: Prisma.TenantMembershipFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantMembershipPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TenantMembershipFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantMembershipPayload>;
                };
                findMany: {
                    args: Prisma.TenantMembershipFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantMembershipPayload>[];
                };
                create: {
                    args: Prisma.TenantMembershipCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantMembershipPayload>;
                };
                createMany: {
                    args: Prisma.TenantMembershipCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.TenantMembershipDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantMembershipPayload>;
                };
                update: {
                    args: Prisma.TenantMembershipUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantMembershipPayload>;
                };
                deleteMany: {
                    args: Prisma.TenantMembershipDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TenantMembershipUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.TenantMembershipUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantMembershipPayload>;
                };
                aggregate: {
                    args: Prisma.TenantMembershipAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTenantMembership>;
                };
                groupBy: {
                    args: Prisma.TenantMembershipGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TenantMembershipGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TenantMembershipCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TenantMembershipCountAggregateOutputType> | number;
                };
            };
        };
        Permission: {
            payload: Prisma.$PermissionPayload<ExtArgs>;
            fields: Prisma.PermissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PermissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PermissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                findFirst: {
                    args: Prisma.PermissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PermissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                findMany: {
                    args: Prisma.PermissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[];
                };
                create: {
                    args: Prisma.PermissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                createMany: {
                    args: Prisma.PermissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.PermissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                update: {
                    args: Prisma.PermissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                deleteMany: {
                    args: Prisma.PermissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PermissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.PermissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                aggregate: {
                    args: Prisma.PermissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePermission>;
                };
                groupBy: {
                    args: Prisma.PermissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PermissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PermissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PermissionCountAggregateOutputType> | number;
                };
            };
        };
        Role: {
            payload: Prisma.$RolePayload<ExtArgs>;
            fields: Prisma.RoleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RoleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                findFirst: {
                    args: Prisma.RoleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                findMany: {
                    args: Prisma.RoleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>[];
                };
                create: {
                    args: Prisma.RoleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                createMany: {
                    args: Prisma.RoleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.RoleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                update: {
                    args: Prisma.RoleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                deleteMany: {
                    args: Prisma.RoleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RoleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.RoleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                aggregate: {
                    args: Prisma.RoleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRole>;
                };
                groupBy: {
                    args: Prisma.RoleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RoleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoleCountAggregateOutputType> | number;
                };
            };
        };
        RolePermission: {
            payload: Prisma.$RolePermissionPayload<ExtArgs>;
            fields: Prisma.RolePermissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RolePermissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RolePermissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                findFirst: {
                    args: Prisma.RolePermissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RolePermissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                findMany: {
                    args: Prisma.RolePermissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>[];
                };
                create: {
                    args: Prisma.RolePermissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                createMany: {
                    args: Prisma.RolePermissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.RolePermissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                update: {
                    args: Prisma.RolePermissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                deleteMany: {
                    args: Prisma.RolePermissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RolePermissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.RolePermissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                aggregate: {
                    args: Prisma.RolePermissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRolePermission>;
                };
                groupBy: {
                    args: Prisma.RolePermissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolePermissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RolePermissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolePermissionCountAggregateOutputType> | number;
                };
            };
        };
        MembershipRole: {
            payload: Prisma.$MembershipRolePayload<ExtArgs>;
            fields: Prisma.MembershipRoleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MembershipRoleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MembershipRoleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload>;
                };
                findFirst: {
                    args: Prisma.MembershipRoleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MembershipRoleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload>;
                };
                findMany: {
                    args: Prisma.MembershipRoleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload>[];
                };
                create: {
                    args: Prisma.MembershipRoleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload>;
                };
                createMany: {
                    args: Prisma.MembershipRoleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.MembershipRoleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload>;
                };
                update: {
                    args: Prisma.MembershipRoleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload>;
                };
                deleteMany: {
                    args: Prisma.MembershipRoleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MembershipRoleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.MembershipRoleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload>;
                };
                aggregate: {
                    args: Prisma.MembershipRoleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMembershipRole>;
                };
                groupBy: {
                    args: Prisma.MembershipRoleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MembershipRoleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MembershipRoleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MembershipRoleCountAggregateOutputType> | number;
                };
            };
        };
        AuditLog: {
            payload: Prisma.$AuditLogPayload<ExtArgs>;
            fields: Prisma.AuditLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AuditLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findFirst: {
                    args: Prisma.AuditLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findMany: {
                    args: Prisma.AuditLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                create: {
                    args: Prisma.AuditLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                createMany: {
                    args: Prisma.AuditLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.AuditLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                update: {
                    args: Prisma.AuditLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                deleteMany: {
                    args: Prisma.AuditLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AuditLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.AuditLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                aggregate: {
                    args: Prisma.AuditLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAuditLog>;
                };
                groupBy: {
                    args: Prisma.AuditLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AuditLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogCountAggregateOutputType> | number;
                };
            };
        };
        Project: {
            payload: Prisma.$ProjectPayload<ExtArgs>;
            fields: Prisma.ProjectFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProjectFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                findFirst: {
                    args: Prisma.ProjectFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                findMany: {
                    args: Prisma.ProjectFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>[];
                };
                create: {
                    args: Prisma.ProjectCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                createMany: {
                    args: Prisma.ProjectCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.ProjectDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                update: {
                    args: Prisma.ProjectUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                deleteMany: {
                    args: Prisma.ProjectDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProjectUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.ProjectUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                aggregate: {
                    args: Prisma.ProjectAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProject>;
                };
                groupBy: {
                    args: Prisma.ProjectGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProjectCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectCountAggregateOutputType> | number;
                };
            };
        };
        Activity: {
            payload: Prisma.$ActivityPayload<ExtArgs>;
            fields: Prisma.ActivityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ActivityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityPayload>;
                };
                findFirst: {
                    args: Prisma.ActivityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityPayload>;
                };
                findMany: {
                    args: Prisma.ActivityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityPayload>[];
                };
                create: {
                    args: Prisma.ActivityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityPayload>;
                };
                createMany: {
                    args: Prisma.ActivityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.ActivityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityPayload>;
                };
                update: {
                    args: Prisma.ActivityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityPayload>;
                };
                deleteMany: {
                    args: Prisma.ActivityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ActivityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.ActivityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityPayload>;
                };
                aggregate: {
                    args: Prisma.ActivityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateActivity>;
                };
                groupBy: {
                    args: Prisma.ActivityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ActivityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ActivityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ActivityCountAggregateOutputType> | number;
                };
            };
        };
        ActivityAssignment: {
            payload: Prisma.$ActivityAssignmentPayload<ExtArgs>;
            fields: Prisma.ActivityAssignmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ActivityAssignmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityAssignmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ActivityAssignmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityAssignmentPayload>;
                };
                findFirst: {
                    args: Prisma.ActivityAssignmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityAssignmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ActivityAssignmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityAssignmentPayload>;
                };
                findMany: {
                    args: Prisma.ActivityAssignmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityAssignmentPayload>[];
                };
                create: {
                    args: Prisma.ActivityAssignmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityAssignmentPayload>;
                };
                createMany: {
                    args: Prisma.ActivityAssignmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.ActivityAssignmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityAssignmentPayload>;
                };
                update: {
                    args: Prisma.ActivityAssignmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityAssignmentPayload>;
                };
                deleteMany: {
                    args: Prisma.ActivityAssignmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ActivityAssignmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.ActivityAssignmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityAssignmentPayload>;
                };
                aggregate: {
                    args: Prisma.ActivityAssignmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateActivityAssignment>;
                };
                groupBy: {
                    args: Prisma.ActivityAssignmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ActivityAssignmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ActivityAssignmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ActivityAssignmentCountAggregateOutputType> | number;
                };
            };
        };
        DailyProgressReport: {
            payload: Prisma.$DailyProgressReportPayload<ExtArgs>;
            fields: Prisma.DailyProgressReportFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DailyProgressReportFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyProgressReportPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DailyProgressReportFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyProgressReportPayload>;
                };
                findFirst: {
                    args: Prisma.DailyProgressReportFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyProgressReportPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DailyProgressReportFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyProgressReportPayload>;
                };
                findMany: {
                    args: Prisma.DailyProgressReportFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyProgressReportPayload>[];
                };
                create: {
                    args: Prisma.DailyProgressReportCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyProgressReportPayload>;
                };
                createMany: {
                    args: Prisma.DailyProgressReportCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.DailyProgressReportDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyProgressReportPayload>;
                };
                update: {
                    args: Prisma.DailyProgressReportUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyProgressReportPayload>;
                };
                deleteMany: {
                    args: Prisma.DailyProgressReportDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DailyProgressReportUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.DailyProgressReportUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyProgressReportPayload>;
                };
                aggregate: {
                    args: Prisma.DailyProgressReportAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDailyProgressReport>;
                };
                groupBy: {
                    args: Prisma.DailyProgressReportGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DailyProgressReportGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DailyProgressReportCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DailyProgressReportCountAggregateOutputType> | number;
                };
            };
        };
        SiteSubmission: {
            payload: Prisma.$SiteSubmissionPayload<ExtArgs>;
            fields: Prisma.SiteSubmissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SiteSubmissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SiteSubmissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPayload>;
                };
                findFirst: {
                    args: Prisma.SiteSubmissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SiteSubmissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPayload>;
                };
                findMany: {
                    args: Prisma.SiteSubmissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPayload>[];
                };
                create: {
                    args: Prisma.SiteSubmissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPayload>;
                };
                createMany: {
                    args: Prisma.SiteSubmissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.SiteSubmissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPayload>;
                };
                update: {
                    args: Prisma.SiteSubmissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPayload>;
                };
                deleteMany: {
                    args: Prisma.SiteSubmissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SiteSubmissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.SiteSubmissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPayload>;
                };
                aggregate: {
                    args: Prisma.SiteSubmissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSiteSubmission>;
                };
                groupBy: {
                    args: Prisma.SiteSubmissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SiteSubmissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SiteSubmissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SiteSubmissionCountAggregateOutputType> | number;
                };
            };
        };
        SiteSubmissionActivity: {
            payload: Prisma.$SiteSubmissionActivityPayload<ExtArgs>;
            fields: Prisma.SiteSubmissionActivityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SiteSubmissionActivityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionActivityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SiteSubmissionActivityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionActivityPayload>;
                };
                findFirst: {
                    args: Prisma.SiteSubmissionActivityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionActivityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SiteSubmissionActivityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionActivityPayload>;
                };
                findMany: {
                    args: Prisma.SiteSubmissionActivityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionActivityPayload>[];
                };
                create: {
                    args: Prisma.SiteSubmissionActivityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionActivityPayload>;
                };
                createMany: {
                    args: Prisma.SiteSubmissionActivityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.SiteSubmissionActivityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionActivityPayload>;
                };
                update: {
                    args: Prisma.SiteSubmissionActivityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionActivityPayload>;
                };
                deleteMany: {
                    args: Prisma.SiteSubmissionActivityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SiteSubmissionActivityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.SiteSubmissionActivityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionActivityPayload>;
                };
                aggregate: {
                    args: Prisma.SiteSubmissionActivityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSiteSubmissionActivity>;
                };
                groupBy: {
                    args: Prisma.SiteSubmissionActivityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SiteSubmissionActivityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SiteSubmissionActivityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SiteSubmissionActivityCountAggregateOutputType> | number;
                };
            };
        };
        SiteSubmissionPhoto: {
            payload: Prisma.$SiteSubmissionPhotoPayload<ExtArgs>;
            fields: Prisma.SiteSubmissionPhotoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SiteSubmissionPhotoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPhotoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SiteSubmissionPhotoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPhotoPayload>;
                };
                findFirst: {
                    args: Prisma.SiteSubmissionPhotoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPhotoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SiteSubmissionPhotoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPhotoPayload>;
                };
                findMany: {
                    args: Prisma.SiteSubmissionPhotoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPhotoPayload>[];
                };
                create: {
                    args: Prisma.SiteSubmissionPhotoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPhotoPayload>;
                };
                createMany: {
                    args: Prisma.SiteSubmissionPhotoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.SiteSubmissionPhotoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPhotoPayload>;
                };
                update: {
                    args: Prisma.SiteSubmissionPhotoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPhotoPayload>;
                };
                deleteMany: {
                    args: Prisma.SiteSubmissionPhotoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SiteSubmissionPhotoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.SiteSubmissionPhotoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSubmissionPhotoPayload>;
                };
                aggregate: {
                    args: Prisma.SiteSubmissionPhotoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSiteSubmissionPhoto>;
                };
                groupBy: {
                    args: Prisma.SiteSubmissionPhotoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SiteSubmissionPhotoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SiteSubmissionPhotoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SiteSubmissionPhotoCountAggregateOutputType> | number;
                };
            };
        };
        AttendanceSession: {
            payload: Prisma.$AttendanceSessionPayload<ExtArgs>;
            fields: Prisma.AttendanceSessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AttendanceSessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceSessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AttendanceSessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceSessionPayload>;
                };
                findFirst: {
                    args: Prisma.AttendanceSessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceSessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AttendanceSessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceSessionPayload>;
                };
                findMany: {
                    args: Prisma.AttendanceSessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceSessionPayload>[];
                };
                create: {
                    args: Prisma.AttendanceSessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceSessionPayload>;
                };
                createMany: {
                    args: Prisma.AttendanceSessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.AttendanceSessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceSessionPayload>;
                };
                update: {
                    args: Prisma.AttendanceSessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceSessionPayload>;
                };
                deleteMany: {
                    args: Prisma.AttendanceSessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AttendanceSessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.AttendanceSessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceSessionPayload>;
                };
                aggregate: {
                    args: Prisma.AttendanceSessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAttendanceSession>;
                };
                groupBy: {
                    args: Prisma.AttendanceSessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AttendanceSessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AttendanceSessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AttendanceSessionCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
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
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: runtime.JsonNullClass;
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
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
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
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientBaseOptions {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
}
export interface PrismaClientOptionsWithAccelerateUrl extends PrismaClientBaseOptions {
    accelerateUrl: string;
    adapter?: never;
}
export interface PrismaClientOptionsWithAdapter extends PrismaClientBaseOptions {
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
}
export type PrismaClientOptions = PrismaClientOptionsWithAccelerateUrl | PrismaClientOptionsWithAdapter;
export type GlobalOmitConfig = {
    tenant?: Prisma.TenantOmit;
    user?: Prisma.UserOmit;
    tenantMembership?: Prisma.TenantMembershipOmit;
    permission?: Prisma.PermissionOmit;
    role?: Prisma.RoleOmit;
    rolePermission?: Prisma.RolePermissionOmit;
    membershipRole?: Prisma.MembershipRoleOmit;
    auditLog?: Prisma.AuditLogOmit;
    project?: Prisma.ProjectOmit;
    activity?: Prisma.ActivityOmit;
    activityAssignment?: Prisma.ActivityAssignmentOmit;
    dailyProgressReport?: Prisma.DailyProgressReportOmit;
    siteSubmission?: Prisma.SiteSubmissionOmit;
    siteSubmissionActivity?: Prisma.SiteSubmissionActivityOmit;
    siteSubmissionPhoto?: Prisma.SiteSubmissionPhotoOmit;
    attendanceSession?: Prisma.AttendanceSessionOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
