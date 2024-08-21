import { Component, Input } from '@angular/core';
import { ProjectInfo } from '../../models/valueObjects/ProjectInfo';
import { ProposalInfo } from '../../models/valueObjects/proposalInfo';
import { Employee } from '../../../employees/models/responses/employee';

@Component({
  selector: 'project-header',
  templateUrl: './project-header.component.html',
  styleUrl: './project-header.component.css'
})
export class ProjectHeaderComponent {
  @Input() projectInfo :ProjectInfo
  
  
}
