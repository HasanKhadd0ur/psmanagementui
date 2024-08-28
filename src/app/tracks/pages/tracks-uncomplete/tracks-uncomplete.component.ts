import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrackService } from '../../services/track.service';
import { Track } from '../../models/responses/track';
import { ActivatedRoute } from '@angular/router';
import { Toast } from 'bootstrap';

@Component({
  selector: 'tracks-uncomplete',
  templateUrl: './tracks-uncomplete.component.html',
  styleUrl: './tracks-uncomplete.component.css'
})
export class TracksUncompleteComponent implements OnInit {

  projectId : number 

  tracks : Track[]
  constructor(
    private route : ActivatedRoute,
    private toastrService : ToastrService ,
    private trackService : TrackService 

  ){}

  ngOnInit(): void {
    this.projectId= Number(this.route.snapshot.paramMap.get('id'))
    
    this.loadUncompletedTracks();
  }

  loadUncompletedTracks() {
    this
    .trackService
    .getUnCompletedTrack()
    .subscribe({
      next :(data)=>{
        this.tracks=data
      },
      error:(err)=>{
        this.toastrService.error('تعذر تحميل المتابعات غير المكتملة')
      }
    })
  }
}
