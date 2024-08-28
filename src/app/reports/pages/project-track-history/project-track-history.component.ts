import { Component } from '@angular/core';
import { Track } from '../../../tracks/models/responses/track';
import { Project } from '../../../projects/models/responses/project';
import { ProjectService } from '../../../projects/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrackService } from '../../../tracks/services/track.service';
import { GetTracksByProjectRequest } from '../../../tracks/models/requests/GetTracksByProjectRequest';

@Component({
  selector: 'project-track-history',
  templateUrl: './project-track-history.component.html',
  styleUrl: './project-track-history.component.css'
})
export class ProjectTrackHistoryComponent {
  
  tracks :Track []
  project   : Project 
  projectId : number 

  constructor(

    private tostrService  :ToastrService ,
    private projectService : ProjectService,
    private trackService  : TrackService,
    private route : ActivatedRoute,
    private router : Router

  ){}

  ngOnInit(): void {
    
    this.projectId= Number(this.route.snapshot.paramMap.get('projectId'))

    this.loadTracks();
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


  loadTracks() {
    
    let request : GetTracksByProjectRequest ={
      projectId : this.projectId ,
      pageNumber : null ,
      pageSize :null
    }
    
    this
    .trackService
    .getTrackByProjectId(request)
    .subscribe({
      next: (data)=>{

        this.tostrService.success('تم تحميل التقرير بنجاح')
        this.tracks=data
      }
    });
  }
  

}
