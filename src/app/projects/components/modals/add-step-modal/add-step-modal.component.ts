import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'add-step-modal',
  templateUrl: './add-step-modal.component.html',
  styleUrl: './add-step-modal.component.css'
})
export class AddStepModalComponent {
  stepForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddStepModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.stepForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      weight: [0, [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  onSubmit() {
    if (this.stepForm.valid) {
      this.dialogRef.close(this.stepForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
