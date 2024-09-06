import { Component, Input } from '@angular/core';
import { EmployeeTrack } from '../../../models/responses/employeeTrack';
import { UserService } from '../../../../core/services/authentication/user.service';
import { ROLES } from '../../../../core/constants/roles';

@Component({
  selector: 'employee-history-item',
  templateUrl: './employee-history-item.component.html',
  styleUrl: './employee-history-item.component.css'
})
export class EmployeeHistoryItemComponent {
  @Input() empoyeeTrack :EmployeeTrack

  constructor(

    private userService : UserService
  ){}

  canSee(): any {
    return this.userService.hasRole(ROLES.SCIENTIFIC_DEPUTY)||this.empoyeeTrack.employeeId==this.userService.getEmployeeId();
  }
    
}
