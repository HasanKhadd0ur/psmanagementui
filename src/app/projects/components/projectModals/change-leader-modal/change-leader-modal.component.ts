import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Employee } from '../../../../employees/models/responses/employee';
import { EmployeesService } from '../../../../employees/services/employees.service';
import { ChangeProjectManagerRequest } from '../../../models/requests/project-requests/ChangeProjectManagerRequest';
import { Project } from '../../../models/responses/project';
import { ProjectService } from '../../../services/project.service';
import { ChangeProjectTeamLeaderRequest } from '../../../models/requests/project-requests/ChangeProjectTeamLeaderRequest';

@Component({
  selector: 'change-leader-modal',
  templateUrl: './change-leader-modal.component.html',
  styleUrl: './change-leader-modal.component.css'
})
export class ChangeLeaderModalComponent {
  @Input() project :Project 

  employees :Employee[]
  request : ChangeProjectTeamLeaderRequest

  employeeForm: FormGroup;
  constructor(

    private fb :FormBuilder,
    private projectService :ProjectService ,
    private employeeService :EmployeesService,
    private toastr :ToastrService,
    private activeModal :NgbActiveModal

  ){}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employee: [],
     
    })
    this
    .employeeService
    .getAvailableEmployees()
    .subscribe({
      next: (data)=> {

        console.log(data)
        this.employees=data 

            
      }
    })


  }

  onClose() {
    this.activeModal.close();
  }
  
  onSubmit(){


    this.request= {
      projectId:this.project.id ,
      employeeId:this.employeeForm.value.employee.id
    }


    
    this
    .projectService
    .changeTeamLeader(this.request)
    .subscribe({
      next : (data)=>{
        this
        .toastr
        .success('تم تغيير رئيس فريق العمل بنجاح');
      
      },
      error:(err)=>{
        this
        .toastr
        .error('لقد حدث خطاء ما');
      }
    });

  }

  
  searchEmployees  = (text$: Observable<string>) => 
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
        ? []
        : this.employees
            .filter((v) => v.hiastId.toString().toLowerCase().includes(term.toLowerCase()))
            .slice(0, 10)
          )
        )
      
        
  onStepSelected(step: Employee): void {

    this.employeeForm.patchValue({ employeeId: step.id });

    
  }

  employeeFormatter = (result: any) :string=>   { 
     
     if(result == undefined){
      return ''
     }
    return     ` ${result.hiastId} - ${result.personalInfo.firstName } ${result.personalInfo.lastName}`;
  }


}
