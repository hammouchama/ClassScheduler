import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiModule } from '../../shared/ui/ui.module';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AssistantsRoutingModule } from './assistants-routing.module';
import { AssistantListSortableDirective } from './list-assistants/assistant-list-sortable.directive';
import { AssistantListComponent } from './list-assistants/assistant-list.component';
import { AssistantInfoComponent } from './assistant-info/assistant-info.component';
import { UiSwitchModule } from 'ngx-ui-switch';


@NgModule({
  declarations: [
    AssistantListComponent,
    AssistantListSortableDirective,
    AssistantInfoComponent,
  ],
  imports: [
    CommonModule,
    AssistantsRoutingModule,
    UiModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AssistantsModule {}
