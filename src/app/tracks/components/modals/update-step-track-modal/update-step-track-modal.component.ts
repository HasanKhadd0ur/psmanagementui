import { Component, Input } from '@angular/core';
import { Step } from '../../../../projects/models/responses/Step';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { StepService } from '../../../../projects/services/step.service';
import { AddStepTrackRequest } from '../../../models/requests/AddStepTrackRequest';
import { TrackService } from '../../../services/track.service';
import { UpdateStepTrack } from '../../../models/requests/UpdateStepTrack';
import { StepTrack } from '../../../models/responses/steptrack';
import { Track } from '../../../models/responses/track';

@Component({
  selector: 'update-step-track-modal',
  templateUrl: './update-step-track-modal.component.html',
  styleUrl: './update-step-track-modal.component.css'
})
export class UpdateStepTrackModalComponent {
  @Input() projectId :number 
  @Input() trackId :number

  
  @Input() track : Track
  @Input() stepTrack : StepTrack
  stepTrackForm: FormGroup;
  filteredSteps: Step[] = [];

  constructor(private fb: FormBuilder,
    private stepService : StepService ,
    private trackService : TrackService,
    private toastr :ToastrService,
    private activeModal :NgbActiveModal
   ) {}

  ngOnInit(): void {
    this.stepTrackForm = this.fb.group({
      id: [this.stepTrack.stepId],
      stepName: [this.stepTrack.stepInfo.stepName, Validators.required],
      executionState: [this.stepTrack.executionState, Validators.required],
      trackExecutionRatio: [this.stepTrack.trackExecutionRatio, [Validators.required, Validators.min(0), Validators.max(100)]],
    });
 
   }
   
   
   onSubmit(): void {
    if (this.stepTrackForm.valid) {
      debugger
        if(this.stepTrack.oldExecutionRatio + this.stepTrackForm.value.trackExecutionRatio > 100){
          this.toastr.error('نسبة التنفيذ غير صحيحة ')

          return ;
        }
     
        const newStepTrack: UpdateStepTrack = {
          stepId: this.stepTrack.stepId,
          trackId: this.trackId,
          trackDate:this.track.trackInfo.trackDate,
          stepTrackId:this.stepTrack.id,
          executionState: this.stepTrackForm.value.executionState,         
          trackExecutionRatio: this.stepTrackForm.value.trackExecutionRatio,
        };
        this
        .trackService
        .UupdateStepTrack(newStepTrack)
        .subscribe({
          next:()=>{

            this.activeModal.close({data : newStepTrack.stepId,request:newStepTrack})
          },
          error:(err)=>{
            this.toastr.error('لقد حدث خطاء')
            this.activeModal.close();
          }
        })
        

      }
    
  }

  closeModal(): void {
    this.activeModal.close();
  }  

}
