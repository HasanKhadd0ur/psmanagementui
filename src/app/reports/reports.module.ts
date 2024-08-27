import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ProjectDefinitionComponent } from './pages/project-definition/project-definition.component';
import { ProjectCompletionComponent } from './pages/project-completion/project-completion.component';
import { EmployeesTrackReportComponent } from './pages/employees-track-report/employees-track-report.component';
import { StepsTrackReportComponent } from './pages/steps-track-report/steps-track-report.component';
import { ProjectTrackHistoryComponent } from './pages/project-track-history/project-track-history.component';
import { ProjectTimeLineComponent } from './pages/project-time-line/project-time-line.component';
import { ProjectHeaderComponent } from './componenets/project-report-layout/project-header/project-header.component';
import { FinancialSpendTableComponent } from './componenets/financial-spend-table/financial-spend-table.component';
import { ParticipantsTableComponent } from './componenets/participants-table/participants-table.component';
import { ProjectFooterComponent } from './componenets/project-report-layout/project-footer/project-footer.component';
import { StepTableComponent } from './componenets/step-table/step-table.component';
import { SharedModule } from '../shared/shared.module';
import { GanttChartComponent } from './componenets/gantt-chart/gantt-chart.component';
import { ProjectSubjectiveComponent } from './componenets/project-report-layout/project-subjective/project-subjective.component';
import { EmployeeTrakTableComponent } from './componenets/tracks-components/employee-trak-table/employee-trak-table.component';
import { StepTrakTableComponent } from './componenets/tracks-components/step-trak-table/step-trak-table.component';
import { EmployeeContributionTableComponent } from './componenets/employee-contribution-table/employee-contribution-table.component';


@NgModule({
  declarations: [
    ProjectDefinitionComponent,
    ProjectCompletionComponent,
    EmployeesTrackReportComponent,
    StepsTrackReportComponent,
    ProjectTrackHistoryComponent,
    StepTableComponent,
    ParticipantsTableComponent,
    FinancialSpendTableComponent,
    ProjectFooterComponent,
    ProjectHeaderComponent,
    ProjectTimeLineComponent,
    GanttChartComponent,
    ProjectSubjectiveComponent,
    EmployeeTrakTableComponent,
    StepTrakTableComponent,
    EmployeeContributionTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
