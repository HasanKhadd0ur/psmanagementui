import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectType } from '../../models/responses/projectType';



@Component({
  selector: 'type-item',
  templateUrl: './type-item.component.html',
  styleUrl: './type-item.component.css'
})
export class TypeItemComponent {
  @Input() item :ProjectType

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
 
  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
