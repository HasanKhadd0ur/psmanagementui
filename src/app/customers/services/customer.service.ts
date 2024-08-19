import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../../core/services/configuration/configuration.service';
import { Observable } from 'rxjs';
import { Result } from '../../core/models/result';
import { CreateCustomerRequest } from '../models/createCustomerRequest';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http :HttpClient ,private config : ConfigurationService) { }
  
  public getCustomers():Observable<Result<Customer[]>>{
    
    return this.http.get<Result<Customer[]>>(this.config.getServerUrl()+ "/Customers");
  }
  
  public getCustomerById(id : number ):Observable<Result<Customer>>{
    
    return this.http.get<Result<Customer>>(this.config.getServerUrl()+ "/Customers/"+id);
  }
  
  public createCustomer(customer :CreateCustomerRequest):Observable<Result<Customer>>{
    
    return this.http.post<Result<Customer>>(this.config.getServerUrl()+ "/Customers",customer);
  }

  public updateCustomer(id :number ,customer :Customer):Observable<Result<void>>{
    
    return this.http.put<Result<void>>(`${this.config.getServerUrl()}/Customers/${id}` ,customer);
  }
  
  public deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.config.getServerUrl()}/Customers/${id}`);
  }
}
