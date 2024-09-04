import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Step } from '../../../models/responses/Step';

@Component({
  selector: 'step-row-item',
  templateUrl: './step-row-item.component.html',
  styleUrl: './step-row-item.component.css'
})
export class StepRowItemComponent {

  @Input() step :Step
  @Input() canSee :boolean
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Step>();
  @Output() changeWeight = new EventEmitter<Step>();
  
  onDelete() {
    this.delete.emit();
  } 

  onChangeWeight(){
    this.changeWeight.emit(this.step);
  }

  onEdit(){
    this.edit.emit(this.step);
  }
}
