import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationService } from '../core/services/configuration/configuration.service';
import { Observable } from 'rxjs';
import { Result } from '../core/models/result';
import { Employee } from './models/responses/employee';
import { EmployeeProfileComponent } from './pages/employee-profile/employee-profile.component';
import { EmployeeParticipateComponent } from './components/employee-participate/employee-participate.component';
import { EmployeeParticipatesComponent } from './pages/employee-participates/employee-participates.component';

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
