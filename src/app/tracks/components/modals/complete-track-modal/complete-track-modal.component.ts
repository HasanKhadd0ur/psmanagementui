import { Component, Input } from '@angular/core';
import { Track } from '../../../models/responses/track';
import { CompleteTrackRequest } from '../../../models/requests/completeTrakRequest';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TrackService } from '../../../services/track.service';

@Component({
  selector: 'complete-track-modal',
  templateUrl: './complete-track-modal.component.html',
  styleUrl: './complete-track-modal.component.css'
})
export class CompleteTrackModalComponent {
  @Input() track : Track 

  request = new CompleteTrackRequest();

  canComplete : boolean

  constructor(
    private trackServie : TrackService ,
    private toastr : ToastrService,
    private activeModal :NgbActiveModal
  ){}

  ngOnInit(): void {
    

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
    .canComplete = this
    .track
    .trackInfo
    .isCompleted

  } 

}
