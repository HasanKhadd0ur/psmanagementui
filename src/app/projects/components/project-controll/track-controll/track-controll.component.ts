import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../../models/responses/project';
import { UserService } from '../../../../core/services/authentication/user.service';
import { ROLES } from '../../../../core/constants/roles';

@Component({
  selector: 'track-controll',
  templateUrl: './track-controll.component.html',
  styleUrl: './track-controll.component.css'
})
export class TrackControllComponent {

  @Input() project : Project
  @Output() complete = new EventEmitter();
  @Output() replan = new EventEmitter();
  

  constructor(

    private userService :UserService

  ){}
  onComplete(){
    this.complete.emit();
  }
  onReplan(){
    
    this.replan.emit();

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
