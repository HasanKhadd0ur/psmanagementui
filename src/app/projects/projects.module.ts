import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { AttachmentComponent } from './components/attachment/attachment.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';
import { StepRowItemComponent } from './components/step-row-item/step-row-item.component';
import { ProjectHeaderComponent } from './components/project-header/project-header.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import {  MatCommonModule, MatOption, MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ProjectService } from './services/project.service';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ProjectAttachmentsComponent } from './pages/project-attachments/project-attachments.component';
import { StepTableComponent } from './components/step-table/step-table.component';
import { ParticipantsTableComponent } from './components/participants-table/participants-table.component';
import { FinancialSpendTableComponent } from './components/financial-spend-table/financial-spend-table.component';
import { ProjectFooterComponent } from './components/project-footer/project-footer.component';
import { StepListComponent } from './pages/step-list/step-list.component';
import { ParticipantsListComponent } from './pages/participants-list/participants-list.component';
import { ParticipantItemComponent } from './components/participant-item/participant-item.component';
import { PlanControllComponent } from './components/project-controll/plan-controll/plan-controll.component';
import { TrackControllComponent } from './components/project-controll/track-controll/track-controll.component';
import { InfoControllComponent } from './components/project-controll/info-controll/info-controll.component';

@NgModule({
  declarations: [
    ProjectItemComponent,
    AttachmentComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    StepRowItemComponent,
    ProjectHeaderComponent,
    ProjectCreateComponent,
    ProjectAttachmentsComponent,
    StepTableComponent,
    ParticipantsTableComponent,
    FinancialSpendTableComponent,
    ProjectFooterComponent,
    StepListComponent,
    ParticipantsListComponent,
    ParticipantItemComponent,
    PlanControllComponent,
    TrackControllComponent,
    InfoControllComponent
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

    MatInputModule,
    ReactiveFormsModule ,
    SharedModule
  ]
})
export class ProjectsModule { }
