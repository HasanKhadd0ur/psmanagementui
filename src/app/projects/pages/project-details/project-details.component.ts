import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../../models/responses/project';
import { PdfDownloaderService } from '../../../core/services/pdfDownloader/pdf-downloader.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {
  project : Project
  @ViewChild('dataToExport', { static: false }) public dataToExport: ElementRef;
  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private pdfDownloader : PdfDownloaderService
    ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProjectById(id).subscribe({
      next :(data) => {
        
          this.project = data;
        
    },
    error : (err)=>{ console.log(err)}

  });
  }
  public downloadAsPdf(): void {
    this.pdfDownloader.downloadAsPdf('pdfContent');
  }
 
}
