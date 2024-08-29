import { Component, Input } from '@angular/core';
import { ChangeStepWeightRequest } from '../../../models/requests/step-requests/changeStepWeightRequest';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { StepService } from '../../../services/step.service';
import { StepInfo } from '../../../models/valueObjects/StepInfo';

@Component({
  selector: 'edit-weight-modal',
  templateUrl: './edit-weight-modal.component.html',
  styleUrl: './edit-weight-modal.component.css'
})
export class EditWeightModalComponent {
  @Input() weight : number 
  @Input() stepInfo :StepInfo
  @Input()    stepId : number 

  request :ChangeStepWeightRequest 
  
  constructor(
    private toastr :ToastrService,
     public activeModal: NgbActiveModal,
     private stepService :StepService
    ) {}

  ngOnInit(): void {

    this.request ={
      weight: this.weight,
      stepId:this.stepId
    };
  }

  onSubmit(): void {
    // Emit the project data or handle it as needed
    console.log('Project data submitted:', this.request);
    this
    .stepService
    .changeStepWeight(this.request)
    .subscribe({

      next: (data)=>{
      
        this.activeModal.close(this.request.weight); // Close modal and pass data
  
      },
      error: (err )=> this.toastr.error("لقد حدث خطاء ما")

    })
  }

  onClose():void {
    this.activeModal.close();
  }

}
