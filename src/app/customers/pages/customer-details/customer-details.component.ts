import { Component, Input, OnInit } from '@angular/core';
import { ContactInfo, Customer } from '../../models/responses/customer';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'bootstrap';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';
import { AddContactInfoRequest, UpdateCustomerRequest } from '../../models/requests/updateCustomerRequest';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddContactinfoModalComponent } from '../../components/add-contactinfo-modal/add-contactinfo-modal.component';
import { RemoveContactinfoModalComponent } from '../../components/remove-contactinfo-modal/remove-contactinfo-modal.component';

@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})

export class CustomerDetailsComponent implements OnInit {
  modalMode: 'edit' | 'delete' = 'edit';
  modalTitle: string = '';

  customerId : number 
  customer: Customer ;
  selectedCustomer :Customer ;
  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private modalService : NgbModal
  ) {}

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCustomer();

  }

  loadCustomer (){

    this.customerService.getCustomerById(this.customerId).subscribe({
      next :(data) => {
        
         this.customer = data;
     
         this.selectedCustomer=this.customer;
    },
    error : (err)=>{ console.log(err)}

  });
  }

    openModal(mode: 'edit' | 'delete'): void {
      this.modalMode = mode;
      
      if (mode === 'edit') {
        this.modalTitle = 'تعديل جهة طارحة ';
      } else if (mode === 'delete') {
        this.modalTitle = 'حذف جهة طارحة';
      }
  
      const modalElement = document.getElementById('customerModal');
      if (modalElement) {
        new Modal(modalElement).show(); // Open the modal
      }
    }
  
    saveCustomer(): void {
      
      let request : UpdateCustomerRequest ={
        ...this.selectedCustomer,
        customerId: this.selectedCustomer.id,
        customerName:this.selectedCustomer.customerName
      }

      this.customerService.updateCustomer(this.selectedCustomer.id,request).subscribe({
        next :()=>{
     
          this.customer.address=this.selectedCustomer.address ;
          this.customer.customerName=this.selectedCustomer.customerName;
          this.customer.email=this.selectedCustomer.email
          this.closeModal();
        
        }
        ,
        error:(err)=>{
          this.toastr.error("لقد حدث خطاء ما ")
        
          this.closeModal();
        }
  
      })
    
    }
  
    delete(): void {
  
      this.customerService.deleteCustomer(this.customer.id).subscribe({
  
        next :()=>{
          this.router.navigate(['/customers'])
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

    openAddConatact(){
    
      const modalRef = this.modalService.open(AddContactinfoModalComponent);
      modalRef.componentInstance.customer = this.customer;

  
      modalRef.result.then((result) => {
   
        if (result) {
   
          this.loadCustomer();
          
        }
        
      }, (reason) => {
                 this.loadCustomer();
      
      });
    
    }
  
    openRemoveConatact(conta : ContactInfo){
    
      const modalRef = this.modalService.open(RemoveContactinfoModalComponent);
      modalRef.componentInstance.customer = this.customer;
      modalRef.componentInstance.contact= conta
  
      modalRef.result.then((result) => {
   
        if (result) {
   
          this.loadCustomer();
          
        }
        
      }, (reason) => {
       
      
      });
    
    }
  
    closeModal(): void {
      const modalElement = document.getElementById('customerModal');
      if (modalElement) {
        new Modal(modalElement).hide(); // Close the modal
      }
    }
  
  
     
}