import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeParticipate } from '../../../../employees/models/responses/employeeParticipate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { ChangeEmployeeParticipationRequest } from '../../../models/requests/project-requests/ChangeEmployeeParticipationRequest';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'edit-participant-modal',
  templateUrl: './edit-participant-modal.component.html',
  styleUrl: './edit-participant-modal.component.css'
})
export class EditParticipantModalComponent {
  @Input() participant: EmployeeParticipate;
  @Output() participantEdited = new EventEmitter<void>();

  editParticipantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
     private projectService: ProjectService,
    private activeModal : NgbModal
  ) {
    this.editParticipantForm = this.fb.group({
      role: ['', Validators.required],
      partialTimeRatio: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnChanges() {
    if (this.participant) {
      this.editParticipantForm.patchValue(this.participant);
    }
  }

  onSubmit() {
    if (this.editParticipantForm.valid) {
      
      let request : ChangeEmployeeParticipationRequest ={
        role: this.editParticipantForm.value.role ,
        partialTimeRation: this.editParticipantForm.value.partialTimeRatio,
        participantId: this.participant.employee.id ,
        projectId:this.participant.projectId

      }
      debugger;
      this
      .projectService
      .changeParticipation(request)
      .subscribe(() => {
        this.participantEdited.emit();
        this.closeModal();
      });
    }
  }

  closeModal() {
    this.activeModal.dismissAll();
  }
}
