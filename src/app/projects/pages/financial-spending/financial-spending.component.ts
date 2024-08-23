import { Component } from '@angular/core';
import { FinancialSpending } from '../../models/responses/FinancialSpending';
import { FinancialSpendingService } from '../../services/financial-spending.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddStepModalComponent } from '../../components/modals/add-step-modal/add-step-modal.component';
import { GetFinancialSpendItemByIdRequest } from '../../models/requests/financial-reuqests/GetFinancialSpendItemByIdRequest';
import { GetFinancialSpendItemByProjecRequest } from '../../models/requests/financial-reuqests/GetFinancialSpendItemByProjectRequest';
import { AddFinancialSpendModalComponent } from '../../components/modals/add-financial-spend-modal/add-financial-spend-modal.component';
import { UpdateFinancialSpendItemRequest } from '../../models/requests/financial-reuqests/UpdateFinancialSpendItemRequest';
import { RemoveFinancialSpendItemRequest } from '../../models/requests/financial-reuqests/RemoveFinancialSpendItemRequest';
import { Modal } from 'bootstrap';

@Component({
  selector: 'financial-spending',
  templateUrl: './financial-spending.component.html',
  styleUrl: './financial-spending.component.css'
})
export class FinancialSpendingComponent {
  spends :FinancialSpending[]
  selectedItem : FinancialSpending;

  projectId = Number(this.route.snapshot.paramMap.get('id'));
  modalMode: 'edit' | 'delete' = 'edit';
  modalTitle: string = '';

  constructor(
    private financialService :FinancialSpendingService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    public router :Router,
    private modalService: NgbModal
  ) {
    
  }
  ngOnInit(): void {
    this.loadSpends();
    this.selectedItem ={
      id:-1 ,
      costType:'',
      expectedSpendingDate: new Date (),
      localPurchase:0,
      externalPurchase: {
        currency:"",
        ammount:0
      },
      description:""
    }
  }


  loadSpends(): void{
    let request : GetFinancialSpendItemByProjecRequest ={
      projectId : this.projectId ,
      pageNumber: null ,
      pageSize: null
    }
    this.financialService.getSpendByProject(request).subscribe({
      next: (data)=> {
        this.spends= data 
        this.toastr.success("تم تحميل خطة الانفاق بنجاح");
      }
      ,

      error:(err)=>{
        console.log(err)
        this.toastr.error("لقد حدث خطاء ما")
      }
    })

  }
  openModal(mode: 'edit' | 'delete', item: FinancialSpending): void {
    this.modalMode = mode;
    this.selectedItem = { ...item }; // Clone project to prevent direct mutation
    console.log(this.selectedItem)
    if (mode === 'edit') {
      this.modalTitle = 'تعديل عنصر ';
    } else if (mode === 'delete') {
      this.modalTitle = 'حذف عنصر';
    }

    const modalElement = document.getElementById('projectModal');
    if (modalElement) {
      new Modal(modalElement).show(); // Open the modal
    }
  }

  saveProject(): void {
    let request : UpdateFinancialSpendItemRequest ={
      ...this.selectedItem,
      projectId: this.projectId
    }
    this.financialService.updateSpendItem(request).subscribe({
      next :()=>{
        const index = this.spends.findIndex(p => p.id === this.selectedItem.id);
        if (index !== -1) {
          this.spends[index] = this.selectedItem;
        }
        this.closeModal();
      }
      ,
      error:(err)=>{
        this.toastr.error("لقد حدث خطاء ما ")
      
        this.closeModal();
      }

    })
  
  }

  deleteProject(): void {
    let request : RemoveFinancialSpendItemRequest= {
      projectId: this.projectId ,
      id: this.selectedItem.id
    } 

    this.financialService.delete(request).subscribe({

      next :()=>{
        this.spends = this.spends.filter(p => p.id !== this.selectedItem.id);
        this.toastr.success("تم الحذف بنجاح")
        this.closeModal();
        
      }
      ,
      error:(err)=>{
        this.toastr.error("لقد حدث خطاء ما ")
      
        this.closeModal();
      }


    }
  );

  }

  closeModal(): void {
    const modalElement = document.getElementById('projectModal');
    if (modalElement) {
      new Modal(modalElement).hide(); // Close the modal
    }
  }


  openAddModal(): void {
    const modalRef = this.modalService.open(AddFinancialSpendModalComponent, { size: 'lg' });
    modalRef.componentInstance.projectId = this.projectId;

    modalRef.result.then((result) => {
      if (result) {
        // Add the new project to the list
        this.spends.push(result);
        console.log('Project added:', result);
      }
    }, (reason) => {
      // Handle modal dismiss
      console.log('Modal dismissed with reason:', reason);
    });
  }

}
