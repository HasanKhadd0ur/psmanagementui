import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Track } from '../../../models/responses/track';
import { CreateTrackRequest } from '../../../models/requests/CreateTrackRequest';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FinancialSpendingService } from '../../../../projects/services/financial-spending.service';
import { TrackService } from '../../../services/track.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { Step } from '../../../../projects/models/responses/Step';
import { AddStepTrackRequest } from '../../../models/requests/AddStepTrackRequest';
import { Modal } from 'bootstrap';
import { StepService } from '../../../../projects/services/step.service';

@Component({
  selector: 'add-step-track-modal',
  templateUrl: './add-step-track-modal.component.html',
  styleUrl: './add-step-track-modal.component.css'
})
export class AddStepTrackModalComponent {
  @Input() isVisible = false;
  @Input() steps: Step[] = []; // All steps available for the project
  @Input() trackedSteps: Step[] = []; // Steps that are already tracked
  @Input() trackId :number
  @Output() addStepTrack = new EventEmitter<AddStepTrackRequest>();

  stepTrackForm: FormGroup;
  filteredSteps: Step[] = [];

  constructor(private fb: FormBuilder,
    private stepService : StepService 
  ) {
    this.stepTrackForm = this.fb.group({
      stepName: ['', Validators.required],
      executionState: ['', Validators.required],
      trackExecutionRatio: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  ngOnInit(): void {
    this.filteredSteps = this.steps.filter(step => 
      !this.trackedSteps.some(trackedStep => trackedStep.id === step.id)
      
    );

  }

  search = (text$: Observable<string>) => 
    text$.pipe(
      map(term => term.length < 2 ? [] : 
        this.filteredSteps.filter(v => v.stepInfo.stepName.toLowerCase().includes(term.toLowerCase())).slice(0, 10))
    );

  onStepSelected(step: Step): void {
    this.stepTrackForm.patchValue({ stepName: step.stepInfo.stepName });
  }

  onSubmit(): void {
    if (this.stepTrackForm.valid) {
      const selectedStep = this.filteredSteps.find(step => step.stepInfo.stepName === this.stepTrackForm.value.stepName);
      if (selectedStep) {
        const newStepTrack: AddStepTrackRequest = {
          stepId: selectedStep.id,
          trackId: this.trackId, 
          executionState: this.stepTrackForm.value.executionState,
          trackDate: new Date(),
          trackExecutionRatio: this.stepTrackForm.value.trackExecutionRatio,
        };
        this.addStepTrack.emit(newStepTrack);
        this.closeModal();
      }
    }
  }

  closeModal(): void {
    const modal = document.getElementById('addStepTrackModal');
    if (modal) {
      const bootstrapModal = new Modal(modal);
      bootstrapModal.hide();
    }
  }  
}
