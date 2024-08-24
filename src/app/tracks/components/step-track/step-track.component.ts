import { Component, Input } from '@angular/core';
import { StepTrack } from '../../models/responses/steptrack';

@Component({
  selector: 'step-track',
  templateUrl: './step-track.component.html',
  styleUrl: './step-track.component.css'
})
export class StepTrackComponent {

  @Input() stepTrack :StepTrack
}
