import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTrackHistoryComponent } from '../pages/employee-track-history/employee-track-history.component';
import { ProjectTrackHistoryComponent } from '../pages/project-track-history/project-track-history.component';
import { StepTrackHistoryComponent } from '../pages/step-track-history/step-track-history.component';
import { TrackDetailsComponent } from '../pages/track-details/track-details.component';
import { TracksListComponent } from '../pages/tracks-list/tracks-list.component';
import { TracksUncompleteComponent } from '../pages/tracks-uncomplete/tracks-uncomplete.component';
import { ROLES } from '../../core/constants/roles';
import { RoleGuard } from '../../core/guards/role.guard';
const routes: Routes = [

  {path:'project/:id',component:ProjectTrackHistoryComponent},
  {path:'detail/:id',component:TrackDetailsComponent},
  {path:'history/step/:id',component:StepTrackHistoryComponent}  ,
  {path:'project/:projectId/employee/:employeeId',component:EmployeeTrackHistoryComponent},
  {path:'uncompleted',component:TracksUncompleteComponent,canActivate:[RoleGuard] ,  data: { roles: [ROLES.SCIENTIFIC_DEPUTY] }} ,
  {path:'',component:TracksListComponent,canActivate:[RoleGuard] ,  data: { roles: [ROLES.SCIENTIFIC_DEPUTY] }} 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracksRoutingModule { }
