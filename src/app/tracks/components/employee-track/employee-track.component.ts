import { Component, Input } from '@angular/core';
import { EmployeeTrack } from '../../models/responses/employeeTrack';

@Component({
  selector: 'employee-track',
  templateUrl: './employee-track.component.html',
  styleUrl: './employee-track.component.css'
})
export class EmployeeTrackComponent {

  @Input()  employeeTrack :EmployeeTrack 
}
