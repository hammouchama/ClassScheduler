import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { BasicComponent } from './basic/basic.component';
import { AssistantListComponent } from './list-assistants/assistant-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: AssistantListComponent,
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssistantsRoutingModule { }
