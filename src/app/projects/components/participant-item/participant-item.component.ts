import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeParticipate } from '../../../employees/models/responses/employeeParticipate';

@Component({
  selector: 'participant-item',
  templateUrl: './participant-item.component.html',
  styleUrl: './participant-item.component.css'
})
export class ParticipantItemComponent {
  @Input() participant : EmployeeParticipate 
  @Output() selected = new EventEmitter<EmployeeParticipate>()
  @Output() edit = new EventEmitter<EmployeeParticipate>()

  onSelected() {
    this.selected.emit(this.participant)
    }
  onEdit(){
    this.edit.emit(this.participant);
  }
    
    
}
