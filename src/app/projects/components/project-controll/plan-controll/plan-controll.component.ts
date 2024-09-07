import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../../models/responses/project';
import { UserService } from '../../../../core/services/authentication/user.service';
import { ROLES } from '../../../../core/constants/roles';

@Component({
  selector: 'plan-controll',
  templateUrl: './plan-controll.component.html',
  styleUrl: './plan-controll.component.css'
})
export class PlanControllComponent {
  @Input() project : Project 
  @Output() toProgress = new EventEmitter<void>()

  constructor(

    private userService : UserService
  ){}
  onMoveToProgress() {

    this.toProgress.emit();
  }

  canEdit(): boolean {

    return this.userService.hasRole(ROLES.SCIENTIFIC_DEPUTY)
  }
  canSee(): boolean {

    return this.project.projectManagerId== this.userService.getEmployeeId()
    ||
    this.project.teamLeaderId== this.userService.getEmployeeId();
    
  }
}
