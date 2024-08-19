import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';
import { config } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoadingService } from '../../../core/services/loading/loading-service.service';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  customers :Customer[]=[]
  isCreate = false
  loading = true
  selectedCustomer: Customer;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private customerService : CustomerService,
    private toastr: ToastrService,
    public router: Router,
    private loadingService: LoadingService
  ) {

  }

  onSelect(customer: Customer): void {
    this.selectedCustomer = customer;
  }
  
  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.loadingService.show();
    this.customerService.getCustomers().subscribe({
      next : (res) =>{ 
        console.log(res);
        if(res.isSuccess){
          this.toastr.success('تم تحميل الجهات الطارجة بنجاح');
          this.customers = res.value; 
          
        }else {
          this.toastr.error(res.errors[0],"error");
        
        }

        this.loadingService.hide();
      },
      error: (err)=>{
        this.toastr.error('Failed to load customers');
        this.loadingService.hide();
        
      }
    });

  }

  toggle():void{
    this.isCreate = ! this.isCreate
  }
  pageChanged(event: number): void {
    this.currentPage = event;
  }
}
