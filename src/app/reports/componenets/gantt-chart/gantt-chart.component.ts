import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Step } from '../../../projects/models/responses/Step';
import { ActivatedRoute } from '@angular/router';
import { PdfDownloaderService } from '../../../core/services/pdfDownloader/pdf-downloader.service';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrl: './gantt-chart.component.css'
})
export class GanttChartComponent implements OnInit ,AfterViewInit {
  @Input() steps :Step[]
  constructor(

  ){}
  ngOnInit(): void {
    
  }


  ngAfterViewInit(): void {
    this.initGanttChart();
  }


  initGanttChart(): void {
    const gantt = (window as any).gantt;

    gantt.config.date_format = "%Y-%m-%d";
    gantt.config.column_width = 50;
    gantt.config.scale_height = 50;
    gantt.config.subscales = [
      { unit: "day", step: 1, date: "%d %M" }
    ];
    gantt.config.scale_unit = "month";
    gantt.config.date_scale = "%F, %Y";
    gantt.config.sort = true;

    const ganttContainer = document.getElementById('gantt_here');
    if (ganttContainer) {
      gantt.init(ganttContainer);  // Pass the actual element
      gantt.parse(this.formatDataForGantt(this.steps));
    } else {
      console.error("Gantt container element not found.");
    }

  }

  formatDataForGantt(steps: Step[]): any {
    debugger 
    return {

      data: steps.map(step => ({
        id: step.id,
        text: step.stepInfo.stepName,
        start_date: step.stepInfo.startDate,
        duration: step.stepInfo.duration,
        progress: step.currentCompletionRatio
      })),
      links: []
    };
  }

}
