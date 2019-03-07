import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { LeaveEvent } from 'src/app/models/leave-events';
import { LeaveService } from 'src/app/services/leave-service.service';
import { DialogModalComponent } from 'src/app/shared/components/dialog-modal/dialog-modal.component';
import { LoaderStateService } from 'src/app/services/state-services/loader-state.service';

@Component({
  selector: 'app-review-leave',
  templateUrl: './review-leave.component.html',
  styleUrls: ['./review-leave.component.css']
})
export class ReviewLeaveComponent implements OnInit {

  leaveEvents: LeaveEvent[] = [];
  displayedColumns: string[] = ['SubmittedBy', 'DateSubmitted', 'DateFrom', 'DateTo', 'ApprovedState', 'Review'];
  dataSource = new MatTableDataSource(this.leaveEvents);
  selectedLeaveForReview: LeaveEvent;
  currentStateSelection: string;
  currentDate: Date = new Date();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private leaveService: LeaveService,
    public dialog: MatDialog,
    private loaderStateService: LoaderStateService
    ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getPendingLeaveEvents();
    this.currentStateSelection = "Pending"
  }

  filterByCurrentStateSelection(currentStateSelection: string) {
    if(currentStateSelection != "All") {
      this.dataSource.data = this.leaveEvents.filter(x => x.ApprovedState == currentStateSelection);
    }
    else {
      this.dataSource.data = this.leaveEvents;
    }
  }

  openDialog(leaveEvent: LeaveEvent): void {
    this.selectedLeaveForReview = leaveEvent;
    const dialogRef = this.dialog.open(DialogModalComponent, {
      width: '400px',
      data: {
        title: "Review Leave", 
        reason: leaveEvent.Reason,
        submittedBy: leaveEvent.SubmittedBy,
        dateSubmitted: leaveEvent.DateSubmitted,
        dateFrom: leaveEvent.DateFrom,
        dateTo: leaveEvent.DateTo,
        dialogType: "Review",
        approvedState: leaveEvent.ApprovedState
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null && result != undefined) {
        this.submitReviewDecision(result);
      }
    });
  }

  getPendingLeaveEvents() {
    this.loaderStateService.load();
    this.leaveService.getUserCurrentAndPendingLeaveEvents(1).subscribe(
      data => { this.leaveEvents = data; },
      err => {
        if(this.leaveEvents.length <= 0) {
          this.leaveEvents.push({
            LeaveEventId: 3,
            AllDay: true,
            ApprovedBy: "",
            DateFrom: new Date().toDateString(),
            DateTo: new Date().toDateString(),
            SubmittedBy: "Christian",
            UserId: "1",
            DateSubmitted: new Date().toDateString(),
            ApprovedState: "Pending",
            Reason: "Reason 1"
          },
          {
            LeaveEventId: 4,
            AllDay: true,
            ApprovedBy: "",
            DateFrom: new Date().toDateString(),
            DateTo: new Date().toDateString(),
            SubmittedBy: "Christian",
            UserId: "1",
            DateSubmitted: new Date().toDateString(),
            ApprovedState: "Pending",
            Reason: "Reason 2"
          },
          {
            LeaveEventId: 5,
            AllDay: true,
            ApprovedBy: "",
            DateFrom: new Date().toDateString(),
            DateTo: new Date().toDateString(),
            SubmittedBy: "Christian",
            UserId: "1",
            DateSubmitted: new Date().toDateString(),
            ApprovedState: "Approved",
            Reason: "Reason 5"
          },
          {
            LeaveEventId: 7,
            AllDay: true,
            ApprovedBy: "",
            DateFrom: new Date().toDateString(),
            DateTo: new Date().toDateString(),
            SubmittedBy: "Christian",
            UserId: "1",
            DateSubmitted: new Date().toDateString(),
            ApprovedState: "Declined",
            Reason: "Reason 3"
          });
        }

        this.filterByCurrentStateSelection(this.currentStateSelection);
        this.loaderStateService.finish();
      },
      () => {

      }
    );
  }

  submitReviewDecision(reviewDecision: boolean) {
    if(reviewDecision) {
      this.leaveService.approveLeave(this.selectedLeaveForReview && this.selectedLeaveForReview.LeaveEventId).subscribe(
        data => { if(data.success) {
          this.leaveEvents.find(x => x.LeaveEventId == this.selectedLeaveForReview.LeaveEventId).ApprovedState = "Approved";
          this.dataSource.data = this.leaveEvents;
        }},
        err => {
          this.leaveEvents.find(x => x.LeaveEventId == this.selectedLeaveForReview.LeaveEventId).ApprovedState = "Approved";
          this.filterByCurrentStateSelection(this.currentStateSelection);
        },
        () => {}
      );
    }
    else {
      this.leaveService.declineLeave(this.selectedLeaveForReview && this.selectedLeaveForReview.LeaveEventId).subscribe(
        data => { if(data.success) {
          this.leaveEvents.find(x => x.LeaveEventId == this.selectedLeaveForReview.LeaveEventId).ApprovedState = "Declined";
          this.dataSource.data = this.leaveEvents;
        }},
        err => {
          this.leaveEvents.find(x => x.LeaveEventId == this.selectedLeaveForReview.LeaveEventId).ApprovedState = "Declined";
          this.filterByCurrentStateSelection(this.currentStateSelection);
        },
        () => {}
      );
    }
  }

}
