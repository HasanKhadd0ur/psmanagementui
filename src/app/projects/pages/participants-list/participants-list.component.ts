import { Component } from '@angular/core';
import { EmployeeParticipate } from '../../../employees/models/responses/employeeParticipate';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'participants-list',
  templateUrl: './participants-list.component.html',
  styleUrl: './participants-list.component.css'
})
export class ParticipantsListComponent {
  participants : EmployeeParticipate[]
  projectId = Number(this.route.snapshot.paramMap.get('id'));
  constructor(
    private projectService :ProjectService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    public router :Router

  ) {
    
  }
  ngOnInit(): void {
    this.loadParticipations();

  }
   loadParticipations(): void{

    this.projectService.getParticipants(this.projectId).subscribe({
      next: (data)=> {
        this.participants= data 
        this.toastr.success("تم تحميل المراحل بنجاح");
      }
      ,

      error:(err)=>{
        console.log(err)
        this.toastr.error("لقد حدث خطاء ما")
      }
    })

  }
}
