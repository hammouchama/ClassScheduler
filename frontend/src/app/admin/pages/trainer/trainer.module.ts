import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../../shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrainerRoutingModule } from './trainer-routing.module';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { TrainerListSortableDirective } from './trainer-list/trainer-list-sortable.directive';
import { DropzoneModule } from 'ngx-dropzone-wrapper';



@NgModule({
  declarations: [
    TrainerListComponent,
    TrainerListSortableDirective
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
    NgbModule,
    DropzoneModule,
    UiModule

  ],
  providers: [

  ],

})
export class TrainerModule { }
