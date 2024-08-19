import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../../models/responses/project';

@Component({
  selector: 'project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {
  project : Project
   
  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProjectById(id).subscribe({
      next :(data) => {
        console.log(data.validationErrors)
          
        if(data.isSuccess){
          this.project = data.value;
        }else {
          this.toastr.error(data.validationErrors[0].errorMessage);
          // this.router()

        }
    },
    error : (err)=>{ console.log(err)}

  });
  }
 
}
