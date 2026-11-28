export declare class CreateSubmissionDto {
    startChainage: string;
    endChainage: string;
    activityIds: string[];
    latitude?: number;
    longitude?: number;
    locationAccuracyM?: number;
    locationCapturedAt?: string;
    remarks?: string;
}
