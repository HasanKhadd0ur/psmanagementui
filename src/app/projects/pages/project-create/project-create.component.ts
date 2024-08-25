//#region  imports 
import { Component } from '@angular/core';
import { EmployeesService } from '../../../employees/services/employees.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap } from 'rxjs';
import { Employee } from '../../../employees/models/responses/employee';
import { Customer } from '../../../customers/models/customer';
import { CustomerService } from '../../../customers/services/customer.service';
import { ProjectService } from '../../services/project.service';
import { CreateProjectRequest } from '../../models/requests/project-requests/createProjectRequest';
import { ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Department } from '../../models/responses/Department';
import { ProjectType } from '../../../projects-types/models/responses/projectType';
import { ProjectsTypesService } from '../../../projects-types/services/projects-types.service';
//#endregion imports


@Component({
  selector: 'project-create',
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {

  //#region  Forms and Filters 

  projectForm: FormGroup;
  filteredManagers: Observable<Employee[]>;
  filteredLeaders: Observable<Employee[]>;
  filteredCustomers: Observable<Customer[]>;

  //#endregion Forms and Filters 

  //#region  Selection options 
  departments: Department[]
  types : ProjectType[]

  projectManager :Employee 
  teamLeader :Employee 
  proposer :Customer
  
  //#endregion Selection options

  //#region Project request 

  request = new CreateProjectRequest()
  
  //#endregion Project request 
  
  //#region  Constructor 
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeesService,
    private customersService : CustomerService,
    private typesService : ProjectsTypesService,
    private projectService :ProjectService,
    private toastr : ToastrService,
    private router :Router
  ) {}

  //#endregion Constructor 
  

  //#region  On init 
  
  ngOnInit(): void {

    this.request= new CreateProjectRequest();
    
    this._buildFrom();
    this.valuesChangesSubscribtion();
    
    this.loadDepartments();
    this.loadProjectsTypes();

  }
  
  //#endregion On init 


  //#region  Oninit Data Loaders 
  loadProjectsTypes(){
    this
    .typesService
    .getAllTypes()
    .subscribe({

      next: (data)=>{
        this.types= data ;
      }
      ,
      error: (err)=>{
        this.toastr.error("تعذر تحميل أنواع المشاريع");
      }

    });

  }
  loadDepartments(){
    
    this
    .employeeService
    .getDepartments()
    .subscribe({
      next: (data)=>{
        this.departments =data 
      }
      ,
      error: (err)=>{
        this.toastr.error("تعذر تحميل الأقسام");
      }

    });

  }

    //#endregion  Oninit Data Loaders 
  


  //#region  Auto Complete Filters 
  valuesChangesSubscribtion(){
  
    this
    .projectForm
    .valueChanges
    .subscribe(values => {
      this.request = {
        ...this.request, 
        ...values, 
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
      switchMap(value => this.customersService.getCustomersByFilter(value))
        
    );
  
  }
  //#endregion Auto omplete Filters  
 
 
  //#region  On Selection 

  onManagerSelected(manager: Employee) {
    this.projectManager = manager;
    this.request.projectManagerId = manager.id;
    
    this
    .projectForm
    .get('projectManager')!
    .setValue(manager.personalInfo.firstName+" " + manager.personalInfo.lastName +" , "+manager.email , { emitEvent: false });
 
  }

  onLeaderSelected(leader: Employee) {
    this.teamLeader = leader;
    this.request.teamLeaderId = leader.id;
    
    this
    .projectForm
    .get('teamLeader')!
    .setValue(leader.personalInfo.firstName+" " + leader.personalInfo.lastName +" , "+leader.email , { emitEvent: false });
  
  }

  onCustomerSelected(customer: Customer) {
    this.proposer = customer;
    this.request.proposerId = customer.id;
  
    this
    .projectForm
    .get('customer')!
    .setValue(customer.customerName, { emitEvent: false });
  
  }

  //#endregion On Selection 
  

  //#region  On Submit 

  onSubmit(request : CreateProjectRequest){
  
    if(this.projectForm.valid){ 
     
      this
      .projectService
      .createProject(request)
      .subscribe({
        
        next: (data)=>{
          this.toastr.success("تمت إضافة الجهة بنجاح")
          this.router.navigate(['/projects/detail/',data])
        },

        error:(err)=>{
          this.toastr.error("لقد حدث خطاء ما")
        }
      });
 
    }

  
      
  }

  //#endregion On Submit 
  

  //#region  Form Builders 

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
      }),
      projectTypeId: [1, Validators.required],
      
      executerId: [1, Validators.required],
    });
   

  }
  //#endregion Form Builders
  
}
