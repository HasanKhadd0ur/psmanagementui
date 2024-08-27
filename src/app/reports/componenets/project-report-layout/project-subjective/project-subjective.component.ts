import { Component, Input } from '@angular/core';
import { Project } from '../../../../projects/models/responses/project';

@Component({
  selector: 'project-subjective',
  templateUrl: './project-subjective.component.html',
  styleUrl: './project-subjective.component.css'
})
export class ProjectSubjectiveComponent {
  @Input() project : Project
  
}
