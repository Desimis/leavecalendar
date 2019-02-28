import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseResponse } from '../../models/base-response';

@Injectable({
  providedIn: 'root'
})
export class SubmissionStateService {

  private response: BehaviorSubject<BaseResponse> = new BehaviorSubject<BaseResponse>(null);

    get displayBaseResponse$(): Observable<BaseResponse> {
        return new Observable(f => {this.response.subscribe(f);});
    } 

    display(baseResponse: BaseResponse){
        this.response.next(baseResponse);
    }

    finish(baseResponse: BaseResponse){
        this.response.next(baseResponse);
    }
}
