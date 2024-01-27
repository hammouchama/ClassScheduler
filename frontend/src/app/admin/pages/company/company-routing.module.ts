import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {
    path: 'list',
    component: CompanyListComponent,
    canActivate: [AuthGuard],
    data: { role: ['Admin', 'Assistant'] },
  },
  {
    path: 'new',
    component: AddCompanyComponent,
    canActivate: [AuthGuard],
    data: { role: ['Admin', 'Assistant'] },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
