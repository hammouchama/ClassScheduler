import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AssistantComponent } from './assistant/assistant.component';
import { AuthGuard } from './auth/auth.guard';
import { ListAssistanComponent } from './admin/list-assistan/list-assistan.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AssistantInfoComponent } from './admin/assistant-info/assistant-info.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/assistant', component: ListAssistanComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/assistant/info/:id', component: AssistantInfoComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'forbidden', component: ForbiddenComponent },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
