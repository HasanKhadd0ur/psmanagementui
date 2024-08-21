import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../core/services/configuration/configuration.service';
import { Project } from '../models/responses/project';
import { Result } from '../../core/models/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http :HttpClient ,private config : ConfigurationService) { }
  
  public getByFilter():Observable<Result<Project[]>>{

    return this.http.get<Result<Project[]>>(this.config.getServerUrl()+ "/Projects/ByFilter");
  
  }
  public getProjectById(id : number ):Observable<Result<Project>>{
    
    return this.http.get<Result<Project>>(this.config.getServerUrl()+ "/Projects/"+id);
  }
  
}
