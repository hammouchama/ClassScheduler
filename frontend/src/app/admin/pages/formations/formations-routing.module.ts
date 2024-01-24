import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { BasicComponent } from './basic/basic.component';
import { FormationListComponent } from './formation-list/formation-list.component';
import { AddFormationComponent } from './add-formation/add-formation.component';

const routes: Routes = [
  {
    path: 'list',
    component: FormationListComponent,
  },
  {
    path: 'new',
    component: AddFormationComponent,
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormationsRoutingModule { }
