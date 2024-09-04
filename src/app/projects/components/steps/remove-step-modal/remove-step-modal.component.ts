import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Step } from '../../../models/responses/Step';
import { ProjectService } from '../../../services/project.service';
import { StepService } from '../../../services/step.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'remove-step-modal',
  templateUrl: './remove-step-modal.component.html',
  styleUrl: './remove-step-modal.component.css'
})
export class RemoveStepModalComponent {
  @Input() step: Step;
  @Output() stepRemoved = new EventEmitter<void>();

  constructor(
    private stepService: StepService,
    private activeModal :NgbActiveModal,
    private toastr : ToastrService) {}

  onConfirmRemove() {

    this
    .stepService
    .deleteSep(this.step.id)
    .subscribe({
      next: ()=>{

        this.activeModal.close(this.step.id);
        
      },
      error: (err)=>{
        this
        .toastr
        .error('تعذر حذف المرحلة')

      }

    });


  }

  onClose(){
    this.activeModal.close();
  }
}
