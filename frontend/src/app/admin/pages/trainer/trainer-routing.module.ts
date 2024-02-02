import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { TrainerInfoComponent } from './trainer-info/trainer-info.component';
const routes: Routes = [
  {
    path: 'list',
    component: TrainerListComponent,
    canActivate: [AuthGuard],
    data: { role: ['Admin'] },
  },
  // {
  //   path: 'new',
  //   component: AddTrainerComponent,
  //   canActivate: [AuthGuard],
  //   data: { role: ['Admin', 'Assistant'] },
  // },
  {
    path: 'view/:id',
    component: TrainerInfoComponent,
    canActivate: [AuthGuard],
    data: { role: ['Admin', 'Assistant'] },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { }
