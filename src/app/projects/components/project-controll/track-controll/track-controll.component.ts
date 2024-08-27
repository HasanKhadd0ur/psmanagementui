import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../../models/responses/project';

@Component({
  selector: 'track-controll',
  templateUrl: './track-controll.component.html',
  styleUrl: './track-controll.component.css'
})
export class TrackControllComponent {

  @Input() project : Project
  @Output() complete = new EventEmitter();
  @Output() replan = new EventEmitter();
  

  onComplete(){
    this.complete.emit();
  }
  onReplan(){
    
    this.replan.emit();

  }
}
