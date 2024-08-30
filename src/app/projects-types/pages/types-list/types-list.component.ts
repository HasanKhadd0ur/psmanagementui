import { Component } from '@angular/core';
import { ProjectsTypesService } from '../../services/projects-types.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'bootstrap';
import { ProjectType } from '../../models/responses/projectType';
import { UpdateTypeRequest } from '../../models/requests/updateProjectTypeRequest';
import { ROLES } from '../../../core/constants/roles';
import { UserService } from '../../../core/services/authentication/user.service';

@Component({
  selector: 'types-list',
  templateUrl: './types-list.component.html',
  styleUrl: './types-list.component.css'
})
export class TypesListComponent {
  types :ProjectType[]
  selectedItem : ProjectType;

  modalMode: 'edit' | 'delete' = 'edit';
  modalTitle: string = '';

  constructor(
    private typeService : ProjectsTypesService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    public router :Router,
    private modalService: NgbModal,
    private userService :UserService

  ) {
    
  }
  ngOnInit(): void {
    this.loadTypes();
    this.selectedItem =new ProjectType();
  }


  loadTypes(): void{

    this.typeService.getAllTypes().subscribe({
      next: (data)=> {
        this.types= data 
        this.toastr.success("تم تحميل أنواع المشاريع بنجاح");
      }
      ,

      error:(err)=>{
        console.log(err)
        this.toastr.error("لقد حدث خطاء ما")
      }
    })

  }

  openModal(mode: 'edit' | 'delete', item: ProjectType): void {
    this.modalMode = mode;
    this.selectedItem = { ...item }; // Clone project to prevent direct mutation
    
    console.log(this.selectedItem)
    if (mode === 'edit') {
      this.modalTitle = 'تعديل عنصر ';
    } else if (mode === 'delete') {
      this.modalTitle = 'حذف عنصر';
    }

    const modalElement = document.getElementById('typeModal');
    if (modalElement) {
      new Modal(modalElement).show(); // Open the modal
    }
  }

  saveType(): void {
    let request : UpdateTypeRequest ={
      ...this.selectedItem,

    }
    this.typeService.updateType(this.selectedItem.id,request).subscribe({
      next :()=>{
        const index = this.types.findIndex(p => p.id === this.selectedItem.id);
        if (index !== -1) {
          this.types[index] = this.selectedItem;
        }
        this.closeModal();
      }
      ,
      error:(err)=>{
        this.toastr.error("لقد حدث خطاء ما ")
      
        this.closeModal();
      }

    })
    this.closeModal();
      
  }

  delete(): void {


    this.typeService.delete(this.selectedItem.id).subscribe({

      next :()=>{
        this.types = this.types.filter(p => p.id !== this.selectedItem.id);
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
    const modalElement = document.getElementById('typeModal');
    if (modalElement) {
      new Modal(modalElement).hide(); // Close the modal
    }
  }

  canEdit(): boolean {
    return this.userService.hasRole(ROLES.PROJECTS_PLANNER);
  }


}
