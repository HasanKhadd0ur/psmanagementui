import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../core/services/configuration/configuration.service';
import { FinancialSpending } from '../models/responses/financialSpending';
import { Observable } from 'rxjs';
import { CreateFinancialSpendItemRequest } from '../models/requests/financial-reuqests/CreateFinancialSpendItemRequest';
import { GetFinancialSpendItemByProjecRequest } from '../models/requests/financial-reuqests/GetFinancialSpendItemByProjectRequest';
import { RemoveFinancialSpendItemRequest } from '../models/requests/financial-reuqests/RemoveFinancialSpendItemRequest';
import { UpdateFinancialSpendItemRequest } from '../models/requests/financial-reuqests/UpdateFinancialSpendItemRequest';
import { GetFinancialSpendItemByIdRequest } from '../models/requests/financial-reuqests/GetFinancialSpendItemByIdRequest';

@Injectable({
  providedIn: 'root'
})
export class FinancialSpendingService {

  constructor(private http : HttpClient , private config : ConfigurationService) { }

  public getSpendById(request : GetFinancialSpendItemByIdRequest ):Observable<FinancialSpending>{
    
    return this.http.get<FinancialSpending>(`${this.config.getServerUrl()}/FinancialSpends/?id=${request.id}&projectId=${request.projectId}`);
  }

  public addSpendItem(request : CreateFinancialSpendItemRequest ):Observable<FinancialSpending>{
    
    return this.http.post<FinancialSpending>(this.config.getServerUrl()+ "/FinancialSpends/",request);
  }

  public getSpendByProject(request : GetFinancialSpendItemByProjecRequest ):Observable<FinancialSpending[]>{
    let pagination = this.getPagination(request.pageSize,request.pageNumber)
    return this.http.get<FinancialSpending[]>(`${this.config.getServerUrl()}/FinancialSpends/ByProject/?projectId=${request.projectId}${pagination}`);
  }

  public delete(request : RemoveFinancialSpendItemRequest ):Observable<any>{
    return this.http.delete(`${this.config.getServerUrl()}/FinancialSpends/${request.id}?id=${request.id}&projectId=${request.projectId}`);
  }



  public updateSpendItem(request : UpdateFinancialSpendItemRequest ):Observable<FinancialSpending>{
    
    return this.http.put<FinancialSpending>(this.config.getServerUrl()+ "/FinancialSpends/",request);
  }


  
  //#region  pagination convert 
  private getPagination( pageSize:number | null , pageNumber : number |null ){

    if(pageNumber == null || pageSize == null){
      return "";
    }
    else {

      return `&pageSize=${pageSize}&PageNumber=${pageNumber}`;

    }


  }
//#endregion pagination convert
}
