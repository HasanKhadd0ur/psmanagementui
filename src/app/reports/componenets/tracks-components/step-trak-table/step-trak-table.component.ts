import { Component, Input } from '@angular/core';
import { StepTrack } from '../../../../tracks/models/responses/steptrack';

@Component({
  selector: 'step-trak-table',
  templateUrl: './step-trak-table.component.html',
  styleUrl: './step-trak-table.component.css'
})
export class StepTrakTableComponent {

  @Input() stepsTrack :StepTrack[]
}
