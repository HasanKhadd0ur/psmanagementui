import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddTrackModalComponent } from '../../components/modals/add-track-modal/add-track-modal.component';
import { GetTracksByProjectRequest } from '../../models/requests/GetTracksByProjectRequest';
import { RemoveTrackRequest } from '../../models/requests/RemoveTrackRequest';
import { Track } from '../../models/responses/track';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'project-track-history',
  templateUrl: './project-track-history.component.html',
  styleUrl: './project-track-history.component.css'
})
export class ProjectTrackHistoryComponent {

  projectId : number 
  tracks : Track[]
  selectedItem : Track
  modalMode: 'edit' | 'delete' = 'edit';
  modalTitle: string = '';


  constructor(

    private route :ActivatedRoute ,
    private router :Router,
    private trackService : TrackService,
    private toastr : ToastrService,
    private modalService : NgbModal
  ){

  }

  ngOnInit(): void {
    this.projectId=Number(this.route.snapshot.paramMap.get('id'));
    this.loadTracks();

  }

  loadTracks(){

    let request : GetTracksByProjectRequest = {
      projectId: this.projectId ,
      pageNumber:null,
      pageSize:null
    }
    this.trackService
    .getTrackByProjectId(request)
    .subscribe({

      next : (data)=>{

        this.toastr.success("تم تحميل عمليات المتابعة بنجاح");
        this.tracks= data.sort((e1,e2)=> Number(e1.trackInfo.trackDate > e2.trackInfo.trackDate));

      }
      ,
      error:(err)=>{

        this.toastr.error("لقد حدث خطاء ما")

      }

    });


  }

  openAddModal(): void {
    const modalRef = this.modalService.open(AddTrackModalComponent);
    modalRef.componentInstance.projectId = this.projectId;

    modalRef.result.then((result) => {
      if (result) {

        this.tracks.push(result);
        this.toastr.success("تمت الإضافة بنجاح")
      }
    }, (reason) => {

    });
  }
  openModal(mode: 'edit' | 'delete', item: Track): void {
    this.modalMode = mode;
    this.selectedItem = { ...item }; // Clone project to prevent direct mutation
    console.log(this.selectedItem)
    if (mode === 'edit') {
      this.modalTitle = 'تعديل عنصر ';
    } else if (mode === 'delete') {
      this.modalTitle = 'حذف عنصر';
    }

    const modalElement = document.getElementById('trackModal');
    if (modalElement) {
      new Modal(modalElement).show(); // Open the modal
    }
  }


  deleteTrack(): void {
    let request : RemoveTrackRequest= {
      trackId: this.selectedItem.id ,
    } 

    this.trackService.removeTrack(request).subscribe({

      next :()=>{
        this.tracks = this.tracks.filter(p => p.id !== this.selectedItem.id);
        this.toastr.success("تم الحذف بنجاح")
        this.closeModal();
        
      }
      ,
      error:(err)=>{
        this.toastr.error("لقد حدث خطاء ما ")
      
        this.closeModal();
      }


    }
  );

  }

  closeModal(): void {
    const modalElement = document.getElementById('trackModal');
    if (modalElement) {
      new Modal(modalElement).hide(); // Close the modal
    }
  }

}
