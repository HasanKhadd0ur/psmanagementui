import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectType } from '../../models/responses/projectType';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsTypesService } from '../../services/projects-types.service';
import { ToastrService } from 'ngx-toastr';
import { UpdateTypeRequest } from '../../models/requests/updateProjectTypeRequest';

@Component({
  selector: 'edit-type-modal',
  templateUrl: './edit-type-modal.component.html',
  styleUrl: './edit-type-modal.component.css'
})
export class EditTypeModalComponent implements OnInit{

  @Input() selectedItem : ProjectType
  request : UpdateTypeRequest
  @Output() submit = new EventEmitter<ProjectType>();

  constructor(
      private avtive : NgbActiveModal,
      private service : ProjectsTypesService,
      private toastr :ToastrService

  ){}

  ngOnInit(): void {
    this.request = {...this.selectedItem}
    
  }
  saveType(){
    this
    .service
    .updateType(this.selectedItem.id,this.request)
    .subscribe({
      next : ()=>{

        this.avtive.close(this.request);

      }
    })
    
  }
}
