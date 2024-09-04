import { Component, OnInit } from '@angular/core';
import { ProjectType } from '../../models/responses/projectType';
import { ProjectsTypesService } from '../../services/projects-types.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'bootstrap';
import { UpdateTypeRequest } from '../../models/requests/updateProjectTypeRequest';
import { UserService } from '../../../core/services/authentication/user.service';
import { ROLES } from '../../../core/constants/roles';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RemoveTyoeModalComponent } from '../../components/remove-tyoe-modal/remove-tyoe-modal.component';
import { EditTypeModalComponent } from '../../components/edit-type-modal/edit-type-modal.component';

@Component({
  selector: 'types-detail',
  templateUrl: './types-detail.component.html',
  styleUrl: './types-detail.component.css'
})
export class TypesDetailComponent implements OnInit{

  type :ProjectType
  selectedtype :ProjectType

  modalMode: 'edit' | 'delete' = 'edit';
  modalTitle: string = '';

  constructor(
    private typeService : ProjectsTypesService,
    private route : ActivatedRoute,
    private toastr : ToastrService,
    private router : Router,
    private modalService :NgbModal,
    private userService :UserService

  ){}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.typeService.getTypeById(id).subscribe({
      next :(data) => {
        
         this.type = data;
         this.selectedtype={...this.type}
     
    },
    error : (err)=>{ 
      console.log(err)
      this.toastr.error('لقد حدث خطاء ما');
    }

  });
  }
  
  openModal(mode: 'edit' | 'delete'): void {
    this.modalMode = mode;
    
    if (mode === 'edit') {
      this.modalTitle = 'تعديل نوع مشروع ';
    } else if (mode === 'delete') {
      this.modalTitle = 'حذف نوع مشروع';
    }

    const modalElement = document.getElementById('typeModal');
    if (modalElement) {
      new Modal(modalElement).show(); // Open the modal
    }
  }

  openDeleteModal(item : ProjectType): void {
    const modalRef = this.modalService.open(RemoveTyoeModalComponent);
    
    modalRef.componentInstance.selectedItem = this.type;

    modalRef.result.then((result : number ) => {
      if (result) {

        this.router.navigate(['/types'])
      }
    }, (reason) => {

    });
  }

  openEditModal(item : ProjectType): void {
    const modalRef = this.modalService.open(EditTypeModalComponent);
    
    modalRef.componentInstance.selectedItem = item;

    modalRef.result.then((result : UpdateTypeRequest ) => {
      if (result) {

        let sp = this.type;
        
       sp!.description=result.description
       sp!.expectedEffort=result.expectedEffort
       sp!.expectedNumberOfWorker=result.expectedNumberOfWorker
       sp!.typeName=result.typeName
       
       

      }
    }, (reason) => {

    });
  }



  saveType(): void {
    
    let request : UpdateTypeRequest ={
      ...this.selectedtype,
    }

    this.typeService.updateType(this.selectedtype.id,request).subscribe({
      next :()=>{
   

        this.type={...this.selectedtype};
        this.closeModal();
      
      }
      ,
      error:(err)=>{
        this.toastr.error("لقد حدث خطاء ما ")
      
        this.closeModal();
      }

    })
  
  }

  delete(): void {

    this.typeService.delete(this.type.id).subscribe({

      next :()=>{
        this.router.navigate(['/types'])
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
    const modalElement = document.getElementById('typeModal');
    if (modalElement) {
      new Modal(modalElement).hide(); // Close the modal
    }
  }
  canEdit(): boolean {
    return this.userService.hasRole(ROLES.PROJECTS_PLANNER);
  }



}
