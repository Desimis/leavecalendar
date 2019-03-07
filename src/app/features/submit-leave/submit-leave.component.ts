import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from 'src/app/services/leave-service.service';
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
  minDate: Date;
  dateToMinDate: Date;

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private router: Router,
    private submissionState: SubmissionStateService,
    ) { }

  ngOnInit() {
    this.createForm();
    this.minDate = new Date();
    this.dateToMinDate = new Date();
  }

  createForm() {
    this.submitLeaveForm = this.fb.group({
      reason: ['', Validators.required],
      dateFrom: [Date, Validators.required],
      dateTo: [Date, Validators.required],
      allDay: [false],
      leaveType: ['', Validators.required]
    });
  }

  submitForm() {
    if(this.submitLeaveForm.valid) {
      var leaveSubmission: LeaveSubmission = {
        UserId: "",
        Reason: this.submitLeaveForm.controls['reason'].value,
        DateFrom: this.submitLeaveForm.controls['dateFrom'].value,
        DateTo: this.submitLeaveForm.controls['dateTo'].value,
        LeaveTypeId: this.submitLeaveForm.controls['leaveType'].value,
        AllDay: this.submitLeaveForm.controls['allDay'].value
      }

      this.submitLeaveForm.controls['dateTo'].touched && this.submitLeaveForm.controls['dateTo'].hasError('invalid');
  
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
    else {
      Object.keys(this.submitLeaveForm.controls).forEach(key => {
        this.submitLeaveForm.get(key).markAsTouched();
      });
    }
  }

  updateDateToMinDate() {
    this.dateToMinDate = this.submitLeaveForm.controls['dateFrom'].value;
    if(this.submitLeaveForm.controls['dateFrom'].value > this.submitLeaveForm.controls['dateTo'].value) {
      this.submitLeaveForm.controls['dateTo'].setErrors({invalid: true});
    }
  }

}
