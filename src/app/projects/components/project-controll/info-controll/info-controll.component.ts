import { Component, Input } from '@angular/core';
import { Project } from '../../../models/responses/project';

@Component({
  selector: 'info-controll',
  templateUrl: './info-controll.component.html',
  styleUrl: './info-controll.component.css'
})
export class InfoControllComponent {
@Input() project : Project
}
