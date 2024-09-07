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
  uploadedFiles: any[] = [];
  totalSize=0
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
      attachmentName:'',
      attachmentDescription:'',
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

        this.activeModal.close(true); // Close modal and pass data
  
      },
      error: (err )=> this.toastr.error("لقد حدث خطاء ما")

    })
  }


  // Method to handle file selection
  onFileSelected(event: any): void {
    const files = event.files;
    this.totalSize = files.reduce((acc: number, file: File) => acc + file.size, 0);
    if (files.length > 0) {
      this.selectedFile = files[0]; // Set the selected file
    }
  }

  // Method to handle file upload
  onTemplatedUpload(event: { files: File[] }): void {
    if (!this.selectedFile) {
      return;
    }
  }

  choose(event: any, chooseCallback: Function): void {
    chooseCallback();
  }

  uploadEvent(uploadCallback: Function): void {
    uploadCallback();
  }

  onRemoveTemplatingFile(event: any, file: any, removeFileCallback: Function, index: number): void {
    removeFileCallback(index);
  }
  // File size formatting helper
  formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  } 
    onClose():void {
    this.activeModal.close();
  }

}
