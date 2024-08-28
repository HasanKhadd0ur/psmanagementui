import { Component, Input } from '@angular/core';
import { EmployeeTrack } from '../../../../tracks/models/responses/employeeTrack';

@Component({
  selector: 'employee-trak-table',
  templateUrl: './employee-trak-table.component.html',
  styleUrl: './employee-trak-table.component.css'
})
export class EmployeeTrakTableComponent {

  @Input() employeeTrack  : EmployeeTrack[]
}
