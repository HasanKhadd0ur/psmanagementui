import { Component } from '@angular/core';
import { Employee } from '../../../employees/models/responses/employee';
import { EmployeeTrack } from '../../models/responses/employeeTrack';
import { EmployeesService } from '../../../employees/services/employees.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetStepTrackHistoryRequest } from '../../../projects/models/requests/step-requests/GetStepTrackHistoryRequest';
import { GetEmployeeTrackHistoryRequest } from '../../../employees/models/requests/getEmployeeTrackHistoryRequest';
import { ProjectInfo } from '../../../projects/models/valueObjects/ProjectInfo';

@Component({
  selector: 'employee-track-history',
  templateUrl: './employee-track-history.component.html',
  styleUrl: './employee-track-history.component.css'
})
export class EmployeeTrackHistoryComponent {
  projectId : number 
  employeeId : number 
  projectInfo : ProjectInfo
  employee : Employee 
  employeeTrackHistory : EmployeeTrack[]
  constructor(
    private employeeService :EmployeesService,
    private route : ActivatedRoute,
    private toastr :ToastrService

  ){}
  ngOnInit(): void {
    this.employeeId=Number(this.route.snapshot.paramMap.get('employeeId'));
    this.projectId=Number(this.route.snapshot.paramMap.get('projectId'));

    let request : GetEmployeeTrackHistoryRequest ={
      employeeId: this.employeeId,
      projectId:this.projectId,
      pageNumber: null, 
      pageSize:null
    }
    
    this.employeeService
    .getEmployeeTrackHistory(request)
        .subscribe({
      next: (data)=> {

        this.employeeTrackHistory = data ;
        this.toastr.success("تم تحميل تاريخ المتابعة بنجاح")

      },
      error:(err)=>{
        this.toastr.error('لقد حدث خطاء ما')
      }
    });

    this.employeeService.getEmployeeById(this.employeeId).subscribe({

      next: (data)=>{
        this.employee =data;
      }
    });


    this.employeeService.getEmployeeParticipations(this.employeeId).subscribe({

      next: (data)=>{
        this.projectInfo= data.at(0)!.projectInfo;
      }
    });


  }


}
