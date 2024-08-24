import { Component, OnInit } from '@angular/core';
import { TrackService } from '../../services/track.service';
import { ActivatedRoute } from '@angular/router';
import { StepTrack } from '../../models/responses/steptrack';
import { StepService } from '../../../projects/services/step.service';
import { GetStepTrackHistoryRequest } from '../../../projects/models/requests/step-requests/GetStepTrackHistoryRequest';
import { ToastrService } from 'ngx-toastr';
import { Step } from '../../../projects/models/responses/Step';

@Component({
  selector: 'step-track-history',
  templateUrl: './step-track-history.component.html',
  styleUrl: './step-track-history.component.css'
})
export class StepTrackHistoryComponent implements OnInit{
  stepId : number 
  step : Step 
  stepTrackHistory : StepTrack[]
  constructor(
    private stepService :StepService,
    private route : ActivatedRoute,
    private toastr :ToastrService

  ){}
  ngOnInit(): void {
    this.stepId=Number(this.route.snapshot.paramMap.get('id'));

    let request : GetStepTrackHistoryRequest ={
      stepId: this.stepId ,
      pageNumber: null, 
      pageSize:null
    }
    
    this.stepService
    .getStepTrackHistory(request)
    .subscribe({
      next: (data)=> {

        this.stepTrackHistory = data ;
        this.toastr.success("تم تحميل تاريخ المتابعة بنجاح")

      },
      error:(err)=>{
        this.toastr.error('لقد حصل خطاء ما')
      }
    });

    this.stepService.getStepById(this.stepId).subscribe({

      next: (data)=>{
        this.step =data;
      }
    });


  }


}
