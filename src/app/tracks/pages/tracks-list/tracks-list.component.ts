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
  month: Date;

  tracks : Track[]|null


  constructor(

    private route :ActivatedRoute ,
    private router :Router,
    private trackService : TrackService,
    private toastr : ToastrService,
    private modalService : NgbModal
  ){

  }

  ngOnInit(): void {
    this.loadTracks();

  }

  loadTracks(){

    this.trackService
    .getTracks()
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

  onFilter() {
  if(this.month){

    this.tracks = null ;
    this.trackService
    .getTracks()
    .subscribe({

      next : (data)=>{

        this.tracks= data;
        this.tracks=this.tracks!.filter(e =>new Date(e.trackInfo.trackDate).getMonth() == new Date(this.month).getMonth())

      }
      ,
      error:(err)=>{

        this.toastr.error("لقد حدث خطاء ما")

      }

    });



  }

  }

}
