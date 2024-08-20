import { Component, Input } from '@angular/core';
import { Step } from '../../models/responses/Step';

@Component({
  selector: 'step-row-item',
  templateUrl: './step-row-item.component.html',
  styleUrl: './step-row-item.component.css'
})
export class StepRowItemComponent {

  @Input() step :Step
}
