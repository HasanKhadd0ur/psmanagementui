import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../../models/responses/project';
import { ProjectService } from '../../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'project-toprogress-modal',
  templateUrl: './project-toprogress-modal.component.html',
  styleUrl: './project-toprogress-modal.component.css'
})
export class ProjectToprogressModalComponent implements OnInit {

  @Input() project : Project 

  canMoveToProgress : boolean
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
    .projectServie
    .approveProject(this.project.id)
    .subscribe({
      next : (data)=>{
        this
        .toastr
        .success('تم الانتقال إلى مرحلة التنفيذ');
      
      },
      error:(err)=>{
        this
        .toastr
        .error('تعذر الانتقال إلى مرحلة التخطيط');
      }
    });

  }
  private _setCanMove(){

    let total =0 
    
    this
    .project
    .steps
    .forEach(e => total+=e.weight)
    
    this
    .canMoveToProgress = total == 100 ?  true : false 
  
  } 

}
