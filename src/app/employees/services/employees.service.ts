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
  
  
  public getEmployeeById(id : number ):Observable<Result<Employee>>{
    
    return this.http.get<Result<Employee>>(this.config.getServerUrl()+ "/Employees/"+id);
  }
  public getCurrentEmployee( ):Observable<Result<Employee>>{
    let id = this.userService.getEmployeeId();

    return this.getEmployeeById(id);
  }
  
  public getAvailableEmployees( ):Observable<Result<Employee[]>>{

    //this api endpoint take a pagination , i'll use i later 
    return this.http.get<Result<Employee[]>>(this.config.getServerUrl + "/Employees/Available");
  }
  
  public getEmployeeParticipations(id :number ):Observable<Result<EmployeeParticipate[]>>{

    return this.http.get<Result<EmployeeParticipate[]>>(`${this.config.getServerUrl}/Employees/EmployeeParticipations/employeeId=${id}`);
  }

  public getMyParticipation( ):Observable<Result<EmployeeParticipate[]>>{

    let id = this.userService.getEmployeeId();
    return this.getEmployeeParticipations(id);

  }
  public getEmployeeTrackHistory( request: GetEmployeeTrackHistoryRequest):Observable<Result<EmployeeTrack[]>>{
    let pagination=''
    if(request.pageSize && request.pageNumber){
       pagination = `&pageSize=${request.pageSize}&pageNumber=${request.pageNumber}`
    }

    let query =`employeeId=${request.employeeId}&projectId=${request.projectId}${pagination}`
    return  this
              .http
              .get<Result<EmployeeTrack[]>>(
                  `${this.config.getServerUrl}/Employees/TrackHistory/?${query}`
                );
  }
  
  public getMyTrackHistory(projectId : number):Observable<Result<EmployeeTrack[]>>{
    
    let query =`employeeId=${this.userService.getEmployeeId()}&projectId=${projectId}`
    return  this
              .http
              .get<Result<EmployeeTrack[]>>(
                  `${this.config.getServerUrl}/Employees/TrackHistory/?${query}`
                );
  }

  public postEmployeeWorkHours( request: UpdateEmplyeeWorkHours):Observable<Result<void>>{

    return  this
              .http
              .post<Result<void>>(
                  `${this.config.getServerUrl}/Employees/UpdateWorkHours/`,
                  request
                );
  }
  
  
  }
