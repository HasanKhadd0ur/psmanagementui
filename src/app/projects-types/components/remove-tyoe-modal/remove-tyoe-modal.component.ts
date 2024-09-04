import { Component, Input } from '@angular/core';
import { ProjectType } from '../../models/responses/projectType';
import { ProjectsTypesService } from '../../services/projects-types.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'remove-tyoe-modal',
  templateUrl: './remove-tyoe-modal.component.html',
  styleUrl: './remove-tyoe-modal.component.css'
})
export class RemoveTyoeModalComponent {

  @Input() item : ProjectType 


  constructor(

    private prt : ProjectsTypesService,
    private toastr : ToastrService,
    private active : NgbActiveModal

  ){}


  remove(){
    this
    .prt
    .delete(this.item.id)
    .subscribe({

      next : ()=>{

        this.active.close(this.item.id);
        this.toastr.success('تم الحذف بنجاح')
      
      },
      error:(err)=>{
      }

    })

  }

  close(){
    this.active.close();
  }
}


