import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';


const routes: Routes = [
  {path:'',component :ProjectListComponent},
  { path: 'detail/:id', component: ProjectDetailsComponent },
  { path: 'create', component: ProjectCreateComponent }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
