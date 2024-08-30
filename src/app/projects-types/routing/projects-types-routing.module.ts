import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypesDetailComponent } from '../pages/types-detail/types-detail.component';
import { TypesCreateComponent } from '../pages/types-create/types-create.component';
import { TypesListComponent } from '../pages/types-list/types-list.component';
import { ROLES } from '../../core/constants/roles';
import { RoleGuard } from '../../core/guards/role.guard';

const routes: Routes = [
  {path:'create',component:TypesCreateComponent , canActivate:[RoleGuard] ,  data: { roles: [ROLES.PROJECTS_PLANNER] }},
  {path:'detail/:id',component:TypesDetailComponent },
  {path:'',component:TypesListComponent},
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsTypesRoutingModule { }
