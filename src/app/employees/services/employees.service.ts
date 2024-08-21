import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../../core/models/result';
import { ConfigurationService } from '../../core/services/configuration/configuration.service';
import { Employee } from '../models/responses/employee';
import { UserService } from '../../core/services/authentication/user.service';
import { EmployeeParticipate } from '../models/responses/employeeParticipate';
import { GetEmployeeTrackHistoryRequest } from '../models/requests/getEmployeeTrackHistoryRequest';
import { EmployeeTrack } from '../../tracks/models/responses/employeeTrack';
import { UpdateEmplyeeWorkHours } from '../models/requests/updateEmployeeWorkHoursRequest';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private http :HttpClient ,
    private config : ConfigurationService,
    private userService : UserService
  ) {
    
   }
  
  
  public getEmployeeById(id : number ):Observable<Employee>{
    
    return this.http.get<Employee>(this.config.getServerUrl()+ "/Employees/"+id);
  }

  public getCurrentEmployee( ):Observable<Employee>{
    let id = this.userService.getEmployeeId();

    return this.getEmployeeById(id);
  }
  
    public getByFilter(email : string  ):Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.config.getServerUrl()}/Employees/ByFilter/?email=${email}`);

  }
  
  public getAvailableEmployees( ):Observable<Employee[]>{

    //this api endpoint take a pagination , i'll use i later 
    return this.http.get<Employee[]>(this.config.getServerUrl() + "/Employees/Available");
  }
  
  public getEmployeeParticipations(id :number ):Observable<EmployeeParticipate[]>{

    return this.http.get<EmployeeParticipate[]>(`${this.config.getServerUrl}/Employees/EmployeeParticipations/employeeId=${id}`);
  }

  public getMyParticipation( ):Observable<EmployeeParticipate[]>{

    let id = this.userService.getEmployeeId();
    return this.getEmployeeParticipations(id);

  }
  public getEmployeeTrackHistory( request: GetEmployeeTrackHistoryRequest):Observable<EmployeeTrack[]>{
    let pagination=''
    if(request.pageSize && request.pageNumber){
       pagination = `&pageSize=${request.pageSize}&pageNumber=${request.pageNumber}`
    }

    let query =`employeeId=${request.employeeId}&projectId=${request.projectId}${pagination}`
    return  this
              .http
              .get<EmployeeTrack[]>(
                  `${this.config.getServerUrl}/Employees/TrackHistory/?${query}`
                );
  }
  
  public getMyTrackHistory(projectId : number):Observable<EmployeeTrack[]>{
    
    let query =`employeeId=${this.userService.getEmployeeId()}&projectId=${projectId}`
    return  this
              .http
              .get<EmployeeTrack[]>(
                  `${this.config.getServerUrl}/Employees/TrackHistory/?${query}`
                );
  }

  public postEmployeeWorkHours( request: UpdateEmplyeeWorkHours):Observable<void>{

    return  this
              .http
              .post<void>(
                  `${this.config.getServerUrl}/Employees/UpdateWorkHours/`,
                  request
                );
  }
  
  
  }
