import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerService } from './services/customer.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';
import { UpdateCustomerComponent } from './pages/update-customer/update-customer.component';
import { CustomerRoutingModule } from './routing/customer-routing.module';
import { SharedModule } from "../shared/shared.module";
import { CustomerItemComponent } from './components/customer-item/customer-item.component';
import { CustomerCreateComponent } from './pages/customer-create/customer-create.component';
import { AddCustomerModalComponent } from './components/add-customer-modal/add-customer-modal.component';
import { AddContactinfoModalComponent } from './components/add-contactinfo-modal/add-contactinfo-modal.component';
import { RemoveContactinfoModalComponent } from './components/remove-contactinfo-modal/remove-contactinfo-modal.component';



@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerDetailsComponent,
    UpdateCustomerComponent,
    CustomerItemComponent,
    CustomerCreateComponent,
    AddCustomerModalComponent,
    AddContactinfoModalComponent,
    RemoveContactinfoModalComponent
   ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
],
  providers:[CustomerService],
  exports:[
    CustomerRoutingModule] 
})
export class CustomersModule { }
