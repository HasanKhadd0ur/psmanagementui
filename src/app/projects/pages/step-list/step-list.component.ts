import { Component } from '@angular/core';
import { Step } from '../../models/responses/Step';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { StepService } from '../../services/step.service';

@Component({
  selector: 'step-list',
  templateUrl: './step-list.component.html',
  styleUrl: './step-list.component.css'
})
export class StepListComponent {
  steps : Step[]
  projectId = Number(this.route.snapshot.paramMap.get('id'));
  constructor(
    private stepService :StepService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    public router :Router

  ) {
    
  }
  ngOnInit(): void {
    this.loadParticipations();

  }
   loadParticipations(): void{

    this.stepService.getStepsByProject(this.projectId).subscribe({
      next: (data)=> {
        this.steps= data 
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
