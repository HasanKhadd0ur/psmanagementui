import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StepTrack } from '../../models/responses/steptrack';

@Component({
  selector: 'step-track',
  templateUrl: './step-track.component.html',
  styleUrl: './step-track.component.css'
})
export class StepTrackComponent {

  @Input() projectId : number 
  @Input() stepTrack :StepTrack
  @Output() edit = new EventEmitter<StepTrack>();

  onEdit(){

    this.edit.emit(this.stepTrack);
  }
}
