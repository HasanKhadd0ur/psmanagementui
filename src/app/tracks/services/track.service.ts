import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../../core/services/configuration/configuration.service';
import { Track } from '../models/responses/track';
import { StepTrack } from '../models/responses/steptrack';
import { UpdateStepTrack } from '../models/requests/UpdateStepTrack';
import { AddEmployeeTrackRequest } from '../models/requests/AddEmployeeTrackRequest';
import { AddStepTrackRequest } from '../models/requests/AddStepTrackRequest';
import { CompleteTrackRequest } from '../models/requests/completeTrakRequest';
import { CreateTrackRequest } from '../models/requests/CreateTrackRequest';
import { GetTracksByProjectRequest } from '../models/requests/GetTracksByProjectRequest';
import { RemoveTrackRequest } from '../models/requests/RemoveTrackRequest';
import { UpdateEmployeeWorkTrackRequest } from '../models/requests/UpdateEmployeeWorkTrackRequest';
import { EmployeeTrack } from '../models/responses/employeeTrack';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  
  constructor(private http : HttpClient,private config : ConfigurationService) { }
 
  // this method retreive  the track by its id  
  public getByTrackById(trackId : number ):Observable<Track>{
    
    
    return this
              .http
              .get<Track>(`${this.config.getServerUrl()}/Tracks/${trackId}`
              );
  }
  
  getUnCompletedTrack() : Observable<Track[]> {


    return this
    .http
    .get<Track[]>
    (`${this.config.getServerUrl()}/UnCompleted`);
  }



  // this method retreive  the steps track  by track id  
  //
  public getStepsTrackById(trackId : number ):Observable<StepTrack[]>{
  
    return this
    .http
    .get<StepTrack[]>(`${this.config.getServerUrl()}/Tracks/GetStepsTrack/${trackId}`
    );
  }
// this method retreive  the employees track  by track id  
  //
  public getEmployeesTrackById(trackId : number ):Observable<EmployeeTrack[]>{
  
    return this
    .http
    .get<EmployeeTrack[]>(`${this.config.getServerUrl()}/Tracks/GetEmployeesTrack/${trackId}`
    );
  }
  
  // this method retreive  the  tracks  by project id  
  //
  public getTrackByProjectId(request :GetTracksByProjectRequest ):Observable<Track[]>{
  
    let pagination =this.getPagination(request.pageSize,request.pageNumber);
   
    return this
    .http
    .get<Track[]>(`${this.config.getServerUrl()}/Tracks/GetTracksByProject/?projectId=${request.projectId}${pagination}`
    );
  }

  // this method add a steps tracks  to a track  
  //
  public addStepTrack(request :AddStepTrackRequest ):Observable<number>{
  
    return this
    .http
    .post<number>(`${this.config.getServerUrl()}/Tracks/AddStepTrack/`,request
    );
  }


  // this method add a employee tracks  to a track  
  //
  public addEmployeeTrack(request :AddEmployeeTrackRequest ):Observable<number>{
  
    return this
    .http
    .post<number>(`${this.config.getServerUrl()}/Tracks/AddEmployeeTrack/`,request
    );
  }


// this method complete a track  
  //
  public completeTrack(request :CompleteTrackRequest ):Observable<void>{
  
    return this
    .http
    .post<void>(`${this.config.getServerUrl()}/Tracks/AddStepTrack/`,request
    );
  }

  // this method remove a track  
  //
  public removeTrack(request :RemoveTrackRequest ):Observable<void>{
  
    return this
    .http
    .post<void>(`${this.config.getServerUrl()}/Tracks/RemoveTrack/`,request
    );
  }

  // this method add  a track  
  //
  public createTrack(request :CreateTrackRequest ):Observable<Track>{
  
    return this
    .http
    .post<Track>(`${this.config.getServerUrl()}/Tracks/`,request
    );
  }

  // this method update the employee work  
  //
  public updateEmployeeWorkTrack(request :UpdateEmployeeWorkTrackRequest ):Observable<void>{
  
    return this
    .http
    .put<void>(`${this.config.getServerUrl()}/Tracks/UpdateEmployeeWorkTrack/`,request
    );

  }

  
  // this method update the step track  
  //
  public UupdateStepTrack(request :UpdateStepTrack ):Observable<void>{
  
    return this
    .http
    .put<void>(`${this.config.getServerUrl()}/Tracks/UpdateStepTrack/`,request
    );

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
