import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeaveSubmission } from '../../models/leave-submission';
import { BaseResponse } from '../../models/base-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) { }

  submitLeave(leaveSubmission: LeaveSubmission): Observable<BaseResponse> {
    return this.http.post<BaseResponse>("", leaveSubmission)
  }
}
