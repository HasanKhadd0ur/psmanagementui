import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/responses/project';
import { Employee } from '../../../employees/models/responses/employee';
import { ParticipationChange } from '../../models/responses/participationChange';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from '../../../employees/services/employees.service';
import { EmployeeParticipate } from '../../../employees/models/responses/employeeParticipate';
import { UserService } from '../../../core/services/authentication/user.service';

@Component({
  selector: 'participant-changes',
  templateUrl: './participant-changes.component.html',
  styleUrl: './participant-changes.component.css'
})
export class ParticipantChangesComponent  implements OnInit{

  projectId : number 
  participantId : number 
  project : Project
  participant : Employee
  history : ParticipationChange[]
  currentParticipation :EmployeeParticipate 
  constructor(
    private projectService :ProjectService,
    private employeeServie :EmployeesService,
    private route :ActivatedRoute,
    private userService : UserService,
    private router :Router,
    private toastr :ToastrService
  ){}

  ngOnInit(): void {

    this
    .projectId = Number(this.route.snapshot.paramMap.get('id'));
    
    this
    .participantId = Number(this.route.snapshot.paramMap.get('participantId'));
 
    this
    .employeeServie
    .getEmployeeById(this.participantId)
    .subscribe({
      next:(data)=>{
        this.participant=data
      }
    });

    this
    .projectService
    .getProjectById(this.projectId)
    .subscribe({
      next:(data)=>{
 
        if(this.userService.isAuthorizedAsSeflOrDeputy(this.participantId)||data.projectManagerId == this.userService.getEmployeeId()){

          this.project=data
                
          this
          .toastr
          .success('لقد تم تحميل تاريخ التبدلات بنجاح');
  
          this.currentParticipation=this.project.employeeParticipates.filter(e => e.employeeId == this.participantId)[0]
          

        }else {
          this.toastr.error('ليس لديك صلاحيات الولوج إلى هذه الصفحة')
          this.router.navigate(['/forbiden'])
        }
    
         }
    });

        

    this
    .projectService
    .getParticipationChangeHistory(this.projectId)
    .subscribe({
      next: (data)=>{
        this
        .history=data.filter(e=> e.employeeId==this.participantId);

      },
      error:(err)=>{

        this
        .toastr
        .error('لقد حدث خطاء ما');
      }


    });

  }


}
