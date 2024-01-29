import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyRoutingModule } from './company-routing.module';
import { UiModule } from '../../shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyListSortableDirective } from './company-list/company-list-sortable.directive';
import { UpdateCompanyComponent } from './update-company/update-company.component';


@NgModule({
  declarations: [
    AddCompanyComponent,
    CompanyListComponent,
    CompanyListSortableDirective,
    UpdateCompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
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
export class CompanyModule { }
