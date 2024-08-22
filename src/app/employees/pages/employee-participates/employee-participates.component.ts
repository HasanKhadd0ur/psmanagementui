import { Component, Input, OnInit } from '@angular/core';
import { EmployeeParticipate } from '../../models/responses/employeeParticipate';
import { EmployeesService } from '../../services/employees.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'employee-participates',
  templateUrl: './employee-participates.component.html',
  styleUrl: './employee-participates.component.css'
})
export class EmployeeParticipatesComponent implements OnInit {

  employeeParticipates : EmployeeParticipate[] 
  employeeId = Number(this.route.snapshot.paramMap.get('id'));
  constructor(
    private emploeesService :EmployeesService,
    private toastr : ToastrService,
    private route: ActivatedRoute
  ) {
    
  }
  ngOnInit(): void {
    this.loadParticipations();

  }
   loadParticipations(): void{

    this.emploeesService.getEmployeeParticipations(this.employeeId).subscribe({
      next: (data)=> {
        this.employeeParticipates= data 
        this.toastr.success("تم تحميل مساهماتك بنجاح");
      }
      ,

      error:(err)=>{
        console.log(err)
        this.toastr.error("لقد حدث خطاء ما")
      }
    })

  }
}
