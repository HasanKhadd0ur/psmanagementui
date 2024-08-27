// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { Step } from '../../../models/responses/Step';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ChangeEmployeeParticipationRequest } from '../../../models/requests/project-requests/ChangeEmployeeParticipationRequest';
// import { ProjectService } from '../../../services/project.service';

// @Component({
//   selector: 'edit-step-modal',
//   templateUrl: './edit-step-modal.component.html',
//   styleUrl: './edit-step-modal.component.css'
// })
// export class EditStepModalComponent {
//   @Input() step: Step;
//   @Output() stepEdited = new EventEmitter<void>();

//   editStepForm: FormGroup;

//   constructor(private fb: FormBuilder, private projectService: ProjectService) {
//     this.editStepForm = this.fb.group({
//       role: ['', Validators.required],
//       partialTimeRatio: [0, [Validators.required, Validators.min(0)]],
//     });
//   }

//   ngOnChanges() {
//     if (this.step) {
//       this.editStepForm.patchValue(this.step);
//     }
//   }

//   onSubmit() {
//     if (this.editStepForm.valid) {
      
//       let request : ChangeEmployeeParticipationRequest ={
//         role: this.editStepForm.value.role ,
//         partialTimeRation: this.editStepForm.value.partialTimeRatio,
//         stepId: this.step.employee.id ,
//         projectId:this.step.projectId

//       }
//       debugger;
//       this
//       .projectService
//       .changeParticipation(request)
//       .subscribe(() => {
//         this.stepEdited.emit();
//         this.closeModal();
//       });
//     }
//   }

//   closeModal() {
//     const modal = document.getElementById('editstepModal');
//     if (modal) {
//       (modal as any).modal('hide');
//     }
//   }

// }
