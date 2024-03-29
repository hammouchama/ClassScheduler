import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
/* import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { KanbanComponent } from './kanban/kanban.component'; */

const routes: Routes = [
    { path: '', component: DashboardComponent },
    {
        path: 'calendar', component: CalendarComponent,
        canActivate: [AuthGuard],
        data: { role: ['Admin', 'Assistant'] },
    },
    {
        path: 'assistants', loadChildren: () => import('./assistants/assistants.module').then(m => m.AssistantsModule),
        canActivate: [AuthGuard],
        data: { role: ['Admin'] },
    },
    {
        path: 'formations', loadChildren: () => import('./formations/formations.module').then(m => m.FormationsModule),
        canActivate: [AuthGuard],
        data: { role: ['Admin'] },
    },
    {
        path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
        canActivate: [AuthGuard],
        data: { role: ['Admin', 'Assistant'] },
    },
    {
        path: 'trainer', loadChildren: () => import('./trainer/trainer.module').then(m => m.TrainerModule),
        canActivate: [AuthGuard],
        data: { role: ['Admin', 'Assistant'] },
    },
    //  { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UIModule) },
    //  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
    /*{ path: 'chat', component: ChatComponent },
    { path: 'kanban-board', component: KanbanComponent }, */
    /*     { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
        { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
        { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
    
        { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
        { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
        { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
    
        { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) }, */
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
