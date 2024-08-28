import { Component } from '@angular/core';
import { Project } from '../../../projects/models/responses/project';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../projects/services/project.service';
import { StepTrack } from '../../../tracks/models/responses/steptrack';
import { Track } from '../../../tracks/models/responses/track';
import { TrackService } from '../../../tracks/services/track.service';

@Component({
  selector: 'steps-track-report',
  templateUrl: './steps-track-report.component.html',
  styleUrl: './steps-track-report.component.css'
})
export class StepsTrackReportComponent {


  trackId :number 
  projectId :number 
  project :Project
  track : Track
  stepsTrack : StepTrack[]


  constructor(

    private tostrService  :ToastrService ,
    private projectService : ProjectService,
    private trackService  : TrackService,
    private route : ActivatedRoute,
    private router : Router

  ){}

  ngOnInit(): void {
    
    this.trackId= Number(this.route.snapshot.paramMap.get('id'))
    this.projectId= Number(this.route.snapshot.paramMap.get('projectId'))

    this.loadTracks();
    this.loadStepTrack();
    this.loadProject()
  }


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


  loadStepTrack() {
    this
    .trackService
    .getStepsTrackById(this.trackId)
    .subscribe({
      next: (data)=>{

        this.tostrService.success('تم تحميل التقرير بنجاح')
        this.stepsTrack=data
      }
    });
  }

  
  loadTracks() {
    this
    .trackService
    .getByTrackById(this.trackId)
    .subscribe({
      next : (data)=>{
        this.track = data;
      }
    });
  }

}
