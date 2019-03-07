export interface LeaveEvent {
    LeaveEventId: number;
    SubmittedBy: string;
    DateSubmitted: string;
    UserId: string;
    DateFrom: string;
    DateTo: string;
    ApprovedBy: string;
    ApprovedState: string;
    AllDay: boolean;
}
