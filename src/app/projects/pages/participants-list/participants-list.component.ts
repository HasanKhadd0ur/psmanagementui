import { Component } from '@angular/core';
import { EmployeeParticipate } from '../../../employees/models/responses/employeeParticipate';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'bootstrap';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddParticipantModalComponent } from '../../components/modals/add-participant-modal/add-participant-modal.component';
import { ModalService } from '../../../core/services/modals/modal.service';
import { NgModel } from '@angular/forms';
import { RemoveParticipantModalComponent } from '../../components/modals/remove-participant-modal/remove-participant-modal.component';
import { EditParticipantModalComponent } from '../../components/modals/edit-participant-modal/edit-participant-modal.component';
import { ChangeEmployeeParticipationRequest } from '../../models/requests/project-requests/ChangeEmployeeParticipationRequest';

@Component({
  selector: 'participants-list',
  templateUrl: './participants-list.component.html',
  styleUrl: './participants-list.component.css'
})
export class ParticipantsListComponent {
  participants : EmployeeParticipate[]
  selectedParticipant: EmployeeParticipate;

  isDetailMode : boolean =false 
  
  projectId = Number(this.route.snapshot.paramMap.get('id'));
  constructor(
    private projectService :ProjectService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    private activeModal : NgbModal,
    public router :Router,
    private modalService :NgbModal

  ) {
    
  }
  ngOnInit(): void {
    this.loadParticipations();

    this.isDetailMode=false;
  }

  onParticipantAdded(){
    this.activeModal.dismissAll();
    this.loadParticipations();
       
  }

  setSelectedParticipant(participant: EmployeeParticipate): void {
    this.selectedParticipant = participant;
  }

  onParticipantUpdated(): void {

    this.loadParticipations();
  }

  onParticipantRemoved(): void {
  //  this.closeModal('removeParticipantModal')
    this.activeModal.dismissAll();
    this.isDetailMode=false ;
    this.loadParticipations();
  }

   loadParticipations(): void{

    this.projectService.getParticipants(this.projectId).subscribe({
      next: (data)=> {
        if(!this.participants){
          this.toastr.success("تم تحميل المراحل بنجاح");
     
        }
        this.participants= data 
      }
      ,

      error:(err)=>{
        console.log(err)
        this.toastr.error("لقد حدث خطاء ما")
      }
    })

  }

  
  openDeleteModal(): void {

    const modalRef = this.modalService.open(RemoveParticipantModalComponent);
    modalRef.componentInstance.participant = this.selectedParticipant;
    

    modalRef.result.then((result) => {
      if (result) {
        // Add the new project to the list
          this.isDetailMode=false ;
          this.participants=this.participants.filter(w => w.employeeId != this.selectedParticipant.employeeId)
                  

      }
    }, (reason) => {
      

    });
  }
openUpdateModal(): void {

    const modalRef = this.modalService.open(EditParticipantModalComponent);
    modalRef.componentInstance.participant = this.selectedParticipant;
    

    modalRef.result.then((result : ChangeEmployeeParticipationRequest) => {
      if (result ) {

        let part= this.participants.find(w => w.employeeId == this.selectedParticipant.employeeId)
                 
        part!.partialTimeRatio=result.partialTimeRation;
        this.selectedParticipant.partialTimeRatio=result.partialTimeRation
        this.selectedParticipant.role=result.role
        part!.role=result.role;
        
        

      }
    }, (reason) => {
      

    });
  }

  onDetailMode(participant: EmployeeParticipate) {
    this.selectedParticipant=participant ;
    this.isDetailMode=true;

  }
  openAddModal(): void {

    const modalRef = this.activeModal.open(AddParticipantModalComponent );
    modalRef.componentInstance.projectId =this.projectId;
    modalRef.componentInstance.paticipants = this.participants;
    modalRef.componentInstance.participantAdded
    .subscribe({

      next: ()=>{

        this.activeModal.dismissAll();
        this.loadParticipations();
      }
    });
    modalRef.result.then((result) => {
      if (result) {
        // Add the new project to the list
        
        this.loadParticipations();

      }
    }, (reason) => {
      

    });
  }

  closeModal(name :string) {
    this.activeModal.dismissAll();
    
  }  
}
