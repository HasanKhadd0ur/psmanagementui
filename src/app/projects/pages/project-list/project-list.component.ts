import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../core/services/loading/loading-service.service';
import { Project } from '../../models/responses/project';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent  implements OnInit{

  projects : Project[]
  constructor(
    private projectService : ProjectService,
    private toastr: ToastrService,
    public router: Router,
    private loadingService: LoadingService
  ) {

  }

  ngOnInit(): void {
   this.loadProjects();
    
  }

  loadProjects():void{

    this.projectService.getByFilter()
      .subscribe(
        {
          next: (res)=>{
            if(res.isSuccess){
              this.projects = res.value;
              this.toastr.success("تم تحميل المشاريع بنجاح");
            }

          },
          error: (err)=>{
            this.toastr.error("لقد حدث خظاء ما");
          }
        }
      );
  }

}
