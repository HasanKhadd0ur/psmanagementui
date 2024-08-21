import { Component } from '@angular/core';
import { EmployeesService } from '../../../employees/services/employees.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { Employee } from '../../../employees/models/responses/employee';
import { Result } from '../../../core/models/result';

@Component({
  selector: 'project-create',
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {
  projectForm: FormGroup;
  filteredEmployees: any[] = [];

  constructor(private employeeService: EmployeesService) {}

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectName: new FormControl(''),
      projectManager: new FormControl('')
    });

    // Watch the projectManager field for changes and fetch matching employees
    this.projectForm.get('projectManager').valueChanges.pipe(
      debounceTime(300), // Wait for user to stop typing
      switchMap(value => this.employeeService.getAvailableEmployees()) // Call the service
    ).subscribe(employees => this.filteredEmployees = employees.value);
  }

  selectManager(employee: any): void {
    this.projectForm.get('projectManager').setValue(employee.fullName);
    this.filteredEmployees = [];
  }
}
