import { Component, Input } from '@angular/core';
import { EmployeeParticipate } from '../../../employees/models/responses/employeeParticipate';

@Component({
  selector: 'participant-item',
  templateUrl: './participant-item.component.html',
  styleUrl: './participant-item.component.css'
})
export class ParticipantItemComponent {

  @Input() participant : EmployeeParticipate 
}
