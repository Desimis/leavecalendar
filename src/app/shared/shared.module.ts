import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromComponents from './components';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterNavComponent } from './components/footer-nav/footer-nav.component';
import { LoaderComponent } from './components/loader/loader.component';

import { 
  MatToolbarModule, 
  MatMenuModule, 
  MatButtonModule, 
  MatCardModule, 
  MatExpansionModule, 
  MatTabsModule, 
  MatGridListModule, 
  MatFormFieldModule, 
  MatDatepickerModule, 
  MatNativeDateModule,
  MatInputModule,
  MatCheckboxModule,
  MatSelectModule,
  MatTableModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from '@angular/material';
  import { MomentDateAdapter } from '@angular/material-moment-adapter';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { DialogModalComponent } from './components/dialog-modal/dialog-modal.component';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [
    ...fromComponents.components,
    NavBarComponent,
    FooterNavComponent,
    LoaderComponent,
    SuccessModalComponent,
    DialogModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    BrowserAnimationsModule,
    //ScrollToModule.forRoot()
  ],
  exports: [
    ...fromComponents.exportComponents,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatTabsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    BrowserAnimationsModule
  ],
  providers: [
    MatDatepickerModule, 
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  entryComponents: [DialogModalComponent]
})
export class SharedModule { }
