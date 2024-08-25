import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';
import { TracksListComponent } from './pages/tracks-list/tracks-list.component';
import { TrackDetailsComponent } from './pages/track-details/track-details.component';
import { StepTrackComponent } from './components/step-track/step-track.component';
import { EmployeeTrackComponent } from './components/employee-track/employee-track.component';
import { ProjectTrackHistoryComponent } from './pages/project-track-history/project-track-history.component';
import { StepTrackHistoryComponent } from './pages/step-track-history/step-track-history.component';
import { EmployeeTrackHistoryComponent } from './pages/employee-track-history/employee-track-history.component';
import { AddTrackModalComponent } from './components/modals/add-track-modal/add-track-modal.component';
import { AddStepTrackModalComponent } from './components/modals/add-step-track-modal/add-step-track-modal.component';
import { AddEmployeeTrackModalComponent } from './components/modals/add-employee-track-modal/add-employee-track-modal.component';
import { TrackItemComponent } from './components/track-item/track-item.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCommonModule, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StepHistoryItemComponent } from './components/history/step-history-item/step-history-item.component';
import { EmployeeHistoryItemComponent } from './components/history/employee-history-item/employee-history-item.component';
import { StateTranslatePipe } from '../shared/pipes/stateTranslate/state-translate.pipe';
import { TracksUncompleteComponent } from './pages/tracks-uncomplete/tracks-uncomplete.component';


@NgModule({
  declarations: [
    TracksListComponent,
    TrackDetailsComponent,
    StepTrackComponent,
    EmployeeTrackComponent,
    ProjectTrackHistoryComponent,
    StepTrackHistoryComponent,
    EmployeeTrackHistoryComponent,
    AddTrackModalComponent,
    AddStepTrackModalComponent,
    AddEmployeeTrackModalComponent,
    TrackItemComponent,
    StepHistoryItemComponent,
    EmployeeHistoryItemComponent,
    TracksUncompleteComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCommonModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    RouterModule ,
    MatInputModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    FormsModule,
    TracksRoutingModule
  ],
  providers: [    provideNativeDateAdapter()]
})
export class TracksModule { }
