import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../core/services/loading/loading-service.service';
import { Project } from '../../models/responses/project';
import { ProjectService } from '../../services/project.service';
import { GetProjectsByProjectManagerRequest, GetProjectsByTeamLeaderRequest } from '../../models/requests/project-requests/GetProjectsByProjectManagerRequest';
import { UserService } from '../../../core/services/authentication/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterModalComponent } from '../../components/filter-modal/filter-modal.component';
import { GetProjecByFilterRequest } from '../../models/requests/project-requests/getProjectAttachmentsRequest';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent  implements OnInit{

  projects : Project[]
  request :GetProjecByFilterRequest

  constructor(
    private projectService : ProjectService,
    private toastr: ToastrService,
    public router: Router,
    private route :ActivatedRoute,
    private userService : UserService,
    private modalService :NgbModal,
    private loadingService: LoadingService
  ) {

  }

  ngOnInit(): void {

    this.loadProjects();
  }

  loadProjects():void{

    this.loadingService.show()
    if(this.request){

      this.handleByFilter();
    }else {


      this.handelAll()
   
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
   


   handleByFilter() {

    this
    .projectService
    .getByRequestFilter(this.request)
    .subscribe(
      {
        next: (res)=>{
          
            this.projects = res;
            this.loadingService.hide()
        },
        error: (err)=>{
          this.toastr.error("لقد حدث خظاء ما");
          this.loadingService.hide()
        }
      }
    );
   }
   


   openFilter() {

        
    const modalRef = this.modalService.open(FilterModalComponent);
 
    modalRef.result.then(
      (data :GetProjecByFilterRequest) => {
 
      if (data ) {
 
        this.request=data;
        this.loadProjects();
        
      }
      
    },
     (reason) => {
     
    
   });
   }    

   
}