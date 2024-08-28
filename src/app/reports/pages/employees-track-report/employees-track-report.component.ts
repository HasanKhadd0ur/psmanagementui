import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../projects/services/project.service';
import { TrackService } from '../../../tracks/services/track.service';
import { Track } from '../../../tracks/models/responses/track';
import { EmployeeTrack } from '../../../tracks/models/responses/employeeTrack';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../projects/models/responses/project';
import { data } from 'jquery';

@Component({
  selector: 'employees-track-report',
  templateUrl: './employees-track-report.component.html',
  styleUrl: './employees-track-report.component.css'
})
export class EmployeesTrackReportComponent implements OnInit{

  trackId :number 
  projectId :number 
  project :Project
  track : Track
  employeesTrack : EmployeeTrack[]


  constructor(

    private tostrService  :ToastrService ,
    private projectService : ProjectService,
    private trackService  : TrackService,
    private route : ActivatedRoute,
    private router : Router

  ){}

  ngOnInit(): void {
    
    this.trackId= Number(this.route.snapshot.paramMap.get('id'))
    this.projectId= Number(this.route.snapshot.paramMap.get('projectId'))

    this.loadTracks();
    this.loadEmployeeTrack();
    this.loadProject()
  }


  loadProject() {
    this
    .projectService
    .getProjectById(this.projectId)
    .subscribe({
      next : (data)=>{
        this.project=data;
      }
    });
  }


  loadEmployeeTrack() {
    this
    .trackService
    .getEmployeesTrackById(this.trackId)
    .subscribe({
      next: (data)=>{

        this.tostrService.success('تم تحميل التقرير بنجاح')
        this.employeesTrack=data
      }
    });
  }
  loadTracks() {
    this
    .trackService
    .getByTrackById(this.trackId)
    .subscribe({
      next : (data)=>{
        this.track = data;
      }
    });
  }



}
