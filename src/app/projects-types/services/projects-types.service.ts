import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../core/services/configuration/configuration.service';
import { ProjectType } from '../models/responses/projectType';
import { Observable } from 'rxjs';
import { CreateNewTypeRequest } from '../models/requests/createNewTypeRequest';
import { UpdateTypeRequest } from '../models/requests/updateProjectTypeRequest';

@Injectable({
  providedIn: 'root'
})
export class ProjectsTypesService {
 
  constructor(private http :HttpClient ,private config : ConfigurationService) { }


  public getAllTypes():Observable<ProjectType[]>{

    return this
    .http
    .get<ProjectType[]>
    (this.config.getServerUrl()+ "/ProjectsTypes");
  
  }

  public getTypeById(typeId : number ):Observable<ProjectType>{

    return this
    .http
    .get<ProjectType>
    (this.config.getServerUrl()+ "/ProjectsTypes/"+typeId);
  
  }


  public addType(request : CreateNewTypeRequest):Observable<ProjectType>{

    return this
    .http
    .post<ProjectType>
    (this.config.getServerUrl()+ "/ProjectsTypes/",request);
  
  }

  public delete(typeId : number ):Observable<void>{

    return this
    .http
    .delete<void>
    (this.config.getServerUrl()+ "/ProjectsTypes"+typeId);
  
  }


  public updateType(typeId : number , request : UpdateTypeRequest):Observable<void>{

    return this
    .http
    .put<void>
    (this.config.getServerUrl()+ "/ProjectsTypes/"+typeId,request);
  
  }




}
