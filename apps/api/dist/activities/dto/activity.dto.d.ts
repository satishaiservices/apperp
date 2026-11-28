export declare class CreateActivityDto {
    parentId?: string;
    activityCode: string;
    name: string;
    description?: string;
    unit?: string;
    status?: string;
    priority?: string;
    progress?: number;
    startDate?: string;
    dueDate?: string;
    estimatedCost?: number;
    actualCost?: number;
}
export declare class UpdateActivityDto {
    activityCode?: string;
    name?: string;
    description?: string;
    unit?: string;
    status?: string;
    priority?: string;
    progress?: number;
    startDate?: string;
    dueDate?: string;
    estimatedCost?: number;
    actualCost?: number;
}
export declare class SetAssignmentsDto {
    membershipIds: string[];
}
