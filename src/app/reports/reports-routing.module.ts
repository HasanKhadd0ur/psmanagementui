import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDefinitionComponent } from './pages/project-definition/project-definition.component';

const routes: Routes = [
  {path: 'definition/:id',component:ProjectDefinitionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
