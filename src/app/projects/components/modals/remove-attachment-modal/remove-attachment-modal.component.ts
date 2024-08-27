import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Attachment } from '../../../models/responses/attachment';
import { RemoveParticipantRequest } from '../../../models/requests/project-requests/RemoveParticipant';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'remove-attachment-modal',
  templateUrl: './remove-attachment-modal.component.html',
  styleUrl: './remove-attachment-modal.component.css'
})
export class RemoveAttachmentModalComponent {
  @Input() attachment: Attachment;
  @Output() attachmentRemoved = new EventEmitter<void>();

  constructor(private projectService: ProjectService) {}

  onConfirmRemove() {

  

  }

}
