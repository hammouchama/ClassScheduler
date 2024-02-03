import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/auth/auth.guard';
import { HomeComponent } from './home/home-main/home.component';
import { ApplyTrainerMainComponent } from './apply-trainer/apply-trainer-main/apply-trainer-main.component';
import { FormationListMainComponent } from './formation-list/formation-list-main/formation-list-main.component';
import { FormationDetailsComponent } from './formation-details/formation-details-main/formation-details.component';
import { EnrollIndividualMainComponent } from './enroll-individual/enroll-individual-main/enroll-individual-main.component';
/* import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { KanbanComponent } from './kanban/kanban.component'; */

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'apply-trainer', component: ApplyTrainerMainComponent },
  { path: 'formations', component: FormationListMainComponent },
  { path: 'formation/:slug', component: FormationDetailsComponent },
  { path: 'formation/:slug/enroll', component: EnrollIndividualMainComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
