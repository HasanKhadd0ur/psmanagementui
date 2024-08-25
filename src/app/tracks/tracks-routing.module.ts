import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TracksListComponent } from './pages/tracks-list/tracks-list.component';
import { TrackDetailsComponent } from './pages/track-details/track-details.component';
import { StepTrackHistoryComponent } from './pages/step-track-history/step-track-history.component';
import { EmployeeTrackHistoryComponent } from './pages/employee-track-history/employee-track-history.component';

const routes: Routes = [

  {path:'project/:id',component:TracksListComponent},
  {path:'detail/:id',component:TrackDetailsComponent},
  {path:'history/step/:id',component:StepTrackHistoryComponent}  ,
  {path:'project/:projectId/employee/:employeeId',component:EmployeeTrackHistoryComponent}  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracksRoutingModule { }
