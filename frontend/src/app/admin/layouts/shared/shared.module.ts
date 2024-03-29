import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';
// import { TranslateModule } from '@ngx-translate/core';

import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HorizontaltopbarComponent } from './horizontaltopbar/horizontaltopbar.component';
import { HorizontalnavbarComponent } from './horizontalnavbar/horizontalnavbar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [TopbarComponent, FooterComponent, SidebarComponent, HorizontaltopbarComponent, HorizontalnavbarComponent],
  imports: [
    CommonModule,
    NgScrollbarModule,
    /* TranslateModule,
    PerfectScrollbarModule,*/
    NgbDropdownModule,

    ClickOutsideModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [TopbarComponent, FooterComponent, SidebarComponent, HorizontaltopbarComponent, HorizontalnavbarComponent]
})
export class SharedModule { }
