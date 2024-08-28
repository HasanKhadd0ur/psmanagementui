import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeParticipatesComponent } from '../pages/employee-participates/employee-participates.component';
import { EmployeeProfileComponent } from '../pages/employee-profile/employee-profile.component';

const routes: Routes = [
  {path:"profile", component:EmployeeProfileComponent},
  {path:"participates/:id", component:EmployeeParticipatesComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { 



}
