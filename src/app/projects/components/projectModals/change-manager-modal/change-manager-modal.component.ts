import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../../models/responses/project';
import { ChangeProjectManagerRequest } from '../../../models/requests/project-requests/ChangeProjectManagerRequest';
import { ProjectService } from '../../../services/project.service';
import { EmployeesService } from '../../../../employees/services/employees.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { Employee } from '../../../../employees/models/responses/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'change-manager-modal',
  templateUrl: './change-manager-modal.component.html',
  styleUrl: './change-manager-modal.component.css'
})
export class ChangeManagerModalComponent implements OnInit{

  @Input() project :Project 

  employees :Employee[]
  request : ChangeProjectManagerRequest

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


    debugger
    this.request= {
      projectId:this.project.id ,
      employeeId:this.employeeForm.value.employee.id
    }


    
    this
    .projectService
    .changeProjectManager(this.request)
    .subscribe({
      next : (data)=>{
        this
        .toastr
        .success('تم تغيير مدير المشروع بنجاح');
      
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
    //this.stepTrackForm.patchValue({id: step.id});

    
  }

  employeeFormatter = (result: any) :string=>   { 
     
     if(result == undefined){
      return ''
     }
    return     ` ${result.hiastId} - ${result.personalInfo.firstName } ${result.personalInfo.lastName}`;
  }


  
}
