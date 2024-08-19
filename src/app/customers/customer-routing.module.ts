import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { UpdateCustomerComponent } from './pages/update-customer/update-customer.component';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';
import { CustomerCreateComponent } from './pages/customer-create/customer-create.component';

const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'edit/:id', component: UpdateCustomerComponent },
  { path: 'create', component: CustomerCreateComponent },
   { path: 'detail/:id', component: CustomerDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
