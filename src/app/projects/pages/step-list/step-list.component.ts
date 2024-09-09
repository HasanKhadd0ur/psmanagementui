import { Component, NgModuleRef } from '@angular/core';
import { Step } from '../../models/responses/Step';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { StepService } from '../../services/step.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddStepModalComponent } from '../../components/modals/add-step-modal/add-step-modal.component';
import { Modal } from 'bootstrap';
import { RemoveStepModalComponent } from '../../components/steps/remove-step-modal/remove-step-modal.component';
import { EditStepModalComponent } from '../../components/step-modals/edit-step-modal/edit-step-modal.component';
import { EditWeightModalComponent } from '../../components/step-modals/edit-weight-modal/edit-weight-modal.component';
import { ChangeStepInfoRequest } from '../../models/requests/step-requests/changeStepInfoRequest';
import { Project } from '../../models/responses/project';
@Component({
  selector: 'step-list',
  templateUrl: './step-list.component.html',
  styleUrl: './step-list.component.css'
})
export class StepListComponent {

  isToggled=true
  steps : Step[]
  project : Project
  modalMode: 'edit' | 'delete' = 'edit';
  modalTitle: string = '';
  selectedItem : Step;
  projectId = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private stepService :StepService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    public router :Router,
    private projectService : ProjectService,
    private modalService: NgbModal
  ) {
    
  }
  ngOnInit(): void {
    this.loadParticipations();

  }


  loadParticipations(): void{

    this.projectService.getProjectById(this.projectId).subscribe({
      next: (data)=> {
        this.steps= data.steps.sort( (e,p)=> Number(new Date (e.stepInfo.startDate)) - Number(new Date(p.stepInfo.startDate)) )
        this.project=data;
        this.toastr.success("تم تحميل المراحل بنجاح");
      }
      ,

      error:(err)=>{
        console.log(err)
        this.toastr.error("لقد حدث خطاء ما")
      }
    })

  }

  openAddModal(): void {
    const modalRef = this.modalService.open(AddStepModalComponent, { size: 'lg' });
    modalRef.componentInstance.projectId = this.projectId;

    modalRef.result.then((result) => {
      if (result) {
        // Add the new project to the list
        this.steps.push(result);
        
      }
    }, (reason) => {
      

    });
  }

  openChangeWeightModal(step :Step): void {
    const modalRef = this.modalService.open(EditWeightModalComponent);
    modalRef.componentInstance.weight = step.weight;
    modalRef.componentInstance.stepInfo = step.stepInfo;
    modalRef.componentInstance.stepId = step.id;

    modalRef.result.then((result) => {
      if (result) {
        // Add the new project to the list
        step.weight=result  
        this.selectedItem={...step}
      }
    }, (reason) => {
      

    });
  }

  openEditModal(step : Step): void {

    const modalRef = this.modalService.open(EditStepModalComponent ,{size:'lg'});
    modalRef.componentInstance.stepInfo = step.stepInfo;
    modalRef.componentInstance.stepId = step.id;

    modalRef.result.then((result : ChangeStepInfoRequest) => {
      if (result) {
        // Add the new project to the list
        step.stepInfo={...result.stepInfo};

      }
    }, (reason) => {
      

    });
  }

  
  openDelteModal(step : Step): void {

    const modalRef = this.modalService.open(RemoveStepModalComponent);
    modalRef.componentInstance.step = step;
    
    modalRef.result.then((result ) => {
      if (result) {
        // Add the new project to the list
        
        this.delete(step.id)

      }
    }, (reason) => {
      

    });
  }


  openModal(mode: 'edit' | 'delete', item: Step): void {
    this.modalMode = mode;
    this.selectedItem = { ...item }; // Clone project to prevent direct mutation
    console.log(this.selectedItem)
    if (mode === 'edit') {
      this.modalTitle = 'تعديل عنصر ';
    } else if (mode === 'delete') {
      this.modalTitle = 'حذف عنصر';
    }

    const modalElement = document.getElementById('stepModal');
    if (modalElement) {
      new Modal(modalElement).show(); // Open the modal
    }
  }

  delete(id :number ): void {
    
        this.steps = this.steps.filter(p => p.id !== id);
        this.toastr.success("تم الحذف بنجاح")
    

}

closeModal(): void {
  const modalElement = document.getElementById('stepModal');
  if (modalElement) {
    new Modal(modalElement).hide(); // Close the modal
  }
}

canSee(){
  return this.project.currentState.toLocaleLowerCase()=='inplan'
}
toggle() {
  this.isToggled=!this.isToggled
}
  
}
