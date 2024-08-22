import { Component } from '@angular/core';
import { EmployeesService } from '../../../employees/services/employees.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap } from 'rxjs';
import { Employee } from '../../../employees/models/responses/employee';
import { Result } from '../../../core/models/result';
import { Project } from '../../models/responses/project';
import { Customer } from '../../../customers/models/customer';
import { CustomerService } from '../../../customers/services/customer.service';
import { ProjectService } from '../../services/project.service';
import { CreateProjectRequest } from '../../models/requests/project-requests/createProjectRequest';
import { ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'project-create',
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {
  projectForm: FormGroup;
  filteredManagers: Observable<Employee[]>;
  filteredLeaders: Observable<Employee[]>;
  filteredCustomers: Observable<Customer[]>;

  projectManager :Employee 
  teamLeader :Employee 
  proposer :Customer
  request = new CreateProjectRequest()
  
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeesService,
    private customersService : CustomerService,
    private projectService :ProjectService,
    private toastr : ToastrService,
    private router :Router
  ) {}

  ngOnInit(): void {
    this.request= new CreateProjectRequest();
    this._buildFrom();

    this.projectForm.valueChanges.subscribe(values => {
      this.request = {
        ...this.request, // Preserve other properties
        ...values, // Overwrite properties with form values
        projectInfo: { ...this.request.projectInfo, ...values.projectInfo },
        financialFund: { ...this.request.financialFund, ...values.financialFund },
        projectAggreement: { ...this.request.projectAggreement, ...values.projectAggreement },
        projectClassification: { ...this.request.projectClassification, ...values.projectClassification },
      };
    });
    // Autocomplete for Project Manager
    this.filteredManagers = this.projectForm.get('projectManager')!.valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.employeeService.getByFilter(value))
    );

    // Autocomplete for Team Leader
    this.filteredLeaders = this.projectForm.get('teamLeader')!.valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.employeeService.getByFilter(value))
    );

    // Autocomplete for Customer
    this.filteredCustomers = this.projectForm.get('customer')!.valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.customersService.getCustomers())
    );
  }
  
  onManagerSelected(manager: Employee) {
    this.projectManager = manager;
    this.request.projectManagerId = manager.id;
    this.projectForm.get('projectManager')!.setValue(manager.personalInfo.firstName+" " + manager.personalInfo.lastName +" , "+manager.email , { emitEvent: false });
  }

  onLeaderSelected(leader: Employee) {
    this.teamLeader = leader;
    this.request.teamLeaderId = leader.id;
    this.projectForm.get('teamLeader')!.setValue(leader.personalInfo.firstName+" " + leader.personalInfo.lastName +" , "+leader.email , { emitEvent: false });
  }

  onCustomerSelected(customer: Customer) {
    this.proposer = customer;
    this.request.proposerId = customer.id;
    this.projectForm.get('customer')!.setValue(customer.customerName, { emitEvent: false });
  }

  onSubmit(request : CreateProjectRequest){

    console.log(request)
    debugger
    console.log(this.projectForm.errors)
    console.log(this.projectForm.valid)
  
    if(this.projectForm.valid){ 
      this.projectService.createProject(request).subscribe({

        next: (data)=>{
          this.toastr.success("تمت إضافة الجهة بنجاح")
          this.router.navigate(['/projects/detail/',data])

        }
        ,

        error:(err)=>{
          this.toastr.error("لقد حدث خطاء ما")
        }
      });
 
    }

  
      
  }

  _buildFrom(){
    this.projectForm = this.fb.group({
      projectManager: [''],
      teamLeader: [''],
      customer: [''],

      projectInfo: this.fb.group({
        name: ['',Validators.required],
        description: ['',Validators.required],
        code: ['', Validators.required],
        startDate: ['', Validators.required],
        expectedEndDate: ['', Validators.required],
      }),
      financialFund: this.fb.group({
        source: ['', Validators.required],
        financialStatus: ['', Validators.required],
      }),
      projectAggreement: this.fb.group({
        aggreementDate: ['', Validators.required],
        aggreementNumber: ['', Validators.required],
      }),
      proposalInfo: this.fb.group({
        proposingBookNumber :['', Validators.required],
        proposingBookDate :['', Validators.required]
      }),
      projectClassification: this.fb.group({
        projectStatus: ['', Validators.required],
        projectNature: ['', Validators.required],
        projectType: ['', Validators.required],
      }),
      executerId: ['', Validators.required],
    });
   

  }
}
