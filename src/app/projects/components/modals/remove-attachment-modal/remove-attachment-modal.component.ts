import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Attachment } from '../../../models/responses/attachment';
import { RemoveParticipantRequest } from '../../../models/requests/project-requests/RemoveParticipant';
import { ProjectService } from '../../../services/project.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'remove-attachment-modal',
  templateUrl: './remove-attachment-modal.component.html',
  styleUrl: './remove-attachment-modal.component.css'
})
export class RemoveAttachmentModalComponent {
  @Input() attachment: Attachment;
  @Output() attachmentRemoved = new EventEmitter<void>();

  constructor(
    private projectService: ProjectService,
    private activeModal : NgbActiveModal,
    private toastr : ToastrService
  ) {}

  onConfirmRemove() {

    this
    .projectService
    .removeAttachment(this.attachment.projectId,this.attachment.id)
    .subscribe({
      next : ()=>{
        this.attachmentRemoved.emit();
        this.activeModal.close(true)

      },
      error:(err)=>{

        this.toastr.error('تعذر حذف المرفق')
      }
    });
  

  }

  onClose(){
    this.activeModal.close();
  }
}
