import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { BasicComponent } from './basic/basic.component';
import { FormationListComponent } from './formation-list/formation-list.component';
import { AddFormationComponent } from './add-formation/add-formation.component';
import { UpdateFormationComponent } from './update-formation/update-formation.component';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {
    path: 'list',
    component: FormationListComponent,
    canActivate: [AuthGuard],
    data: { role: ['Admin'] },
  },
  {
    path: 'new',
    component: AddFormationComponent,
    canActivate: [AuthGuard],
    data: { role: ['Admin'] },
  },
  {
    path: 'update/:id',
    component: UpdateFormationComponent,
    canActivate: [AuthGuard],
    data: { role: ['Admin'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationsRoutingModule { }
