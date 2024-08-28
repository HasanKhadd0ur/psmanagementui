import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactInfo, Customer } from '../../models/responses/customer';
import { RemoveContactInfoRequest } from '../../models/requests/updateCustomerRequest';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'remove-contactinfo-modal',
  templateUrl: './remove-contactinfo-modal.component.html',
  styleUrl: './remove-contactinfo-modal.component.css'
})
export class RemoveContactinfoModalComponent {

  @Input() contact :ContactInfo
  @Input() customer :Customer
  @Output() removed = new EventEmitter<void>()

  request =new  RemoveContactInfoRequest(); 
 
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
    this.request.id=this.contact.id

    this
    .customerService
    .removeContactInfo(this.request)
    .subscribe({
      next : (data)=>{
        this.removed.emit();
        this.onClose();
      },
      error:(err)=>{
        this
        .toastr
        .error('تعذر حذف معلومة الاتصال');
      }
    });

  }

}
