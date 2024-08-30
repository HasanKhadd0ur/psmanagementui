//#region  Imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../../models/authentication/loginRequest';
import { RegisterRequest } from '../../models/authentication/registerRequest';
import { AuthenticationResponse } from '../../models/authentication/authenticationResponse';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ConfigurationService } from '../configuration/configuration.service';
import { DataStorageService } from '../dataStorage/data-storage.service';
import { CookieService } from 'ngx-cookie-service';

//#endregion  Imports

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  //#region  Consrtuctor
  constructor(
    private http : HttpClient,
    private config : ConfigurationService,
    private dataStorage : DataStorageService,
    private cookieService :CookieService 
  
  ) { }
  //#endregion  Consrtuctor


  //#region  Login 

  Login(loginRequest : LoginRequest ) :Observable<AuthenticationResponse>{
  
    return this.http
          .post<AuthenticationResponse>(
            this.config.getServerUrl()+ "/Authentication/Login",loginRequest).pipe(
              tap(response => {
                // Store JWT token in cookie
                this.cookieService.set('token', response.token,1); // Expires in  days
              }) 
            )
  }

  //#endregion Login
  
  
  //#region  Un used Registeration  

  // in our domain there are no registeration 

  // Register(registerRequest : RegisterRequest ) :Observable<AuthenticationResponse>{
  
  //   return this.http
  //         .post<AuthenticationResponse>(
  //           this.config.getServerUrl()+ "/Authentication/register",registerRequest)
  //         .pipe(
  //             catchError(error => {
  //               return throwError(() => error.error);
  //             })
  //           );       
  // }

  //#endregion  Un used Registeration 


  //#region  Authentication 
  isAuthenticated():Boolean{
    if(this.getToken()){
      return true ;
    }else{
      return false ;
    }

  }

  getToken(): string | null {
    return this.cookieService.get('token');
  }

  //#endregion  Authentication 


  //#region  Logout

  logout(){
    this.cookieService.delete('token');
    this.dataStorage.removeItem("userDetails");
  }
  //#endregion  Logout


}
