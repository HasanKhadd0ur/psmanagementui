import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CreateTrackRequest } from '../../../models/requests/CreateTrackRequest';
import { Track } from '../../../models/responses/track';
import { TrackService } from '../../../services/track.service';

@Component({
  selector: 'add-track-modal',
  templateUrl: './add-track-modal.component.html',
  styleUrl: './add-track-modal.component.css'
})
export class AddTrackModalComponent {
  item  = new Track()
  @Input() projectId : number 
  request :CreateTrackRequest 
  
  constructor(private toastr :ToastrService, public activeModal: NgbActiveModal,private trackService  : TrackService) {}

  ngOnInit(): void {
    this.request ={
      projectId: this.projectId ,
      trackInfo: {
        trackDate: new Date(),
        statusDescription: "",
        isCompleted :false
      },
      notes:""
       
    };
  }
  onSubmit(): void {
    // Emit the project data or handle it as needed
    console.log('Project data submitted:', this.request);
    this.trackService.createTrack(this.request).subscribe({
  
      next: (data)=>{

        this.activeModal.close(data); // Close modal and pass data
  
      },
      error: (err )=> this.toastr.error("لقد حدث خطاء ما")

    })
  }

  onClose():void {
    this.activeModal.close();
  }

}
