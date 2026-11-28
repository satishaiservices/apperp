export declare class CreateDprDto {
    reportDate: string;
    weather?: string;
    siteConditions?: string;
    delays?: string;
    issues?: string;
    remarks?: string;
    workforceCount?: number;
    quantities?: any[];
    equipment?: any[];
    labor?: any[];
}
export declare class UpdateDprDto {
    reportDate?: string;
    weather?: string;
    siteConditions?: string;
    delays?: string;
    issues?: string;
    remarks?: string;
    workforceCount?: number;
    quantities?: any[];
    equipment?: any[];
    labor?: any[];
}
export declare class ReviewDprDto {
    reviewRemarks?: string;
}
