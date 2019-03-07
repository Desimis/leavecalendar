import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { LeaveEvent } from 'src/app/models/leave-events';
import { LeaveService } from 'src/app/services/leave-service.service';
import { DialogModalComponent } from 'src/app/shared/components/dialog-modal/dialog-modal.component';
import { LoaderStateService } from 'src/app/services/state-services/loader-state.service';

@Component({
  selector: 'app-cancel-leave',
  templateUrl: './cancel-leave.component.html',
  styleUrls: ['./cancel-leave.component.css']
})
export class CancelLeaveComponent implements OnInit {
  
  leaveEvents: LeaveEvent[] = [];
  displayedColumns: string[] = ['DateSubmitted', 'DateFrom', 'DateTo', 'ApprovedState', 'Cancel'];
  dataSource = new MatTableDataSource(this.leaveEvents);
  selectedLeaveToBeCancelled: LeaveEvent;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private leaveService: LeaveService,
    public dialog: MatDialog,
    private loaderStateService: LoaderStateService
    ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getLeaveEventsForUser();
  }

  openDialog(leaveEvent: LeaveEvent): void {
    this.selectedLeaveToBeCancelled = leaveEvent;
    const dialogRef = this.dialog.open(DialogModalComponent, {
      width: '250px',
      data: {title: "Cancel Leave", message: "Are you sure you want to cancel this leave?", dialogType: "Warning"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.cancelLeave();
      }
    });
  }

  getLeaveEventsForUser() {
    this.loaderStateService.load();
    this.loaderStateService.loading$.subscribe(
      result => console.log(result)
    );
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
            Reason: ""
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
            ApprovedState: "Approved",
            Reason: ""
          });
        }

        this.dataSource.data = this.leaveEvents;
        this.loaderStateService.finish();
      },
      () => {
        this.loaderStateService.finish();
      }
    );
  }

  cancelLeave() {
    this.leaveService.cancelLeave(this.selectedLeaveToBeCancelled && this.selectedLeaveToBeCancelled.LeaveEventId).subscribe(
      data => { if(data.success) {
        this.leaveEvents.splice(this.leaveEvents.indexOf(this.selectedLeaveToBeCancelled), 1);
        this.dataSource.data = this.leaveEvents;
      }},
      err => {
        this.leaveEvents.splice(this.leaveEvents.indexOf(this.selectedLeaveToBeCancelled), 1);
        this.dataSource.data = this.leaveEvents;
      },
      () => {}
    );
  }

}
