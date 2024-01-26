import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { BasicComponent } from './basic/basic.component';
import { AssistantListComponent } from './list-assistants/assistant-list.component';
import { AssistantInfoComponent } from './assistant-info/assistant-info.component';

const routes: Routes = [
  {
    path: 'list',
    component: AssistantListComponent,
  },
  {
    path: 'new',
    component: AssistantInfoComponent,
  },
  {
    path: 'update/:id',
    component: AssistantInfoComponent,
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssistantsRoutingModule { }
