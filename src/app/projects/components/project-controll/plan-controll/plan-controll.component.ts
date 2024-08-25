import { Component, Input } from '@angular/core';
import { Project } from '../../../models/responses/project';

@Component({
  selector: 'plan-controll',
  templateUrl: './plan-controll.component.html',
  styleUrl: './plan-controll.component.css'
})
export class PlanControllComponent {

  @Input() project : Project 
}
