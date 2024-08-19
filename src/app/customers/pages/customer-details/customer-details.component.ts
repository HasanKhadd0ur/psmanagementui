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
        console.log(data.validationErrors)
          
        if(data.isSuccess){
          this.customer = data.value;
        }else {
          this.toastr.error(data.validationErrors[0].errorMessage);
          // this.router()

        }
    },
    error : (err)=>{ console.log(err)}

  });
  }
}