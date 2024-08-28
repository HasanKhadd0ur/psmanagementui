import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../../../models/responses/project';
import { ProjectService } from '../../../services/project.service';
import { CompleteProjectRequest } from '../../../models/requests/project-requests/completeProjectRequest';

@Component({
  selector: 'project-complete-modal',
  templateUrl: './project-complete-modal.component.html',
  styleUrl: './project-complete-modal.component.css'
})
export class ProjectCompleteModalComponent {
  @Input() project : Project 

  request = new CompleteProjectRequest();

  canComplete : boolean
  constructor(
    private projectServie : ProjectService ,
    private toastr : ToastrService,
    private activeModal :NgbActiveModal
  ){}

  ngOnInit(): void {
    

    this._setCanMove();

    
    
  }
  
  onClose() {
    this.activeModal.close();
  }
  
  onSubmit(){

    this
    .request
    .projectId= this.project.id;

    this
    .projectServie
    .completeProject(this.request)
    .subscribe({
      next : (data)=>{
        this
        .toastr
        .success('تم انجاز المشروع بنجاح');
      
      },
      error:(err)=>{
        this
        .toastr
        .error('تعذر الانتقال إلى مرحلة الانجاز');
      }
    });

  }
  private _setCanMove(){

    this.canComplete =true ;
    this
    .project
    .steps
    .forEach(e =>e.currentCompletionRatio !=100 ? this.canComplete =false : '' )

    
  } 
}
