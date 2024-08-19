import { Component } from '@angular/core';
import { CreateCustomerRequest } from '../../models/createCustomerRequest';
import { CustomerService } from '../../services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'customer-create',
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.css'
})
export class CustomerCreateComponent {

  request : CreateCustomerRequest ={
    customerName :"",
    email:"",
    address :{
      city:"",
      streetName:"",
      streetNumber:0
    }
  }
  constructor(
    private customerService :CustomerService,
    private toastr : ToastrService,
    private router : Router
  ){}
  
  submit(request : CreateCustomerRequest){
    this.customerService.createCustomer(request)
    .subscribe({
      next : (res)=>{
        if(res.isSuccess){

          this.toastr.success("تمت إضافة الجهة بنجاح");
          this.router.navigate(['customers/detail', res.value.id]);
        }else {
          this.toastr.error(res.validationErrors[0].errorMessage);
        }

      }
      ,
      error : (err)=>this.toastr.error("An error Occured")
    });

  }

}
