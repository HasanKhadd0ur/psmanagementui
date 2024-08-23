import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../projects/models/responses/project';
import { PdfDownloaderService } from '../../../core/services/pdfDownloader/pdf-downloader.service';

@Component({
  selector: 'project-definition',
  templateUrl: './project-definition.component.html',
  styleUrl: './project-definition.component.css'
})
export class ProjectDefinitionComponent  implements OnInit{
  project : Project

  constructor(
    private reportsService : ReportsService,
    private route :ActivatedRoute,
    private pdfDownloader : PdfDownloaderService

  ){}
  ngOnInit(): void {
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.reportsService.getProjectById(id).subscribe({
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
