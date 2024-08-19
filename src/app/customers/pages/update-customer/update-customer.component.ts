import { Component, Input, input, Output } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'update-customer',
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css'
})
export class UpdateCustomerComponent {
  @Input() customer : Customer


  constructor(private customerService : CustomerService) {

  }
  onSubmit(customer: Customer) {

    this.customerService
        .updateCustomer(customer.id,customer)
        .subscribe({
          next: (res)=>{
            console.log(res)
          },
          error: (error)=> console.log(error)
        }
      );

  }
  

}
