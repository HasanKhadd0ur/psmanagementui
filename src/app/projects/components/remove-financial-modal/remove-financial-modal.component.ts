import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UpdateFinancialSpendItemRequest } from '../../models/requests/financial-reuqests/UpdateFinancialSpendItemRequest';
import { FinancialSpending } from '../../models/responses/financialSpending';
import { FinancialSpendingService } from '../../services/financial-spending.service';
import { RemoveFinancialSpendItemRequest } from '../../models/requests/financial-reuqests/RemoveFinancialSpendItemRequest';

@Component({
  selector: 'remove-financial-modal',
  templateUrl: './remove-financial-modal.component.html',
  styleUrl: './remove-financial-modal.component.css'
})
export class RemoveFinancialModalComponent {

  @Input() selectedItem : FinancialSpending
  @Input() projectId : number 
  
  constructor(

    private activeModal: NgbActiveModal,
    private toastr : ToastrService,
    private financialService : FinancialSpendingService

  ){}
  
  saveItem(){
    let request : RemoveFinancialSpendItemRequest ={
      ...this.selectedItem,
      projectId: this.projectId
    }
    this.financialService.delete(request).subscribe({
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
