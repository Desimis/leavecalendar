import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../models/base-response';
import { Observable } from 'rxjs';
import { LeaveEvents } from '../models/calendar-events';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  getCalendarEvents() {
    return this.http.get<LeaveEvents[]>("")
  }
}
