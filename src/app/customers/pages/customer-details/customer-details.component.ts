import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'bootstrap';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';
import { UpdateCustomerRequest } from '../../models/requests/updateCustomerRequest';

@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})

export class CustomerDetailsComponent implements OnInit {
  modalMode: 'edit' | 'delete' = 'edit';
  modalTitle: string = '';

  customer: Customer ;
  selectedCustomer :Customer ;
  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.customerService.getCustomerById(id).subscribe({
      next :(data) => {
        
         this.customer = data;
     
         this.selectedCustomer=this.customer;
    },
    error : (err)=>{ console.log(err)}

  });
  }
  addContact(arg0: number) {
    throw new Error('Method not implemented.');
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
        customerId: this.selectedCustomer.id
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
  
    closeModal(): void {
      const modalElement = document.getElementById('customerModal');
      if (modalElement) {
        new Modal(modalElement).hide(); // Close the modal
      }
    }
  
  
     
}