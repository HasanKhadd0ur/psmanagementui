import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './routing/employees-routing.module';
import { EmployeeProfileComponent } from './pages/employee-profile/employee-profile.component';
import { EmployeeParticipatesComponent } from './pages/employee-participates/employee-participates.component';
import { EmployeeParticipateComponent } from './components/employee-participate/employee-participate.component';
import { ParticipateItemComponent } from './components/participate-item/participate-item.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EmployeeProfileComponent,
    EmployeeParticipatesComponent,
    EmployeeParticipateComponent,
    ParticipateItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
