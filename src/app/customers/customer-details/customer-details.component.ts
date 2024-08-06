import { Component, Input } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent {

@Input() customer :Customer ;
  name :string= ""

  constructor(private customerServive :CustomerService){

  }
  handleInput(){
    this.customer.customerName= this.name;
  }
  onDelete(customer: Customer) {
    this.customerServive
        .deleteCustomer(customer.id+10)
        .subscribe(
          {
            next: (res)=>console.log(res),
            error:(err)=>{
              CustomerService.customers=CustomerService.customers.filter(o => o.id==customer.id);
              console.log(CustomerService.customers)
            }
            
          }
        );
  }
}
