import { Component, Input, OnInit } from '@angular/core';
import { EmployeeWork } from '../../../models/valueObjects/EmployeeWork';
import { Employee } from '../../../../employees/models/responses/employee';
import { ProjectService } from '../../../../projects/services/project.service';
import { UpdateEmployeeWorkTrackRequest } from '../../../models/requests/UpdateEmployeeWorkTrackRequest';
import { EmployeeTrack } from '../../../models/responses/employeeTrack';
import { TrackService } from '../../../services/track.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'update-work-modal',
  templateUrl: './update-work-modal.component.html',
  styleUrl: './update-work-modal.component.css'
})
export class UpdateWorkModalComponent implements OnInit {

  @Input() employeeTrack : EmployeeTrack

  @Input() employee :Employee

  request : UpdateEmployeeWorkTrackRequest

  constructor(
    private toastr :ToastrService,
    public activeModal: NgbActiveModal,
    private trackService :TrackService 
  ){}


  ngOnInit(): void {
    this.request={
      employeeId:this.employee.id,
      employeeTrackId:this.employeeTrack.trackId,
      employeeWork:{...this.employeeTrack.employeeWork},
      employeeWorkInfo:{...this.employeeTrack.employeeWorkInfo},
      notes:this.employeeTrack.notes,
      trackId:this.employeeTrack.trackId
      
    }

  }

  onSubmit(){

    debugger;
    this
    .trackService
    .updateEmployeeWorkTrack(this.request)
    .subscribe({
      next:()=>{
        this.activeModal.close(this.request);
      }
      ,
      error:(err)=>{
        this.toastr.error('لقد حدث خطاء ما')
      }
    });
  }


  onClose(){
    this.activeModal.close();
  }
}
