import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerService } from './services/customer.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';



@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerDetailsComponent,
    UpdateCustomerComponent
   ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:[CustomerService],
  exports:[
    CustomerListComponent,
    CustomerDetailsComponent] 
})
export class CustomersModule { }
