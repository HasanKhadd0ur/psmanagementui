import { Component, Input } from '@angular/core';
import { StepTrack } from '../../../models/responses/steptrack';

@Component({
  selector: 'step-history-item',
  templateUrl: './step-history-item.component.html',
  styleUrl: './step-history-item.component.css'
})
export class StepHistoryItemComponent {
  @Input() stepTrack :StepTrack
}
