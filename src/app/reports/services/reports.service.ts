import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../projects/models/responses/project';
import { ConfigurationService } from '../../core/services/configuration/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http : HttpClient,private config : ConfigurationService) { }


  // this method reponsible for geting the specificed projet by its id 
  // 
  public getProjectById(id : number ):Observable<Project>{
    
    return this.http.get<Project>(this.config.getServerUrl()+ "/Projects/"+id);
  }
}
