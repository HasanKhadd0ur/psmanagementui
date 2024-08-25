import { Component, Input } from '@angular/core';
import { Project } from '../../../models/responses/project';

@Component({
  selector: 'report-controll',
  templateUrl: './report-controll.component.html',
  styleUrl: './report-controll.component.css'
})
export class ReportControllComponent {

  @Input() project : Project 
}
