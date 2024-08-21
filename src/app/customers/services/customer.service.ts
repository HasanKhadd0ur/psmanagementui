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
  
  public getCustomers():Observable<Customer[]>{
    
    return this.http.get<Customer[]>(this.config.getServerUrl()+ "/Customers");
  }
  
  public getCustomerById(id : number ):Observable<Customer>{
    
    return this.http.get<Customer>(this.config.getServerUrl()+ "/Customers/"+id);
  }
  
  public createCustomer(customer :CreateCustomerRequest):Observable<Customer>{
    
    return this.http.post<Customer>(this.config.getServerUrl()+ "/Customers",customer);
  }

  public updateCustomer(id :number ,customer :Customer):Observable<void>{
    
    return this.http.put<void>(`${this.config.getServerUrl()}/Customers/${id}` ,customer);
  }
  
  public deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.config.getServerUrl()}/Customers/${id}`);
  }
}
