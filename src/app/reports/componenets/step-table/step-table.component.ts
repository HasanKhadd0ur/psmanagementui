import { Component, Input } from '@angular/core';
import { Step } from '../../../projects/models/responses/Step';

@Component({
  selector: 'step-table',
  templateUrl: './step-table.component.html',
  styleUrl: './step-table.component.css'
})
export class StepTableComponent {

  @Input() steps : Step[]
}
