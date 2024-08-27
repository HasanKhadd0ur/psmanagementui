import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDefinitionComponent } from './pages/project-definition/project-definition.component';
import { ProjectTimeLineComponent } from './pages/project-time-line/project-time-line.component';
import { ProjectCompletionComponent } from './pages/project-completion/project-completion.component';

const routes: Routes = [
  {path: 'definition/:id',component:ProjectDefinitionComponent},
  {path: 'timeline/:id',component:ProjectTimeLineComponent},
  {path: 'completion/:id',component:ProjectCompletionComponent} 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
