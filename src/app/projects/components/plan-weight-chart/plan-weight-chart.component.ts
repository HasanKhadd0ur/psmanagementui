import { Component, Input, OnInit } from '@angular/core';
import { Step } from '../../models/responses/Step';
import { ChartOptions, ChartType } from 'chart.js';



@Component({
  selector: 'plan-weight-chart',
  templateUrl: './plan-weight-chart.component.html',
  styleUrl: './plan-weight-chart.component.css'
})
export class PlanWeightChartComponent  implements OnInit{

  @Input() steps : Step[]
  pieChartData: any;
  barChartData: any;
  
  pieChartOptions: ChartOptions;

  barChartOptions: ChartOptions;

  ngOnInit(): void {
    this.preparePieChartData();
  }

  preparePieChartData(): void {
    // Prepare data for the pie chart
    this.barChartData = {
      labels: this.steps.map(step => step.stepInfo.stepName),
      datasets: [
        {
          label: 'نسب إنجاز المراحل',
          data: this.steps.map(step => step.currentCompletionRatio),
          backgroundColor:this.steps.map(e =>this.getRandomColor()),
          hoverBackgroundColor: this.steps.map(e=> this.getRandomColor())
        }
      ]


    };

    this.pieChartData = {
      labels: this.steps.map(step => step.stepInfo.stepName),
      datasets: [
        {
          label:'أوزان المراحل',
          data: this.steps.map(step => step.weight),
          backgroundColor:this.steps.map(e =>this.getRandomColor()),
          hoverBackgroundColor: this.steps.map(e=> this.getRandomColor())
        }
      ]


    };

    
    // Set up chart options
    this.pieChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => `ثقل ${tooltipItem.label}: ${tooltipItem.raw}%`
          }
        }
      }
    };

    this.barChartOptions = {
      responsive: true,

      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem ) => `نسبة إنجاز ${tooltipItem.label}: ${tooltipItem.raw}%`
          }
        }
      }
    };


  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
