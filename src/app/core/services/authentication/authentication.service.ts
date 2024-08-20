import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../../models/authentication/loginRequest';
import { RegisterRequest } from '../../models/authentication/registerRequest';
import { AuthenticationResponse } from '../../models/authentication/authenticationResponse';
import { catchError, Observable, throwError } from 'rxjs';
import { ConfigurationService } from '../configuration/configuration.service';
import { DataStorageService } from '../dataStorage/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http : HttpClient,private config : ConfigurationService, private dataStorage : DataStorageService) { }
  
  getAuthorizationToken() {
    return this.dataStorage.getItem("token");
  }

  Login(loginRequest : LoginRequest ) :Observable<AuthenticationResponse>{
  
    return this.http
          .post<AuthenticationResponse>(
            this.config.getServerUrl()+ "/Authentication/Login",loginRequest)       
  }

  Register(registerRequest : RegisterRequest ) :Observable<AuthenticationResponse>{
  
    return this.http
          .post<AuthenticationResponse>(
            this.config.getServerUrl()+ "/Authentication/register",registerRequest)
          .pipe(
              catchError(error => {
                return throwError(() => error.error);
              })
            );       
  }

  isAuthenticated():Boolean{
    if(this.dataStorage.getItem("token")){
      return true ;
    }else{
      return false ;
    }

  }
  
  logou(){
    
    this.dataStorage.removeItem("token");
    this.dataStorage.removeItem("userDetails");
  }
}
