import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './user/home/home-main/home.component';
// import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SignInMainComponent } from './user/sign-in/sign-in-main/sign-in-main.component';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { UserRoutingModule } from './user/user-routing.module';

const routes: Routes = [
  { path: '', loadChildren: () => UserRoutingModule },
  { path: 'login', component: SignInMainComponent },
  {
    path: 'dashboard',
    loadChildren: () => AdminRoutingModule,
    canActivate: [AuthGuard],
    data: { role: ['Admin', 'Assistant'] },
  },
  /* {
    path: 'admin/assistant',
    component: ListAssistanComponent,
    canActivate: [AuthGuard],
    data: { role: 'Admin' },
  },
  {
    path: 'admin/assistant/info/:id',
    component: AssistantInfoComponent,
    canActivate: [AuthGuard],
    data: { role: 'Admin' },
  }, */
  { path: 'forbidden', component: ForbiddenComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
