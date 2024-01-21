import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiModule } from '../shared/ui/ui.module';

import { PagesRoutingModule } from './pages-routing.module';

import { NgbNavModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FullCalendarModule } from '@fullcalendar/angular';
// import { DndModule } from 'ngx-drag-drop';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { WidgetModule } from "../shared/widget/widget.module";
import { UIModule } from './ui/ui.module';
// import { ChatComponent } from './chat/chat.component';
// import { EcommerceModule } from './ecommerce/ecommerce.module';
// import { KanbanComponent } from './kanban/kanban.component';
// import { EmailModule } from './email/email.module';
// import { IconsModule } from './icons/icons.module';
// import { ChartModule } from './chart/chart.module';
// import { FormModule } from './form/form.module';
import { TablesModule } from './tables/tables.module';
// import { MapsModule } from './maps/maps.module';


@NgModule({
  declarations: [
    DashboardComponent,
    CalendarComponent /*  ChatComponent, KanbanComponent, */,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    UiModule,
    NgApexchartsModule,
    NgScrollbarModule,
    LeafletModule,
    WidgetModule,
    FullCalendarModule,
    UIModule,
    TablesModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbTooltipModule
  ],
})
export class PagesModule {}
