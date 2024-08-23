import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStepModalComponent } from '../../../projects/components/modals/add-step-modal/add-step-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openModal(data: any,componenet : any): Promise<any> {
    const dialogRef = this.dialog.open(componenet, {
      width: '400px',
      data: data
    });

    return dialogRef.afterClosed().toPromise();
  }
}
