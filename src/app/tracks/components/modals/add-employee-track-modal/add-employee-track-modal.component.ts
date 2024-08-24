import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Step } from '../../../../projects/models/responses/Step';
import { StepService } from '../../../../projects/services/step.service';
import { AddStepTrackRequest } from '../../../models/requests/AddStepTrackRequest';
import { Employee } from '../../../../employees/models/responses/employee';
import { AddEmployeeTrackRequest } from '../../../models/requests/AddEmployeeTrackRequest';
import { ProjectService } from '../../../../projects/services/project.service';
import { EmployeeParticipate } from '../../../../employees/models/responses/employeeParticipate';
import { EmployeeTrack } from '../../../models/responses/employeeTrack';
import { FullnamePipe } from '../../../../shared/pipes/fullName/fullname.pipe';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-employee-track-modal',
  templateUrl: './add-employee-track-modal.component.html',
  styleUrl: './add-employee-track-modal.component.css'
})
export class AddEmployeeTrackModalComponent {
  @Input() isVisible = false;
  participants: EmployeeParticipate[] = []; // All steps available for the project
  @Input() trackedParticipants: EmployeeTrack[] = []; // Steps that are already tracked
  @Input() projectId :number 
  @Input() trackId :number
  @Output() addEmployeeTrack = new EventEmitter<AddEmployeeTrackRequest>();

  stepTrackForm: FormGroup;

  filteredParticipants: Employee[] = [];

  constructor(private fb: FormBuilder,
    private projectService : ProjectService 
  ) {
    this.stepTrackForm = this.fb.group({
      id: [],
      hiastId: ['', Validators.required],
      notes: ['', Validators.required],
      assignedWork: ['', Validators.required],
      performedWork: ['', Validators.required],
      assignedWorkEnd: [new Date(), Validators.required],
      assignedWorkingHours: [0,[ Validators.required,,Validators.min(0)]],
      workedHours:  [0, [Validators.required,,Validators.min(0)]],
      contributingRatio:  [0, [Validators.required,Validators.min(0),,Validators.max(100)]]
  
    
    }
   
    );
  }

  ngOnInit(): void {
    this.projectService.getParticipants(this.projectId)
    .subscribe({
      next: (data)=> {

        console.log(data)
        this.participants=data 

        this.filteredParticipants = this.participants.filter(track=> 
          !this.trackedParticipants.some(participate => participate.emloyeeId ===track.employeeId )
          
        ).map(e => e.employee);
    
      }
    })

  }

  searchEmployees  = (text$: Observable<string>) => 
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
        ? []
        : this.participants
            .filter((v) => v.employee.hiastId.toString().toLowerCase().includes(term.toLowerCase()))
            .slice(0, 10)
          )
        )
      
        
  onStepSelected(step: Employee): void {

    debugger
    this.stepTrackForm.patchValue({ hiastId: step.hiastId });
    //this.stepTrackForm.patchValue({id: step.id});

    
  }

  employeeFormatter = (result: any) :string=>   { 
     
     if(result.employee == undefined){
      return ''
     }
    return     ` ${result.employee.hiastId} - ${result.employee.personalInfo.firstName } ${result.employee.personalInfo.lastName}`;
  }

  onEmployeeSelected(event: NgbTypeaheadSelectItemEvent): void {
    debugger
    this.stepTrackForm.patchValue({ id: event.item.employeeId });
  }

  onSubmit(): void {
    if (this.stepTrackForm.valid) {
      debugger

      const selectedStep = this.filteredParticipants.find(emp => emp.id == this.stepTrackForm.value.id);
      if (selectedStep) {
        const newEmployeeTrack: AddEmployeeTrackRequest = {
          employeeId: selectedStep.id,
          trackId: this.trackId, 
          employeeWork: {
            workedHours: this.stepTrackForm.value.workedHours,
            assignedWorkingHours: this.stepTrackForm.value.assignedWorkingHours,
            contributingRatio:this.stepTrackForm.value.contributingRatio
          },
          employeeWorkInfo:{
            assignedWork: this.stepTrackForm.value.assignedWork,
            performedWork:this.stepTrackForm.value.performedWork ,
            assignedWorkEnd: this.stepTrackForm.value.assignedWorkEnd
          },
          notes:this.stepTrackForm.value.notes,
          projectId:this.projectId

        };


        this.closeModal();
        this.addEmployeeTrack.emit(newEmployeeTrack);


      }
    }
  }

  closeModal(): void {
    const modal = document.getElementById('addEmployeeTrackModal');
    if (modal) {
      const bootstrapModal = new Modal(modal);
      bootstrapModal.hide();
    }
  }  


}
