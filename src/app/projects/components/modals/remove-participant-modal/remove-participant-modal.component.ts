import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeParticipate } from '../../../../employees/models/responses/employeeParticipate';
import { ProjectService } from '../../../services/project.service';
import { RemoveParticipantRequest } from '../../../models/requests/project-requests/RemoveParticipant';

@Component({
  selector: 'remove-participant-modal',
  templateUrl: './remove-participant-modal.component.html',
  styleUrl: './remove-participant-modal.component.css'
})
export class RemoveParticipantModalComponent {
  @Input() participant: EmployeeParticipate;
  @Output() participantRemoved = new EventEmitter<void>();

  constructor(private projectService: ProjectService) {}

  onConfirmRemove() {
    let request :RemoveParticipantRequest= {
      ParticipantId : this.participant.employeeId,
      projectId:this.participant.projectId
    }

    this.projectService
    .removeParticipant(request)
    .subscribe(() => {
      this.participantRemoved.emit();
      
    });
  }

}
