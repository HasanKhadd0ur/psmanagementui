import { Injectable } from '@angular/core';
import { Customer } from '../models/responses/customer';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../../core/services/configuration/configuration.service';
import { Observable } from 'rxjs';
import { Result } from '../../core/models/result';
import { CreateCustomerRequest } from '../models/requests/createCustomerRequest';
import { AddContactInfoRequest, RemoveContactInfoRequest, UpdateCustomerRequest } from '../models/requests/updateCustomerRequest';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http :HttpClient ,private config : ConfigurationService) { }
  
  public getCustomers():Observable<Customer[]>{
    
    return this.http.get<Customer[]>(this.config.getServerUrl()+ "/Customers");
  }
  public getCustomersByFilter(name : string ):Observable<Customer[]>{
    
    return this
    .http
    .get<Customer[]>(this.config.getServerUrl()+ "/Customers")
    ;
  }
  
  public getCustomerById(id : number ):Observable<Customer>{
    
    return this.http.get<Customer>(this.config.getServerUrl()+ "/Customers/"+id);
  }
  
  public createCustomer(customer :CreateCustomerRequest):Observable<Customer>{
    
    return this.http.post<Customer>(this.config.getServerUrl()+ "/Customers",customer);
  }
  public addContactInfo(request :AddContactInfoRequest):Observable<void>{
    
    return this.http.post<void>(this.config.getServerUrl()+ "/Customers/AddContactInfo",request);
  }

public removeContactInfo(request :RemoveContactInfoRequest):Observable<void>{
    
    return this.http.post<void>(this.config.getServerUrl()+ "/Customers/RemoveContactInfo",request);
  }
  
  public updateCustomer(id :number ,request :UpdateCustomerRequest):Observable<void>{
    
    return this.http.put<void>(`${this.config.getServerUrl()}/Customers/${id}` ,request);
  }
  
  public deleteCustomer(customerId: number): Observable<void> {
    return this.http.delete<void>(`${this.config.getServerUrl()}/Customers/${customerId}`);
  }
}
