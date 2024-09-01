import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../../models/responses/project';
import { UserService } from '../../../../core/services/authentication/user.service';
import { ROLES } from '../../../../core/constants/roles';

@Component({
  selector: 'info-controll',
  templateUrl: './info-controll.component.html',
  styleUrl: './info-controll.component.css'
})
export class InfoControllComponent {

  @Input() project : Project
  @Output() changeLeader = new EventEmitter<void>()
  @Output() changeManager = new EventEmitter<void>()

  constructor(
    private userService : UserService
  ){}

  onChangeManger(){
    this.changeManager.emit();
  }
  onChangeLeader(){
    this.changeLeader.emit();
  }
  canSee(): boolean {

    return this.userService.hasRole(ROLES.SCIENTIFIC_DEPUTY)
  }
      
}
