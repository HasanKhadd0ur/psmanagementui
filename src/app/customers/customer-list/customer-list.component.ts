import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';
import { config } from 'rxjs';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  customers :Customer[]=[]
  isCreate = false

  constructor(
    private dialog: MatDialog,
    private customerService : CustomerService) {

  }
  selectedCustomer: Customer;
  onSelect(customer: Customer): void {
    this.selectedCustomer = customer;
  }
  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next : (res) =>{ 
        console.log(res);
        if(res.isSuccess){
          this.customers = res.value; 
       
        }

      },
      error: (err)=>{this.customers= CustomerService.customers}
  });;
  }
  openEditForm(data: Customer | null) {
    const dialogRef = this.dialog.open(UpdateCustomerComponent, {
      data:data,  
      width:'auto',
      height:'500px'  
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.customers;
        }
      },
    });
  }

  toggle():void{
    this.isCreate = ! this.isCreate
  }
}
