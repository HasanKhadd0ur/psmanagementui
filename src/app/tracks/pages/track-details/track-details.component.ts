import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrackService } from '../../services/track.service';
import { Track } from '../../models/responses/track';
import { StepTrack } from '../../models/responses/steptrack';
import { EmployeeTrack } from '../../models/responses/employeeTrack';
import { ActivatedRoute } from '@angular/router';
import { Step } from '../../../projects/models/responses/Step';
import { AddStepTrackRequest } from '../../models/requests/AddStepTrackRequest';
import { error } from 'jquery';
import { StepService } from '../../../projects/services/step.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'track-details',
  templateUrl: './track-details.component.html',
  styleUrl: './track-details.component.css'
})
export class TrackDetailsComponent implements OnInit {
  isAddStepTrackModalVisible = false;
  trackId : number
  track : Track 
  stepTracks :StepTrack[] 
  employeesTracks : EmployeeTrack[] 
  steps: Step[] = []; // Load steps from service or store
  trackedSteps: Step[] = []; // Load already tracked steps

  constructor(
    private toastr : ToastrService ,
    private route :ActivatedRoute,
    private trackService : TrackService,
    private stepService : StepService 
  ){}


  ngOnInit(): void {
    this.trackId=Number(this.route.snapshot.paramMap.get('id'));
    this.loadTrack();

  }

  loadTrack(){
  
    forkJoin({
      track: this.trackService.getByTrackById(this.trackId),
      stepTracks: this.trackService.getStepsTrackById(this.trackId),
      employeesTracks: this.trackService.getEmployeesTrackById(this.trackId)
      
    
    }).subscribe(({ track, stepTracks, employeesTracks }) => {
      this.track = track;
      this.stepTracks = stepTracks;
      this.employeesTracks = employeesTracks;
  
      this.loadSteps();
    })

  }

  loadSteps(){
    this.stepService
    .getStepsByProject(this.track.projectId)
    .subscribe({

      next: (data)=> {

        this.steps=data ;
        this.filterTrackedSteps();
        
        this.filterUntrackedSteps()
        
        
      }

    });



  }

  filterTrackedSteps(): void {
    this.trackedSteps = this.steps.filter(step => 
      this.stepTracks.some(track => track.stepId === step.id)
    );
  }

  filterUntrackedSteps(): void {
    this.steps = this.steps.filter(step => 
      !this.stepTracks.some(track => track.stepId === step.id)
    );
  }
  showAddStepTrackModal(): void {
    this.isAddStepTrackModalVisible = true;
  }

  closeAddStepTrackModal(): void {
    this.isAddStepTrackModalVisible = false;
  }

  handleAddStepTrack(stepTrackRequest: AddStepTrackRequest): void {

    stepTrackRequest.trackDate=this.track.trackInfo.trackDate
    this.trackService.addStepTrack(stepTrackRequest).subscribe({

      next : (data)=>{

          this.loadTheNewStep(data,stepTrackRequest);

        
      }
      ,
      error:(err)=>{
        this.toastr.error('لقد حدث خطاء ما')
      }

    });
  }
  
  loadTheNewStep(stId :number,request :AddStepTrackRequest ){
    let s = this.steps.find(s => s.id == request.stepId  )
    let st : StepTrack ={
      id:stId ,
      trackId:this.trackId,
      trackInfo:this.track.trackInfo,
      trackExecutionRatio:request.trackExecutionRatio ,
      executionState: request.executionState,
      oldExecutionRatio : s?.currentCompletionRatio ??0 ,
      stepInfo:s?.stepInfo ?? {
        startDate:new Date(),
        stepName :'',
        NumberOfWorker:0,
        description:'',
        duration:0
      },
      stepId: s?.id??0

    }


    this.stepTracks.push(st)
    this.steps=this.steps.filter(e => e.id == s?.id) 
    this.trackedSteps.push(s!);

  }

}
