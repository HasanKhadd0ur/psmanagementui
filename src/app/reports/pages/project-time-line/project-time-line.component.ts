import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PdfDownloaderService } from '../../../core/services/pdfDownloader/pdf-downloader.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../projects/models/responses/project';
import { ReportsService } from '../../services/reports.service';
import { Step } from '../../../projects/models/responses/Step';

@Component({
  selector: 'project-time-line',
  templateUrl: './project-time-line.component.html',
  styleUrl: './project-time-line.component.css'
})
export class ProjectTimeLineComponent implements OnInit  {
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
