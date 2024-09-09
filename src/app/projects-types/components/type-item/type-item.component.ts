import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectType } from '../../models/responses/projectType';
import { UserService } from '../../../core/services/authentication/user.service';
import { ROLES } from '../../../core/constants/roles';



@Component({
  selector: 'type-item',
  templateUrl: './type-item.component.html',
  styleUrl: './type-item.component.css'
})
export class TypeItemComponent {
  @Input() item :ProjectType

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
 
  constructor(
    private ser : UserService
  ){}

  onEdit() {
    this.edit.emit();
  }
  
  canEdit(): boolean {
    return this.ser.hasRole(ROLES.PROJECTS_PLANNER);
  }


  onDelete() {
    this.delete.emit();
  }
}
