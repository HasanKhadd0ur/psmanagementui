import { Component, Input } from '@angular/core';
import { EmployeeTrack } from '../../../models/responses/employeeTrack';

@Component({
  selector: 'employee-history-item',
  templateUrl: './employee-history-item.component.html',
  styleUrl: './employee-history-item.component.css'
})
export class EmployeeHistoryItemComponent {
  @Input() empoyeeTrack :EmployeeTrack

}
