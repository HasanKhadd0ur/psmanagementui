import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypesCreateComponent } from './pages/types-create/types-create.component';
import { TypesDetailComponent } from './pages/types-detail/types-detail.component';
import { TypesListComponent } from './pages/types-list/types-list.component';

const routes: Routes = [
  {path:'create',component:TypesCreateComponent},
  {path:'detail/:id',component:TypesDetailComponent},
  {path:'',component:TypesListComponent},
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsTypesRoutingModule { }
