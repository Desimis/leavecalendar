import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromComponents from './components';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterNavComponent } from './components/footer-nav/footer-nav.component';
import { LoaderComponent } from './components/loader/loader.component';

import { MatToolbarModule, MatMenuModule, MatButtonModule, MatCardModule, MatExpansionModule, MatTabsModule, MatGridListModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';

//import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
  declarations: [
    ...fromComponents.components,
    NavBarComponent,
    FooterNavComponent,
    LoaderComponent,
    SuccessModalComponent,
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
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
