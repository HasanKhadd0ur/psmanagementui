import { Component, Input } from '@angular/core';
import { Customer } from '../../../customers/models/customer';
import { Employee } from '../../../employees/models/responses/employee';
import { Department } from '../../models/responses/Department';

@Component({
  selector: 'project-footer',
  templateUrl: './project-footer.component.html',
  styleUrl: './project-footer.component.css'
})
export class ProjectFooterComponent {
@Input() proposer : Customer ;
@Input() projectManager : Employee 
@Input() teamLeader : Employee 
@Input() executer : Department
}
