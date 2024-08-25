import { Component, Input } from '@angular/core';
import { Project } from '../../../models/responses/project';

@Component({
  selector: 'track-controll',
  templateUrl: './track-controll.component.html',
  styleUrl: './track-controll.component.css'
})
export class TrackControllComponent {

  @Input() project : Project
}
