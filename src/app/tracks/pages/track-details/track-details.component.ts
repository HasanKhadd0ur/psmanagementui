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
import { AddEmployeeTrackRequest } from '../../models/requests/AddEmployeeTrackRequest';
import { ProjectService } from '../../../projects/services/project.service';
import { EmployeeParticipate } from '../../../employees/models/responses/employeeParticipate';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompleteTrackModalComponent } from '../../components/modals/complete-track-modal/complete-track-modal.component';

@Component({
  selector: 'track-details',
  templateUrl: './track-details.component.html',
  styleUrl: './track-details.component.css'
})
export class TrackDetailsComponent implements OnInit {
  isAddStepTrackModalVisible = false;
  trackId : number
  track : Track 
  canComplete=false
  stepTracks :StepTrack[] 
  employeesTracks : EmployeeTrack[] 
  steps: Step[] = []; // Load steps from service or store
  trackedSteps: Step[] = []; // Load already tracked steps
  participants : EmployeeParticipate[]
  
  constructor(
    private toastr : ToastrService ,
    private route :ActivatedRoute,
    private trackService : TrackService,
    private stepService : StepService ,
    private modalService  : NgbModal,
    private projectService :ProjectService 
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
      this.loadParticipants();
      this._canComplete();
      this.loadSteps();
    })

  }

  loadParticipants(){
    this
    .projectService
    .getParticipants(this.track.projectId)
    .subscribe({
      next: (data)=>{

        this.participants = data
      }

    });
  }

  openTrackComplete(){
    
    const modalRef = this.modalService.open(CompleteTrackModalComponent);
    modalRef.componentInstance.track = this.track;
    modalRef.componentInstance.employeeTrack=this.employeesTracks

    modalRef.result.then((result) => {
      if(result){

        this.loadTrack();

      }
    }, (reason) => {
     
    
    });
  
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

    this.trackService.addStepTrack(stepTrackRequest).subscribe({

      next : (data)=>{

          this.loadTheNewStep(data,stepTrackRequest);
          this.toastr.success('تمت إضافة متالعة المرحلة ')
        
      }
      ,
      error:(err)=>{
        this.toastr.error('لقد حدث خطاء ما')
      }

    });
  }
  

  openComplete(){
    const modalRef = this.modalService.open(CompleteTrackModalComponent);
    modalRef.componentInstance.track = this.track;


    modalRef.result.then((result) => {
      if (result) {
        // Add the new project to the list
        this.loadParticipants();
        
      }
    }, (reason) => {
   
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
        numberOfWorker:0,
        description:'',
        duration:0,

      },
      stepId: s?.id??0,
      stepWeight:s?.weight ??0
    }

    this._canComplete();
    this.stepTracks.push(st)
    this.steps=this.steps.filter(e => e.id == s?.id) 
    this.trackedSteps.push(s!);

  }

  handleEmployeeTrack(request: AddEmployeeTrackRequest): void {

    debugger
     this.trackService.addEmployeeTrack(request).subscribe({
 
       next : (data)=>{
 
           this.loadTheNewParticipant(data,request);
           this.toastr.success('تمت إضافة متالعة المرحلة ')
           this._canComplete(); 
       }
       ,
       error:(err)=>{
         this.toastr.error('لقد حدث خطاء ما')
       }
 
     });
   }
   loadTheNewParticipant(empTrackId :number,request :AddEmployeeTrackRequest ){
    let s = this.participants.find(s => s.employeeId == request.employeeId  )
    let st : EmployeeTrack ={
      trackId:this.trackId,
      trackInfo:this.track.trackInfo,
      employeeId:request.employeeId,
      employeeWork:request.employeeWork,
      employeeWorkInfo:request.employeeWorkInfo,
      employee:s!.employee,
      notes:request.notes
    }

    this._canComplete();

    this.employeesTracks.push(st)
    this.participants=this.participants.filter(e => e.employeeId == s?.employeeId) 


   }


   private _canComplete (){
    let contribution =0 ;
    this
    .employeesTracks
    .forEach(e => contribution+=e.employeeWork.contributingRatio);
    this.canComplete= 100 == contribution 
    }
 }
