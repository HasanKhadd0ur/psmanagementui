import { Component, Input } from '@angular/core';
import { Project } from '../../../../projects/models/responses/project';

@Component({
  selector: 'project-subjectiv-unformal',
  templateUrl: './project-subjectiv-unformal.component.html',
  styleUrl: './project-subjectiv-unformal.component.css'
})
export class ProjectSubjectivUnformalComponent {
  @Input() project : Project
}
