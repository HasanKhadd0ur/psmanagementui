import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTrackHistoryComponent } from '../../tracks/pages/employee-track-history/employee-track-history.component';
import { EmployeesTrackReportComponent } from '../pages/employees-track-report/employees-track-report.component';
import { ProjectCompletionComponent } from '../pages/project-completion/project-completion.component';
import { ProjectDefinitionComponent } from '../pages/project-definition/project-definition.component';
import { ProjectTimeLineComponent } from '../pages/project-time-line/project-time-line.component';
import { ProjectTrackHistoryComponent } from '../pages/project-track-history/project-track-history.component';
import { StepsTrackReportComponent } from '../pages/steps-track-report/steps-track-report.component';
import { EmployeeWorkTrackComponent } from '../pages/employee-work-track/employee-work-track.component';
import { StepTrackReportComponent } from '../pages/step-track-report/step-track-report.component';
import { AnnualSpendReportComponent } from '../pages/annual-spend-report/annual-spend-report.component';

const routes: Routes = [
  {path: 'definition/:id',component:ProjectDefinitionComponent},
  {path: 'timeline/:id',component:ProjectTimeLineComponent},
  {path: 'completion/:id',component:ProjectCompletionComponent}, 
  {path: 'employees-tracks/:projectId/track/:id',component:EmployeesTrackReportComponent} ,
  {path: 'steps-tracks/:projectId/track/:id',component:StepsTrackReportComponent}, 
  {path: 'history/:projectId',component:ProjectTrackHistoryComponent} ,
  {path: 'contributions/:projectId/employee/:employeeId',component:EmployeeWorkTrackComponent} ,
  {path: 'history/:projectId/step/:stepId',component:StepTrackReportComponent} ,
  {path: 'spends/:id',component:AnnualSpendReportComponent} 
  

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
