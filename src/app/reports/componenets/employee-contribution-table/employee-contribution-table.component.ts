import { Component, Input } from '@angular/core';
import { EmployeeContribution } from '../../../projects/models/responses/employeeContribution';

@Component({
  selector: 'employee-contribution-table',
  templateUrl: './employee-contribution-table.component.html',
  styleUrl: './employee-contribution-table.component.css'
})
export class EmployeeContributionTableComponent {
  @Input() contributers  :EmployeeContribution[] 
}
