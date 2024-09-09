import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CompleteProjectRequest } from '../../../models/requests/project-requests/completeProjectRequest';
import { Project } from '../../../models/responses/project';
import { ProjectService } from '../../../services/project.service';
import { RePlanProjectRequest } from '../../../models/requests/project-requests/RePlanProjectRequest';

@Component({
  selector: 'project-replan-modal',
  templateUrl: './project-replan-modal.component.html',
  styleUrl: './project-replan-modal.component.css'
})
export class ProjectReplanModalComponent {
  @Input() project : Project 

  canRePlan : boolean

  request :RePlanProjectRequest ;

  constructor(
    private projectServie : ProjectService ,
    private toastr : ToastrService,
    private activeModal :NgbActiveModal
  ){}

  ngOnInit(): void {
   
    this
    ._setCanMove()
    
  }

  onClose() {
    this.activeModal.close();
  }
  
  onSubmit(){

    this
    .request = {
      projectId: this.project.id,
      
    }
    this
    .projectServie
    .rePlanProject(this.request)
    .subscribe({
      next : (data)=>{
        this
        .toastr
        .success('تمت العودة إلى التخطيط بنجاح');
      
      },
      error:(err)=>{
        this
        .toastr
        .error('تعذر الانتقال إلى مرحلة التخطيط');
      }
    });

  }
  private _setCanMove(){

    
    this.canRePlan=this.project.currentState.toLowerCase() =="inprogress" ? true : false ; 
  } 

}
