import { Component, input, OnInit } from '@angular/core';
import { Attachment } from '../../models/responses/attachment';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAttachmentModalComponent } from '../../components/modals/add-attachment-modal/add-attachment-modal.component';
import { RemoveAttachmentModalComponent } from '../../components/modals/remove-attachment-modal/remove-attachment-modal.component';

@Component({
  selector: 'project-attachments',
  templateUrl: './project-attachments.component.html',
  styleUrl: './project-attachments.component.css'
})
export class ProjectAttachmentsComponent implements OnInit{

  attachments : Attachment[]
  projectId : number 

  selectedAtttachment : Attachment

  constructor(
    private projetService : ProjectService,
    private toastr : ToastrService ,
    private route : ActivatedRoute,
    private modalService: NgbModal
  ){}

  ngOnInit(): void {
    this
    .projectId = Number(this.route.snapshot.paramMap.get('id'));

    this
    .loadAttachment();
  
  }


  loadAttachment(){
    this
    .projetService
    .getAttachment(this.projectId)
    .subscribe({
      next : (data)=>{
      
        if(!this.attachments){
          this.toastr.success('تم تحميل المرفقات بنجاح')
      
        }
        this.attachments=data
      }
      ,
      error:(err)=>{
        this.toastr.error('لقد حدث خطاء ما')
      }

    });
  }

  setSelectedAttachment(selected : Attachment ): void {
    this.selectedAtttachment = selected;
  }


  openDeleteAttachment(attachment : Attachment) {
    const modalRef = this.modalService.open(RemoveAttachmentModalComponent);
    modalRef.componentInstance.attachment = attachment;


    modalRef.result.then((result) => {
      if (result) {
        // Add the new project to the list
        this.loadAttachment();
        
      }
    }, (reason) => {
   
    });

  }
    

  openAddModal(): void {
    const modalRef = this.modalService.open(AddAttachmentModalComponent);
    modalRef.componentInstance.projectId = this.projectId;

    modalRef.componentInstance.itemAdded.subscribe(
      {
        next : ()=>{
          this.loadAttachment()

        }
      }
    );

    modalRef.result.then((result) => {
      if (result) {
        // Add the new project to the list
        this.loadAttachment();
        
      }
    }, (reason) => {
   
    });
  }

  onAttahmentRemoved(): void {
    
    this.loadAttachment();
  }
}
