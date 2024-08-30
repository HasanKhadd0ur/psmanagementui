import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../../../projects/models/responses/project';
import { ProjectService } from '../../../projects/services/project.service';
import { StepTrack } from '../../../tracks/models/responses/steptrack';
import { TrackService } from '../../../tracks/services/track.service';
import { StepService } from '../../../projects/services/step.service';
import { GetStepTrackHistoryRequest } from '../../../projects/models/requests/step-requests/GetStepTrackHistoryRequest';
import { Step } from '../../../projects/models/responses/Step';

@Component({
  selector: 'step-track-report',
  templateUrl: './step-track-report.component.html',
  styleUrl: './step-track-report.component.css'
})
export class StepTrackReportComponent {
  stepId :number 
  project :Project
  projectId: number 
  stepsTrack : StepTrack[]
  step :Step 


  constructor(

    private tostrService  :ToastrService ,
    private stepService : StepService,
    private projectService  : ProjectService,
    private route : ActivatedRoute,
    private router : Router

  ){}

  ngOnInit(): void {
    
    this.stepId= Number(this.route.snapshot.paramMap.get('stepId'))
    this.projectId= Number(this.route.snapshot.paramMap.get('projectId'))

    this.loadSteptrack();
    this.loadProject();
  }


  loadSteptrack() {
    let request : GetStepTrackHistoryRequest ={
      stepId:this.stepId,
      pageNumber:null,
      pageSize:null
    }
    this
    .stepService
    .getStepTrackHistory(request)
    .subscribe({
      next : (data)=>{
        this.stepsTrack=data;
      }
    });

    this
    .stepService
    .getStepById(this.stepId)
    .subscribe({
      next: (data)=>{
        this.step=data
      }

    });

  }


  loadProject() {
    this
    .projectService
    .getProjectById(this.projectId)
    .subscribe({
      next: (data)=>{

        this.tostrService.success('تم تحميل التقرير بنجاح')
        this.project=data
      }
    });
  }

}
