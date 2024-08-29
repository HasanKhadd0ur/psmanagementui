import { Component, Input } from '@angular/core';
import { Track } from '../../../models/responses/track';
import { CompleteTrackRequest } from '../../../models/requests/completeTrakRequest';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TrackService } from '../../../services/track.service';
import { Employee } from '../../../../employees/models/responses/employee';
import { EmployeeTrack } from '../../../models/responses/employeeTrack';

@Component({
  selector: 'complete-track-modal',
  templateUrl: './complete-track-modal.component.html',
  styleUrl: './complete-track-modal.component.css'
})
export class CompleteTrackModalComponent {
  @Input() track : Track 

  @Input() employeeTrack : EmployeeTrack[]
  errorMessage =''
  request = new CompleteTrackRequest();

  canComplete : boolean

  constructor(
    private trackServie : TrackService ,
    private toastr : ToastrService,
    private activeModal :NgbActiveModal
  ){}

  ngOnInit(): void {
    
    console.log(this.employeeTrack)
    
    this._setCanMove();

  }

  onClose() {
  
    this.activeModal.close();
  }
  
  onSubmit(){

    this
    .request
    .trackId= this.track.id;

    this
    .request
    .completionDate= new Date();
  
    this
    .request
    .projectId=this.track.projectId

    this
    .trackServie
    .completeTrack(this.request)
    .subscribe({
      next : (data)=>{
        this
        .toastr
        .success('تم اكمال المتابعة بنجاح');
      
        this.activeModal.close(true)
      
      },
      error:(err)=>{
        this
        .toastr
        .error('تعذر اكمال المتابعة');
      }
    });

  }


  private _setCanMove(){

    this
    .canComplete =! this
    .track
    .trackInfo
    .isCompleted

    if(!this.canComplete){
      this.errorMessage='عذرا لاتستطيع اكمال عملية متابعة مكتملة بالفعل'
    }

    debugger
    let contribution =0;

    if(this.employeeTrack){
    this
    .employeeTrack
    .forEach(e => contribution+=e.employeeWork.contributingRatio)
    }
    if(contribution!=100){
      this.errorMessage='عذرا يجب أن يكون مجموع مساهمات العاملين مئة'
    }

    // this.canComplete = contribution == 100
    
    



    console.log(this.track)

  } 

}
