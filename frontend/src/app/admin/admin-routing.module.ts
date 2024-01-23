import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* import { AuthGuard } from './core/guards/auth.guard'; */

import { LayoutComponent } from './layouts/layout/layout.component';
import { LayoutsModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';

const routes: Routes = [
  /* { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) }, */
  { path: '', component: LayoutComponent, loadChildren: () => PagesModule },
  /* { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule), canActivate: [AuthGuard] }, */
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LayoutsModule,
  ],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
