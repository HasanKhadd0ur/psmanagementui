import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { AddAttachmentRequest } from '../../../models/requests/project-requests/AddAttachmentRequest';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CreateFinancialSpendItemRequest } from '../../../models/requests/financial-reuqests/CreateFinancialSpendItemRequest';
import { FinancialSpendingService } from '../../../services/financial-spending.service';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'add-attachment-modal',
  templateUrl: './add-attachment-modal.component.html',
  styleUrl: './add-attachment-modal.component.css'
})
export class AddAttachmentModalComponent {
  @Input() projectId :number 
  @Output() itemAdded= new EventEmitter<void>();

  item  : AddAttachmentRequest 
  selectedFile :File |null
  
  constructor(
    private toastr :ToastrService,
    public activeModal: NgbActiveModal,
    private projectService :ProjectService
  ) {}

  ngOnInit(): void {
    this.item ={
      attachmentName:'اسم المرفق',
      attachmentDescription:'وصف المرفق',
      file:null,
      projectId:this.projectId
    }
   
  }


  onSubmit(): void {
    // Emit the project data or handle it as needed
    console.log('Project data submitted:', this.item);

    this.item.file=this.selectedFile

    this.projectService.addAttachment(this.item).subscribe({
  
      next: (data)=>{

        this.itemAdded.emit();
        this.activeModal.close(data); // Close modal and pass data
  
      },
      error: (err )=> this.toastr.error("لقد حدث خطاء ما")

    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }
  onClose():void {
    this.activeModal.close();
  }

}
