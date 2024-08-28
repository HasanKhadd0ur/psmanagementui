//#region  Imports
import { Component, OnInit } from '@angular/core';
import { Project } from '../../../projects/models/responses/project';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../projects/services/project.service';
import { ProjectCompletion } from '../../../projects/models/responses/ProjectCompletion';
import { EmployeeContribution } from '../../../projects/models/responses/employeeContribution';
import { Track } from '../../../tracks/models/responses/track';
import { PdfDownloaderService } from '../../../core/services/pdfDownloader/pdf-downloader.service';
//#endregion  Imports


@Component({
  selector: 'project-completion',
  templateUrl: './project-completion.component.html',
  styleUrl: './project-completion.component.css'
})
export class ProjectCompletionComponent implements OnInit{
  
  //#region  Propoerrties
  projectId : number 
  project :Project
  completion : ProjectCompletion
  contributers : EmployeeContribution[]
  tracks : Track[]
  iscalculated :boolean =false 
  //#endregion  Propoerrties
  

  //#region  Constructors
  constructor (

    private route :ActivatedRoute ,
    private projectService : ProjectService,
    private router :Router,
    private pdfDownloader : PdfDownloaderService,
    private toastr :ToastrService 

  ){}

  //#endregion  Constructors
 
 
  //#region  Oninit

  ngOnInit(): void {
  
    this.projectId= Number(this.route.snapshot.paramMap.get('id'))
    this
    .projectService
    .getProjectById(this.projectId)
    .subscribe({
      next:(data)=>{
        this.project=data ;
        if(this.project.currentState.toLowerCase()!="completed"){
          
          this.toastr.error('المشروع لم ينجز بعد');
          this.router.navigate(['/']);
        }else {
          this.loadCompletion();
          this.loadContributions();
        }
      }
    });
  }
  //#endregion  Oninit

  
  //#region  Loaders
  loadContributions() {
    this
    .projectService
    .getCompletionContribution(this.projectId)
    .subscribe({

      next : (data)=>{

        this.contributers= data;
      }

    });
  }


  loadCompletion() {
    this
    .projectService
    .getProjectCompletion(this.projectId)
    .subscribe({
      next:(data)=>{
        this.completion= data;
        
      }
    });
  }

  public downloadAsPdf(): void {
    this.pdfDownloader.downloadAsPdf('pdfContent');
  }

    //#endregion  Loaders
}
