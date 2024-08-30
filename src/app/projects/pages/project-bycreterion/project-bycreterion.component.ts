import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../core/services/authentication/user.service';
import { LoadingService } from '../../../core/services/loading/loading-service.service';
import { GetProjectsByProjectManagerRequest, GetProjectsByTeamLeaderRequest } from '../../models/requests/project-requests/GetProjectsByProjectManagerRequest';
import { Project } from '../../models/responses/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'project-bycreterion',
  templateUrl: './project-bycreterion.component.html',
  styleUrl: './project-bycreterion.component.css'
})
export class ProjectBycreterionComponent {

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
