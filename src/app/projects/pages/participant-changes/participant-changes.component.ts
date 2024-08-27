import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/responses/project';
import { Employee } from '../../../employees/models/responses/employee';
import { ParticipationChange } from '../../models/responses/participationChange';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from '../../../employees/services/employees.service';
import { EmployeeParticipate } from '../../../employees/models/responses/employeeParticipate';

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
        this.project=data
        this.currentParticipation=this.project.employeeParticipates.filter(e => e.employeeId == this.participantId)[0]
      }
    });

        

    this
    .projectService
    .getParticipationChangeHistory(this.projectId)
    .subscribe({
      next: (data)=>{
        this
        .history=data.filter(e=> e.employeeId==this.participantId);
        
        this
        .toastr
        .success('لقد تم تحميل تاريخ التبدلات بنجاح');

      },
      error:(err)=>{

        this
        .toastr
        .error('لقد حدث خطاء ما');
      }


    });

  }


}
