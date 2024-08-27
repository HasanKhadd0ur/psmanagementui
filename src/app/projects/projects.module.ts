import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';
import { StepRowItemComponent } from './components/step-row-item/step-row-item.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import {  MatCommonModule, MatOption, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ProjectService } from './services/project.service';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ProjectAttachmentsComponent } from './pages/project-attachments/project-attachments.component';
import { StepListComponent } from './pages/step-list/step-list.component';
import { ParticipantsListComponent } from './pages/participants-list/participants-list.component';
import { ParticipantItemComponent } from './components/participant-item/participant-item.component';
import { PlanControllComponent } from './components/project-controll/plan-controll/plan-controll.component';
import { TrackControllComponent } from './components/project-controll/track-controll/track-controll.component';
import { InfoControllComponent } from './components/project-controll/info-controll/info-controll.component';
import { RouterModule } from '@angular/router';
import { AddStepModalComponent } from './components/modals/add-step-modal/add-step-modal.component';
import { AddFinancialSpendModalComponent } from './components/modals/add-financial-spend-modal/add-financial-spend-modal.component';
import { AddAttachmentModalComponent } from './components/modals/add-attachment-modal/add-attachment-modal.component';
import { FinancialSpendingComponent } from './pages/financial-spending/financial-spending.component';
import { FinancialItemComponent } from './components/financial-item/financial-item.component';
import { ReportControllComponent } from './components/project-controll/report-controll/report-controll.component';
import { AddParticipantModalComponent } from './components/modals/add-participant-modal/add-participant-modal.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { EditParticipantModalComponent } from './components/modals/edit-participant-modal/edit-participant-modal.component';
import { RemoveParticipantModalComponent } from './components/modals/remove-participant-modal/remove-participant-modal.component';
import { ParticipantChangesComponent } from './pages/participant-changes/participant-changes.component';
import { AttahmentItemComponent } from './components/attahment-item/attahment-item.component';
import { RemoveAttachmentModalComponent } from './components/modals/remove-attachment-modal/remove-attachment-modal.component';

@NgModule({
  declarations: [
    ProjectItemComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    StepRowItemComponent,
    ProjectCreateComponent,
    ProjectAttachmentsComponent,
    StepListComponent,
    ParticipantsListComponent,
    ParticipantItemComponent,
    PlanControllComponent,
    TrackControllComponent,
    InfoControllComponent,
    AddStepModalComponent,
    AddFinancialSpendModalComponent,
    AddAttachmentModalComponent,
    FinancialSpendingComponent,
    FinancialItemComponent,
    ReportControllComponent,
    AddParticipantModalComponent,
    EditParticipantModalComponent,
    RemoveParticipantModalComponent,
    ParticipantChangesComponent,
    AttahmentItemComponent,
    RemoveAttachmentModalComponent
  ],
  providers: [
    ProjectService,
    provideNativeDateAdapter()
  ],
  exports:[
    ProjectRoutingModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCommonModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    RouterModule ,
    MatInputModule,
    ReactiveFormsModule ,
    SharedModule,
    NgbTypeaheadModule
  ]
})
export class ProjectsModule { }
