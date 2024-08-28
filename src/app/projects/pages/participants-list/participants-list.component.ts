import { Component } from '@angular/core';
import { EmployeeParticipate } from '../../../employees/models/responses/employeeParticipate';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'bootstrap';

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
    public router :Router

  ) {
    
  }
  ngOnInit(): void {
    this.loadParticipations();

    this.isDetailMode=false;
  }

  onParticipantAdded(){
    this.closeModal('addParticipantModal')
    this.loadParticipations();
       
  }

  setSelectedParticipant(participant: EmployeeParticipate): void {
    this.selectedParticipant = participant;
  }

  onParticipantUpdated(): void {
    this.closeModal('editParticipantModal')
    this.loadParticipations();
  }

  onParticipantRemoved(): void {
    this.isDetailMode=false ;
    this.closeModal('removeParticipantModal')
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

  onDetailMode(participant: EmployeeParticipate) {
    this.selectedParticipant=participant ;
    this.isDetailMode=true;

  }
    

  closeModal(name :string) {
    const modal = document.getElementById(name);
    if (modal) {
      (modal as any).modal('hide');
    }
  }  
}
