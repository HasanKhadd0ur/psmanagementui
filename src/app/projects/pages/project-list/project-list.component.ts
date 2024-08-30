import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../core/services/loading/loading-service.service';
import { Project } from '../../models/responses/project';
import { ProjectService } from '../../services/project.service';
import { GetProjectsByProjectManagerRequest, GetProjectsByTeamLeaderRequest } from '../../models/requests/project-requests/GetProjectsByProjectManagerRequest';
import { UserService } from '../../../core/services/authentication/user.service';

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
    private route :ActivatedRoute,
    private userService : UserService,
    private loadingService: LoadingService
  ) {

  }

  ngOnInit(): void {

    this.loadProjects();
  }

  loadProjects():void{

    this.loadingService.show()
    this.handelAll()
   
  }

  handelAll() {
    this.projectService.getByFilter()
    .subscribe(
      {
        next: (res)=>{
          
            this.projects = res;
            this.toastr.success("تم تحميل المشاريع بنجاح");
              this.loadingService.hide()
        },
        error: (err)=>{
          this.toastr.error("لقد حدث خظاء ما");
          this.loadingService.hide()
        }
      }
    );
   }
   
  

   
}