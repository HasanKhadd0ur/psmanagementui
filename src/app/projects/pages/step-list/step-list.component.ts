import { Component, NgModuleRef } from '@angular/core';
import { Step } from '../../models/responses/Step';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { StepService } from '../../services/step.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddStepModalComponent } from '../../components/modals/add-step-modal/add-step-modal.component';
import { Modal } from 'bootstrap';
@Component({
  selector: 'step-list',
  templateUrl: './step-list.component.html',
  styleUrl: './step-list.component.css'
})
export class StepListComponent {
  steps : Step[]
  modalMode: 'edit' | 'delete' = 'edit';
  modalTitle: string = '';
  selectedItem : Step;
  projectId = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private stepService :StepService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    public router :Router,
    private modalService: NgbModal
  ) {
    
  }
  ngOnInit(): void {
    this.loadParticipations();

  }


  loadParticipations(): void{

    this.stepService.getStepsByProject(this.projectId).subscribe({
      next: (data)=> {
        this.steps= data 
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
      
      this.toastr.error("لقد حدث خطاء ما")

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

  delete(): void {
    

    this.stepService.deleteSep(this.selectedItem.id).subscribe({

      next :()=>{
        this.steps = this.steps.filter(p => p.id !== this.selectedItem.id);
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
  const modalElement = document.getElementById('stepModal');
  if (modalElement) {
    new Modal(modalElement).hide(); // Close the modal
  }
}

}
