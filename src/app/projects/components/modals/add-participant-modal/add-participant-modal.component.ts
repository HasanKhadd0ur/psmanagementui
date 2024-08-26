import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { EmployeesService } from '../../../../employees/services/employees.service';
import { Employee } from '../../../../employees/models/responses/employee';
import { AddParticipantRequest } from '../../../models/requests/project-requests/addParticipantRequest';
import { Modal } from 'bootstrap';
import { EmployeeParticipate } from '../../../../employees/models/responses/employeeParticipate';
import { ProjectService } from '../../../services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-participant-modal',
  templateUrl: './add-participant-modal.component.html',
  styleUrl: './add-participant-modal.component.css'
})
export class AddParticipantModalComponent {

  @Output() participantAdded = new EventEmitter<void>();
  @Input() paticipants : EmployeeParticipate[]
  @Input() projectId : number 

  request : AddParticipantRequest =new  AddParticipantRequest();
  addParticipantForm: FormGroup;
  employees$: Observable<Employee[]>;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeesService,
    private projectService : ProjectService,
    private toastr :ToastrService


  ) {

    this.addParticipantForm = this.fb.group({
      email: ['', Validators.required],
      partialTimeRatio: [0, [Validators.required, Validators.min(0)]],
      role: ['', Validators.required],
      participantId: [0] 
    });
  }

  ngOnInit(): void {
    // Load employees as an observable
    this.employees$ = this.employeeService.getAvailableEmployees();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        term.length < 2 ? of([])
        : this.employees$.pipe(
            map(employees => employees.filter(employee => employee.email.toLowerCase().includes(term.toLowerCase()))),
            map(employees => this.filterExistingEmployees(employees))
     
          )
      )
    );
  
  formatter = (x: Employee) => x != undefined ?  x.email +" / "+ x.personalInfo?.firstName+"  " + x.personalInfo?.lastName : "";
  
  onEmployeeSelected(employee: Employee) {
    debugger
    this.addParticipantForm.patchValue({
      participantId: employee.id,
      email: employee.email
    });
  }

  filterExistingEmployees(employees: Employee[]): Employee[] {
    const existingEmails = new Set(this.paticipants.map(p => p.employeeId));
    return employees.filter(employee => !existingEmails.has(employee.id));
  }
  onSubmit() {
    if (this.addParticipantForm.valid) {

      debugger
      const participantData = this.addParticipantForm.value;
      console.log(participantData)
      let request : AddParticipantRequest= {
        partialTimeRatio: participantData.partialTimeRatio ,
        participantId: participantData.participantId ,
        role:participantData.role,
        projectId:this.projectId 
      }
      
      this
      .projectService
      .addParticipant(request)
      .subscribe({
        next : ()=>{

          this.participantAdded.emit(participantData);
       

        }
        ,
        error:(err) =>{

          this.toastr.error("لقد حدث خطاء ما")
        }
      });

    }
  }

  closeModal() {
    const modal = document.getElementById('addParticipantModal');
    if (modal) {
      // Use Bootstrap 5 JavaScript API to hide modal
      const bsModal = new Modal(modal);
      bsModal.hide();
    }
  }  
}
