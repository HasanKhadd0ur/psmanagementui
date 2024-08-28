import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../../models/responses/customer';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../services/customer.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddContactInfoRequest } from '../../models/requests/updateCustomerRequest';

@Component({
  selector: 'add-contactinfo-modal',
  templateUrl: './add-contactinfo-modal.component.html',
  styleUrl: './add-contactinfo-modal.component.css'
})
export class AddContactinfoModalComponent implements OnInit{

  @Input() customer :Customer
  @Output() added  = new EventEmitter<void>();
  request =new  AddContactInfoRequest(); 
 
  constructor(

    private toastr :ToastrService ,
    private customerService :CustomerService,
    private activeModal :  NgbActiveModal

  ){}

  ngOnInit(): void {
    

  }

  
  onClose() {
    this.activeModal.close();
  }
  
  onSubmit(){

    this
    .request
    .customerId=this.customer.id

    this
    .customerService
    .addContactInfo(this.request)
    .subscribe({
      next : (data)=>{
       
        this.added.emit();
        this.onClose()
      },
      error:(err)=>{
        this
        .toastr
        .error('تعذر إضافة معلومة الاتصال');
      }
    });

  }

}
