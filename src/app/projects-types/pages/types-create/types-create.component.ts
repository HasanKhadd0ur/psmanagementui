import { Component } from '@angular/core';
import { CreateNewTypeRequest } from '../../models/requests/createNewTypeRequest';
import { ProjectsTypesService } from '../../services/projects-types.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CreateCustomerRequest } from '../../../customers/models/requests/createCustomerRequest';

@Component({
  selector: 'types-create',
  templateUrl: './types-create.component.html',
  styleUrl: './types-create.component.css'
})
export class TypesCreateComponent {
  request :CreateNewTypeRequest = new CreateNewTypeRequest()
  constructor(
    private typeService :ProjectsTypesService,
    private toastr : ToastrService,
    private router : Router
  ){}
  
  submit(request : CreateNewTypeRequest){
    this.typeService.addType(request)
    .subscribe({
      next : (res)=>{
        
        this.toastr.success("تمت إضافة الجهة بنجاح");
        this.router.navigate(['types/detail', res.id]);
        
      }
      ,
      error : (err)=>this.toastr.error("لقد حدث خطاء ما ")
    });

  }

}
