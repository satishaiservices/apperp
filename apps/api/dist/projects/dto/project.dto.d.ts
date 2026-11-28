export declare class CreateProjectDto {
    projectCode: string;
    name: string;
    description?: string;
    clientName?: string;
    siteAddress?: string;
    startChainage?: string;
    endChainage?: string;
    startLatitude?: number;
    startLongitude?: number;
    endLatitude?: number;
    endLongitude?: number;
    status?: string;
    budget?: any;
    startDate?: string;
    endDate?: string;
}
export declare class UpdateProjectDto {
    projectCode?: string;
    name?: string;
    description?: string;
    clientName?: string;
    siteAddress?: string;
    startChainage?: string;
    endChainage?: string;
    startLatitude?: number;
    startLongitude?: number;
    endLatitude?: number;
    endLongitude?: number;
    status?: string;
    budget?: any;
    startDate?: string;
    endDate?: string;
}
export declare class DuplicateProjectDto {
    projectCode?: string;
    name?: string;
}
