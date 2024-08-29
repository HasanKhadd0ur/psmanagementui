import { Component, Input } from '@angular/core';
import { EmployeeTrack } from '../../models/responses/employeeTrack';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { UpdateWorkModalComponent } from '../modals/update-work-modal/update-work-modal.component';
import { UpdateEmployeeWorkTrackRequest } from '../../models/requests/UpdateEmployeeWorkTrackRequest';

@Component({
  selector: 'employee-track',
  templateUrl: './employee-track.component.html',
  styleUrl: './employee-track.component.css'
})
export class EmployeeTrackComponent {

  @Input()  employeeTrack :EmployeeTrack 
  @Input() projectId :number

  constructor(

    private modalService : NgbModal

  ){}

  openEditModal(): void {

    console.log(this.employeeTrack)
    const modalRef = this.modalService.open(UpdateWorkModalComponent ,{size:'lg'});
    modalRef.componentInstance.employeeTrack=this.employeeTrack;

    modalRef.componentInstance.employee =this.employeeTrack.employee;


    modalRef.result.then((result :UpdateEmployeeWorkTrackRequest) => {
      if (result) {
        this.employeeTrack.employeeWork={...result.employeeWork}
        this.employeeTrack.employeeWorkInfo={...result.employeeWorkInfo}
        this.employeeTrack.notes=result.notes
        
    
      }
    }, (reason) => {
      

    });
  }

}
