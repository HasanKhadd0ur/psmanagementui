import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Step } from '../../../models/responses/Step';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StepService } from '../../../services/step.service';
import { AddProjectStepRequest } from '../../../models/requests/project-requests/AddProjectStepRequest';
import { ProjectService } from '../../../services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-step-modal',
  templateUrl: './add-step-modal.component.html',
  styleUrl: './add-step-modal.component.css'
})
export class AddStepModalComponent implements OnInit {
  step :Step = new Step()
  @Input() projectId : number 
  request :AddProjectStepRequest 
  
  constructor(private toastr :ToastrService, public activeModal: NgbActiveModal,private projectService :ProjectService) {}

  ngOnInit(): void {
    this.request ={
      stepInfo: {
        startDate:new Date (),
        description :'',
        NumberOfWorker :0,
        stepName:'',
        duration:0
      },
      currentCompletionRatio:0,
      weight:0,
      projectId: this.projectId 
    };
  }
  onSubmit(): void {
    // Emit the project data or handle it as needed
    console.log('Project data submitted:', this.request);
    this.projectService.addStepToProject(this.request).subscribe({
  
      next: (data)=>{
        this.step= {
          id :  data ,
          stepInfo: this.request.stepInfo ,
          weight: this.request.weight ,
          currentCompletionRatio: this.request.currentCompletionRatio,
          projectId: this.projectId
        }
        this.activeModal.close(this.step); // Close modal and pass data
  
      },
      error: (err )=> this.toastr.error("لقد حدث خطاء ما")

    })
  }

  onClose():void {
    this.activeModal.close();
  }

}
