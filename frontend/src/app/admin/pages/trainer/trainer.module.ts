import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../../shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrainerRoutingModule } from './trainer-routing.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbModule

  ],
  providers: [

  ],

})
export class TrainerModule { }
