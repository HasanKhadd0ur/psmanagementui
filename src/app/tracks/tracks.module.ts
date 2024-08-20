import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';
import { TracksComponent } from './pages/tracks/tracks.component';
import { TrackDetailsComponent } from './pages/track-details/track-details.component';
import { TracCreateComponent } from './pages/trac-create/trac-create.component';
import { StepTrackComponent } from './components/step-track/step-track.component';
import { EmployeeTrackComponent } from './components/employee-track/employee-track.component';
import { StepTrackDetailsComponent } from './pages/step-track-details/step-track-details.component';
import { ProjectTrackHistoryComponent } from './pages/project-track-history/project-track-history.component';


@NgModule({
  declarations: [
    TracksComponent,
    TrackDetailsComponent,
    TracCreateComponent,
    StepTrackComponent,
    EmployeeTrackComponent,
    StepTrackDetailsComponent,
    ProjectTrackHistoryComponent
  ],
  imports: [
    CommonModule,
    TracksRoutingModule
  ]
})
export class TracksModule { }
