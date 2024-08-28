import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../../models/responses/project';

@Component({
  selector: 'info-controll',
  templateUrl: './info-controll.component.html',
  styleUrl: './info-controll.component.css'
})
export class InfoControllComponent {
  @Input() project : Project
  @Output() changeLeader = new EventEmitter<void>()
  @Output() changeManager = new EventEmitter<void>()


  onChangeManger(){
    this.changeManager.emit();
  }
  onChangeLeader(){
    this.changeLeader.emit();
  }
  
}
