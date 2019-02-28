import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from 'src/app/services/state-services/leave-service.service';
import { LeaveSubmission } from 'src/app/models/leave-submission';
import { BaseResponse } from 'src/app/models/base-response';
import { Router } from '@angular/router';
import { SubmissionStateService } from 'src/app/services/state-services/submission-state.service';

@Component({
  selector: 'app-submit-leave',
  templateUrl: './submit-leave.component.html',
  styleUrls: ['./submit-leave.component.css']
})
export class SubmitLeaveComponent implements OnInit {

  submitLeaveForm: FormGroup;
  submissionSuccess: BaseResponse;

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private router: Router,
    private submissionState: SubmissionStateService,
    ) { }

  ngOnInit() {
  }

  createForm() {
    this.fb.group({
      reason: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required]
    });
  }

  submitForm() {

    var leaveSubmission: LeaveSubmission = {
      UserId: "",
      Reason: this.submitLeaveForm.controls['reason'].value,
      DateFrom: this.submitLeaveForm.controls['dateFrom'].value,
      DateTo: this.submitLeaveForm.controls['dateTo'].value
    }

    this.leaveService.submitLeave(leaveSubmission)
    .subscribe(
      data => { this.submissionSuccess = data; },
      err => { },
      () => {
        if(this.submissionSuccess) {
          this.submissionState.display(this.submissionSuccess);
          setTimeout(() => 
          {
            this.submissionState.finish(null);
            if(this.submissionSuccess.success) {
              this.router.navigate['/viewcalendar'];
            }
          },
          5000);
        }
      }
    );
  }

}
