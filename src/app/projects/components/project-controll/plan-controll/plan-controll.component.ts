import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../../models/responses/project';

@Component({
  selector: 'plan-controll',
  templateUrl: './plan-controll.component.html',
  styleUrl: './plan-controll.component.css'
})
export class PlanControllComponent {
  @Input() project : Project 
  @Output() toProgress = new EventEmitter<void>()

  onMoveToProgress() {

    this.toProgress.emit();
  }
}
