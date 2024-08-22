import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/responses/employee';
import { EmployeesService } from '../../services/employees.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../core/services/authentication/user.service';

@Component({
  selector: 'employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css'
})
export class EmployeeProfileComponent  implements OnInit{

  employee : Employee 
  id : number 
  constructor(
    private employeeSerivce : EmployeesService,
    private userSerivce : UserService,
    
    private toastr : ToastrService ){}

  ngOnInit(): void {
  this.id =this.userSerivce.getEmployeeId()
  this.employeeSerivce.getCurrentEmployee().subscribe({

    next:(data)=>this.employee=data, 
    error :(err)=>this.toastr.error("لقد حدث خطاء ما")
  });

  }
}
