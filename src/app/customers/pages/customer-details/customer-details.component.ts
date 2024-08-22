import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})

export class CustomerDetailsComponent implements OnInit {

  customer: Customer | undefined;

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
        
    },
    error : (err)=>{ console.log(err)}

  });
  }
  addContact(arg0: number) {
    throw new Error('Method not implemented.');
    }
    
    onDelete(id: number) {
      this.customerService.deleteCustomer(id).subscribe({
        next : (data)=> {
          this.toastr.success('تم حذف الجهة بنجاح');
          this.router.navigate(['/customers']);
        },
        error: (err)=>this.toastr.error('لقد حدث خطاء ما')
      });
    }
    
}