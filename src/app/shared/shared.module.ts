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
} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { DialogModalComponent } from './components/dialog-modal/dialog-modal.component';

//import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

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
    BrowserAnimationsModule
  ],
  providers: [MatDatepickerModule],
  entryComponents: [DialogModalComponent]
})
export class SharedModule { }
