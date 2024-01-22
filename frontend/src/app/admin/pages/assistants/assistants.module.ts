import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UiModule } from '../../shared/ui/ui.module';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AssistantsRoutingModule } from './assistants-routing.module';
import { AdvancedSortableDirective } from './list-assistants/assistant-list-sortable.directive';
import { AssistantListComponent } from './list-assistants/assistant-list.component';


@NgModule({
  declarations: [AssistantListComponent, AdvancedSortableDirective],
  imports: [
    CommonModule,
    AssistantsRoutingModule,
    UiModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
  ]/* ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA], */
})
export class AssistantsModule {}
