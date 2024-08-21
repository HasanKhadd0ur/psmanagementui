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

@NgModule({
  declarations: [
    ProjectItemComponent,
    AttachmentComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    StepRowItemComponent,
    ProjectHeaderComponent,
    ProjectCreateComponent
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
