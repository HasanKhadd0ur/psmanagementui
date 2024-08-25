import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectType } from '../../models/responses/projectType';

@Component({
  selector: 'edit-type-modal',
  templateUrl: './edit-type-modal.component.html',
  styleUrl: './edit-type-modal.component.css'
})
export class EditTypeModalComponent {

  @Input() selectedItem : ProjectType
  @Output() submit = new EventEmitter<ProjectType>();

  constructor(){}

  saveType(){
    this.submit.emit(this.selectedItem);
    
  }
}
