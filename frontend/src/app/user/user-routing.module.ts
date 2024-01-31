import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/auth/auth.guard';
import { HomeComponent } from './home/home-main/home.component';
import { ApplyTrainerMainComponent } from './apply-trainer/apply-trainer-main/apply-trainer-main.component';
/* import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { KanbanComponent } from './kanban/kanban.component'; */

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'apply-trainer', component: ApplyTrainerMainComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
