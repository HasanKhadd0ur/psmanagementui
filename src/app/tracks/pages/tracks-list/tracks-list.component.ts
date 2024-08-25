import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackService } from '../../services/track.service';
import { Track } from '../../models/responses/track';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTrackModalComponent } from '../../components/modals/add-track-modal/add-track-modal.component';
import { GetTracksByProjectRequest } from '../../models/requests/GetTracksByProjectRequest';
import { Modal } from 'bootstrap';
import { RemoveTrackRequest } from '../../models/requests/RemoveTrackRequest';

@Component({
  selector: 'tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrl: './tracks-list.component.css'
})
export class TracksListComponent implements OnInit{

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
        this.tracks= data;

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
      trackId: this.projectId ,
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
