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

  canSee(){
    return this.ser.hasRole(ROLES.CUSTOMERS_PLANER)
  }
  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
