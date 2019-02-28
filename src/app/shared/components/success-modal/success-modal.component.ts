import { Component, OnInit } from '@angular/core';
import { SubmissionStateService } from 'src/app/services/state-services/submission-state.service';
import { BaseResponse } from 'src/app/models/base-response';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styles:[`
        .modalContainer{
            position:absolute;
            z-index:2000;
            top:50%;
            left:50%;
        }
    `]
})
export class SuccessModalComponent implements OnInit {

  response: BaseResponse;

    constructor(private submissionStateService: SubmissionStateService){
    }

    ngOnInit(){
        this.submissionStateService.displayBaseResponse$.subscribe(
            state => {
                this.response = state;
            }
        )
    }

}
