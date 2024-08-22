import { Component, Input } from '@angular/core';
import { EmployeeParticipate } from '../../models/responses/employeeParticipate';

@Component({
  selector: 'participate-item',
  templateUrl: './participate-item.component.html',
  styleUrl: './participate-item.component.css'
})
export class ParticipateItemComponent {

  @Input() employeeParticipate :EmployeeParticipate 
  
  constructor(){}


}
