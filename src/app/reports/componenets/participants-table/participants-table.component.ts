import { Component, Input } from '@angular/core';
import { EmployeeParticipate } from '../../../employees/models/responses/employeeParticipate';

@Component({
  selector: 'participants-table',
  templateUrl: './participants-table.component.html',
  styleUrl: './participants-table.component.css'
})
export class ParticipantsTableComponent {

  @Input() employeeParticipates : EmployeeParticipate[]
}
