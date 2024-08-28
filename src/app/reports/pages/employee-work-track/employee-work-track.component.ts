//#region  imports

import { Component } from '@angular/core';
import { Project } from '../../../projects/models/responses/project';
import { EmployeeTrack } from '../../../tracks/models/responses/employeeTrack';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../projects/services/project.service';
import { EmployeesService } from '../../../employees/services/employees.service';
import { GetEmployeeTrackHistoryRequest } from '../../../employees/models/requests/getEmployeeTrackHistoryRequest';
import { Employee } from '../../../employees/models/responses/employee';

//#endregion  imports

@Component({
  selector: 'employee-work-track',
  templateUrl: './employee-work-track.component.html',
  styleUrl: './employee-work-track.component.css'
})
export class EmployeeWorkTrackComponent {  
  
  //#region propoerties
 
  employeeId :number 
  projectId :number 
  project :Project
  employeee : Employee 
  employeesTrack : EmployeeTrack[]
 
  //#endregion propoerties



  //#region  Constructors
  
  constructor(

    private tostrService  :ToastrService ,
    private projectService : ProjectService,
    private employeeService  : EmployeesService,
    private route : ActivatedRoute,
    private router : Router

  ){}

  //#endregion  Constructors
 
 

  //#region  Oninit 
  ngOnInit(): void {
    
    this.employeeId= Number(this.route.snapshot.paramMap.get('employeeId'))
    this.projectId= Number(this.route.snapshot.paramMap.get('projectId'))

    this.loadEmployeeTrack();
    this.loadProject()
    this.loadEmployee();
  }

  //#endregion  Oninit 
  

  
  //#region Loaders
  
  loadProject() {

    this
    .projectService
    .getProjectById(this.projectId)
    .subscribe({
      next : (data)=>{
        this.project=data;
      }
    });
  }


  loadEmployeeTrack() {

    let request : GetEmployeeTrackHistoryRequest ={
      employeeId: this.employeeId,
      projectId:this.projectId,
      pageNumber :null,
      pageSize:null
    }

    this
    .employeeService
    .getEmployeeTrackHistory(request)
    .subscribe({
      next: (data)=>{

        this.tostrService.success('تم تحميل التقرير بنجاح')
        this.employeesTrack=data
      }
    });
  }


  loadEmployee(){

    this 
    .employeeService
    .getEmployeeById(this.employeeId)
    .subscribe({
      next:(data)=>{
        this.employeee=data
      },
      error:(err)=>{
        this.tostrService.error('لقد حدث خطاء ما')
        
      }
    });


  }

  //#endregion Loaders  


}
