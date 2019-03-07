export interface LeaveSubmission {
    UserId: string;
    Reason: string;
    DateFrom: string;
    DateTo: string;
    AllDay: boolean;
    LeaveTypeId: number;
}
