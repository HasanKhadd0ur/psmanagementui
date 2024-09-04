import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../../models/responses/project';
import { PdfDownloaderService } from '../../../core/services/pdfDownloader/pdf-downloader.service';
import { ProjectService } from '../../services/project.service';
import { ProjectToprogressModalComponent } from '../../components/projectModals/project-toprogress-modal/project-toprogress-modal.component';
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectCompleteModalComponent } from '../../components/projectModals/project-complete-modal/project-complete-modal.component';
import { ProjectReplanModalComponent } from '../../components/projectModals/project-replan-modal/project-replan-modal.component';
import { ChangeManagerModalComponent } from '../../components/projectModals/change-manager-modal/change-manager-modal.component';
import { ChangeLeaderModalComponent } from '../../components/projectModals/change-leader-modal/change-leader-modal.component';
import { UserService } from '../../../core/services/authentication/user.service';
import { ROLES } from '../../../core/constants/roles';
import { CancelProjectComponent } from '../../components/cancel-project/cancel-project.component';


@Component({
  selector: 'project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {
  project : Project

  projectId : number 
  constructor(
    public router : Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private modalService :NgbModal ,
    private userService :UserService,
    private pdfDownloader : PdfDownloaderService
    ) {}

    ngOnInit(): void {
    this.projectId= Number(this.route.snapshot.paramMap.get('id'));

    this.loadProject()
  
  }

  openMoveToProgressModal(){
    
    const modalRef = this.modalService.open(ProjectToprogressModalComponent);
    modalRef.componentInstance.project = this.project;

    modalRef.result.then((result) => {
 
      if (result) {

        this.loadProject();
        
      }
      
    })
  }

  openChangeProjectManager(){
    
    const modalRef = this.modalService.open(ChangeManagerModalComponent);
    modalRef.componentInstance.project = this.project;

    modalRef.result.then((result) => {
 
      if (result) {

        this.loadProject();
        
      }
      
    })
  }


  openChangeTeamLeader(){
    
    const modalRef = this.modalService.open(ChangeLeaderModalComponent);
    modalRef.componentInstance.project = this.project;

    modalRef.result.then((result) => {
 
      if (result) {

        this.loadProject();
        
      }
      
    })
  }


  openReplan() {
    const modalRef = this.modalService.open(ProjectReplanModalComponent);
    modalRef.componentInstance.project = this.project;

    modalRef.result.then((result) => {
 
      if (result) {
 
        // Add the new project to the list
 
        this.loadProject();
        
      }
      
    }, (reason) => {
     
    
    });

  }
    
  
  openProjectComplete(){
    
    const modalRef = this.modalService.open(ProjectCompleteModalComponent);
    modalRef.componentInstance.project = this.project;

    modalRef.result.then((result) => {
 
      if (result) {
 
        this.loadProject();
        
      }
      
    }, (reason) => {
     
    
    });
  
  }

  openCancelComplete(){
    
    const modalRef = this.modalService.open(CancelProjectComponent);
    modalRef.componentInstance.project = this.project;

    modalRef.result.then((result) => {
 
      if (result) {
 
        this
        .router
        .navigate(['/'])
      
        
      }
      
    }, (reason) => {
     
    
    });
  
  }

  loadProject(){
    this
    .projectService
    .getProjectById(this.projectId)
    .subscribe({
      next :(data) => {
      
        if(
            data.projectManager.id == this.userService.getEmployeeId()
          ||data.teamLeader.id== this.userService.getEmployeeId()
          ||this.userService.hasRole(ROLES.SCIENTIFIC_DEPUTY)   ){

          this.project = {...data};
      
        }else{

          this.toastr.error('ليس مخولا لك الولوج إلى هذه الصفحة')
          this.router.navigate(['/forbiden'])
          

        } 
      },

      error : (err)=>{ 
        console.log(err)
      }
    
    });

  }
  public downloadAsPdf(): void {
    this.pdfDownloader.downloadAsPdf('pdfContent');
  }
 
}
