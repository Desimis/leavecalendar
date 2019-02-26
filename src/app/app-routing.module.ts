import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmitLeaveComponent } from './features/submit-leave/submit-leave.component';
import { CancelLeaveComponent } from './features/cancel-leave/cancel-leave.component';
import { ViewCalendarComponent } from './features/view-calendar/view-calendar.component';

const routes: Routes = [
  { path: 'submitleave', component: SubmitLeaveComponent },
  { path: 'cancelleave', component: CancelLeaveComponent },
  { path: 'viewcalendar', component: ViewCalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
