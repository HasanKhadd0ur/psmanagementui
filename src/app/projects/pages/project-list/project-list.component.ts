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

  listType : string 
  
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

    this.route.queryParams.subscribe(params => {
      this.listType = params['listType'];
      }
    );

    this.loadProjects();
  }

  loadProjects():void{

    this.loadingService.show()
    switch (this.listType) {
      case 'all':
         this.handelAll()
        break;
      case 'managed':
        this.handelByManager()
        break;
      case 'leaded':
        this.handelByLeader()
        break;
       default :
        this.router.navigate(['/home'])
        this.toastr.error('لقد طلبت صفحة غير موجودة ')
        break ;

    }

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
   handelByManager(){

    let request :GetProjectsByProjectManagerRequest = {
      projectMangerId : this.userService.getEmployeeId(),
      pageNumber: null ,
      pageSize:null

    }

    this.projectService.getByProjectManger(request)
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
   handelByLeader(){
  
    let request :GetProjectsByTeamLeaderRequest  ={
      teamLeaderrId : this.userService.getEmployeeId(),
      pageNumber: null ,
      pageSize:null
      
    }

    this.projectService.getByTeamLeader(request)
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