import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiModule } from '../../shared/ui/ui.module';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormationsRoutingModule } from './formations-routing.module';
import { FormationListSortableDirective } from './formation-list/formation-list-sortable.directive';
import { FormationListComponent } from './formation-list/formation-list.component';
import { AddFormationComponent } from './add-formation/add-formation.component';


@NgModule({
  declarations: [
    FormationListComponent,
    FormationListSortableDirective,
    AddFormationComponent,
  ],
  imports: [
    CommonModule,
    FormationsRoutingModule,
    UiModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormationsModule {}
