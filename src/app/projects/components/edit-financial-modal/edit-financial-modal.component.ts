import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FinancialSpending } from '../../models/responses/financialSpending';
import { FinancialSpendingService } from '../../services/financial-spending.service';
import { UpdateFinancialSpendItemRequest } from '../../models/requests/financial-reuqests/UpdateFinancialSpendItemRequest';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-financial-modal',
  templateUrl: './edit-financial-modal.component.html',
  styleUrl: './edit-financial-modal.component.css'
})
export class EditFinancialModalComponent {

  @Input() selectedItem : FinancialSpending
  @Input() projectId : number 
  
  constructor(

    private activeModal: NgbActiveModal,
    private toastr : ToastrService,
    private financialService : FinancialSpendingService

  ){}
  
  saveItem(){
    let request : UpdateFinancialSpendItemRequest ={
      ...this.selectedItem,
      projectId: this.projectId
    }
    this.financialService.updateSpendItem(request).subscribe({
      next :()=>{
        this.activeModal.close(request);
      }
      ,
      error:(err)=>{
        this.toastr.error("لقد حدث خطاء ما ")
      
      }

    })
  
      

  }

close(){

  this.activeModal.close();
}
}
