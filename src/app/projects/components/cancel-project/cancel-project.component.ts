import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CompleteProjectRequest } from '../../models/requests/project-requests/completeProjectRequest';
import { Project } from '../../models/responses/project';
import { ProjectService } from '../../services/project.service';
import { CancelProjectRequest } from '../../models/requests/project-requests/CancelProjectRequest';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/authentication/user.service';

@Component({
  selector: 'cancel-project',
  templateUrl: './cancel-project.component.html',
  styleUrl: './cancel-project.component.css'
})
export class CancelProjectComponent implements OnInit {
  @Input() project : Project 

  request : CancelProjectRequest

  msg :string
  canComplete : boolean
  constructor(
    private projectServie : ProjectService ,
    private toastr : ToastrService,
    private userService : UserService,
    private activeModal :NgbActiveModal,
    private router :Router
  ){}

  ngOnInit(): void {
    

    this._setCanMove();

    
    
  }
  
  onClose() {
    this.activeModal.close();
  }
  
  onSubmit(){

    this
    .projectServie
    .cancelProject(this.request)
    .subscribe({
      next : (data)=>{
        this
        .toastr
        .success('تم إلغاء المشروع بنجاح');
      
        this.activeModal.close(true);
      },
      error:(err)=>{
        this
        .toastr
        .error('تعذر إلغاء المشروع');
      }
    });

  }
  private _setCanMove(){

    this.request={
      employeeId: this.userService.getEmployeeId(),
      projectId : this.project.id
    }

    
    this.canComplete =this
    .project
    .currentState.toLocaleLowerCase()=="inprogress";

    this.canComplete=this.canComplete || this
    .project
    .currentState.toLocaleLowerCase()=="inplan";

    this.msg="أنت في مرحلة لاتستطيع فيها إلغاء المشروع"    
    
  } 

}
