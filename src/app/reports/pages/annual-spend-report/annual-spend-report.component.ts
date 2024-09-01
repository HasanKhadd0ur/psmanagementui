import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfDownloaderService } from '../../../core/services/pdfDownloader/pdf-downloader.service';
import { Project } from '../../../projects/models/responses/project';
import { ReportsService } from '../../services/reports.service';
import { FinancialSpending } from '../../../projects/models/responses/financialSpending';

@Component({
  selector: 'annual-spend-report',
  templateUrl: './annual-spend-report.component.html',
  styleUrl: './annual-spend-report.component.css'
})
export class AnnualSpendReportComponent {
  project : Project

  spend :FinancialSpending[]
  constructor(
    private reportsService : ReportsService,
    private route :ActivatedRoute,
    private pdfDownloader : PdfDownloaderService

  ){}
  ngOnInit(): void {
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
 
    this
    .reportsService
    .getProjectById(id)
    .subscribe({
      next :(data) => {
        
        debugger
        this.project = data;
        this.spend=FinancialSpending.aggregateSpendingByYearAndCurrency(data.financialSpending)
      },

      error : (err)=>{ console.log(err)}
    });
 
  }

  public downloadAsPdf(): void {
    this.pdfDownloader.downloadAsPdf('pdfContent');
  }

}
