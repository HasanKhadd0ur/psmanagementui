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
 
        // Add the new project to the list
 
        this.loadProject();
        
      }
      
    }, (reason) => {
     
    
    });
  
  }
  openRepan() {
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
 
        // Add the new project to the list
 
        this.loadProject();
        
      }
      
    }, (reason) => {
     
    
    });
  
  }

  public downloadAsPdf(): void {
    this.pdfDownloader.downloadAsPdf('pdfContent');
  }
 
  loadProject(){
    this
    .projectService
    .getProjectById(this.projectId)
    .subscribe({
      next :(data) => {
        
        this.project = data;
      },

      error : (err)=>{ 
        console.log(err)
      }
    
    });

  }
}
