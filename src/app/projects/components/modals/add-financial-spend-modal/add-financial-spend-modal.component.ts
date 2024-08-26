import { Component, Input } from '@angular/core';
import { FinancialSpending } from '../../../models/responses/financialSpending';
import { CreateFinancialSpendItemRequest } from '../../../models/requests/financial-reuqests/CreateFinancialSpendItemRequest';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../services/project.service';
import { FinancialSpendingService } from '../../../services/financial-spending.service';

@Component({
  selector: 'add-financial-spend-modal',
  templateUrl: './add-financial-spend-modal.component.html',
  styleUrl: './add-financial-spend-modal.component.css'
})
export class AddFinancialSpendModalComponent {
  item  = new FinancialSpending()
  @Input() projectId : number 
  request :CreateFinancialSpendItemRequest 
  
  constructor(private toastr :ToastrService, public activeModal: NgbActiveModal,private financialService :FinancialSpendingService) {}

  ngOnInit(): void {
    this.request ={
      projectId: this.projectId ,
      localPurchase: 0,
      expectedSpendingDate :new Date(),
      externalPurchase :{
        ammount :0 ,
        currency :""
      },
      costType:"" ,
      description:""
       
    };
  }
  onSubmit(): void {
    // Emit the project data or handle it as needed
    console.log('Project data submitted:', this.request);
    this.financialService.addSpendItem(this.request).subscribe({
  
      next: (data)=>{

        this.activeModal.close(data); // Close modal and pass data
  
      },
      error: (err )=> this.toastr.error("لقد حدث خطاء ما")

    })
  }

  onClose():void {
    this.activeModal.close();
  }
}
