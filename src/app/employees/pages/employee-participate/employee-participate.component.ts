import { Component, Input } from '@angular/core';
import { EmployeeParticipate } from '../../models/responses/employeeParticipate';

@Component({
  selector: 'employee-participate',
  templateUrl: './employee-participate.component.html',
  styleUrl: './employee-participate.component.css'
})
export class EmployeeParticipateComponent {

  @Input() employeeParticipate :EmployeeParticipate 
  
  constructor(){}

  
}
