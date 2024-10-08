import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerCreateComponent } from '../pages/customer-create/customer-create.component';
import { UpdateCustomerComponent } from '../pages/update-customer/update-customer.component';
import { CustomerDetailsComponent } from '../pages/customer-details/customer-details.component';
import { CustomerListComponent } from '../pages/customer-list/customer-list.component';
import { RoleGuard } from '../../core/guards/role.guard';
import { ROLES } from '../../core/constants/roles';

const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'edit/:id', component: UpdateCustomerComponent , canActivate:[RoleGuard] ,  data: { roles: [ROLES.CUSTOMERS_PLANER] }},
  { path: 'create', component: CustomerCreateComponent, canActivate:[RoleGuard] ,  data: { roles: [ROLES.CUSTOMERS_PLANER] } },
   { path: 'detail/:id', component: CustomerDetailsComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
