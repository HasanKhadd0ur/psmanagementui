import { Component, Input } from '@angular/core';
import { Step } from '../../../models/responses/Step';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddProjectStepRequest } from '../../../models/requests/project-requests/AddProjectStepRequest';
import { ProjectService } from '../../../services/project.service';
import { ChangeStepInfoRequest } from '../../../models/requests/step-requests/changeStepInfoRequest';
import { StepInfo } from '../../../models/valueObjects/StepInfo';
import { StepService } from '../../../services/step.service';

@Component({
  selector: 'edit-step-modal',
  templateUrl: './edit-step-modal.component.html',
  styleUrl: './edit-step-modal.component.css'
})
export class EditStepModalComponent {
  @Input() stepInfo : StepInfo 
  
  @Input()    stepId : number 

  request :ChangeStepInfoRequest 
  
  constructor(
    private toastr :ToastrService,
     public activeModal: NgbActiveModal,
     private stepService :StepService
    ) {}

  ngOnInit(): void {

    this.request ={
      stepInfo: {
          ...this.stepInfo
      },
      stepId:this.stepId
    };
  }

  onSubmit(): void {
    // Emit the project data or handle it as needed
    console.log('Project data submitted:', this.request);
    this
    .stepService
    .changeStepInfo(this.request)
    .subscribe({

      next: (data)=>{
      
        this.activeModal.close(this.request); // Close modal and pass data
  
      },
      error: (err )=> this.toastr.error("لقد حدث خطاء ما")

    })
  }

  onClose( ):void {
    this.activeModal.close();
  }

}
