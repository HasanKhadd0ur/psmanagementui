import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../models/responses/project';

@Component({
  selector: 'project-item',
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css'
})
export class ProjectItemComponent {

  @Input() project :Project
  constructor(   public router: Router){

  }
}
