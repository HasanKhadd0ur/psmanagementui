import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../../core/services/configuration/configuration.service';
import { Observable } from 'rxjs';
import { Result } from '../../core/models/result';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public  static customers : Customer[] = [
    { id :1,
      customerName:"CQRE",
      email :"CQRE@CC.mail",
      address :{
        streetName:"Barzeh",
        streetNumber:12,
        city:"Damascus",
        zipCode:1223
      },
      contactInfo :[
        {
          contactType:"mob",
          contactValue:"096734635"
        },
        {
          contactType:"fax",
          contactValue:"32434-32434-34"
        },
        
      ]
    },{
      id :2,
      customerName:"BBS",
      email :"BBS@CC.mail",
      address :{
        streetName:"Barzeh",
        streetNumber:112,
        city:"Damascus",
        zipCode:1223
      },      
      contactInfo :[]
    },{
      id :3,
      customerName:"ERW",
      email :"EWR@CC.mail",
      address :{
        streetName:"Barzeh",
        streetNumber:232,
        city:"Damascus",
        zipCode:1223
      },
      contactInfo :[]
    }
  ];

  constructor(private http :HttpClient ,private config : ConfigurationService) { }
  
  public getCustomers():Observable<Result<Customer[]>>{
    
    return this.http.get<Result<Customer[]>>(this.config.getServerUrl()+ "/Customers");
  }
  
  public getCustomerById(id : number ):Observable<Result<Customer>>{
    
    return this.http.get<Result<Customer>>(this.config.getServerUrl()+ "/Customers/"+id);
  }
  
  public createCustomer(customer :Customer):Observable<Result<void>>{
    
    return this.http.post<Result<void>>(this.config.getServerUrl()+ "/Customers",customer);
  }

  public updateCustomer(id :number ,customer :Customer):Observable<Result<void>>{
    
    return this.http.put<Result<void>>(`${this.config.getServerUrl()}/Customers/${id}` ,customer);
  }
  
  public deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.config.getServerUrl()}/Customers/${id}`);
  }
}
