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
import { DropzoneModule, DROPZONE_CONFIG , DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgSelectModule } from '@ng-select/ng-select';
import { UpdateFormationComponent } from './update-formation/update-formation.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  /* url: 'https://httpbin.org/post', */
  maxFilesize: 10,
  maxFiles: 1, // Allow only one file
  acceptedFiles: 'image/*',
  addRemoveLinks: true, // Show remove links
  createImageThumbnails: true,
  url: '/',
  previewsContainer: false,
  autoReset: null,
  errorReset: null,
  cancelReset: null,
  autoQueue: false,
};

@NgModule({
  declarations: [
    FormationListComponent,
    FormationListSortableDirective,
    AddFormationComponent,
    UpdateFormationComponent,
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
    DropzoneModule,
    UiSwitchModule,
    NgSelectModule,
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormationsModule {}
