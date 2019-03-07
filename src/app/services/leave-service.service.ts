import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeaveSubmission } from '../models/leave-submission';
import { BaseResponse } from '../models/base-response';
import { Observable } from 'rxjs';
import { LeaveEvent } from '../models/leave-events';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) { }

  submitLeave(leaveSubmission: LeaveSubmission): Observable<BaseResponse> {
    return this.http.post<BaseResponse>("", leaveSubmission)
  }

  cancelLeave(leaveId: number) {
    return this.http.post<BaseResponse>("", leaveId);
  }

  getUserCurrentAndPendingLeaveEvents(userId: number) {
    return this.http.post<LeaveEvent[]>("", userId);
  }
}
