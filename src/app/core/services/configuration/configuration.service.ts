import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  //#region  Constants 
  
  // application  name 
  public static AppName=environment.applicationName;
  
  //#endregion Constatns


  //#region  Dependencies
  private  baseUrl = environment.serverUrl ;
  //#endregion  Dependencies
  
  
  //#region  Constructors
  constructor() { }
  //#endregion  Constructors

  //#region  App name Accessor 
  
  public getAppName(){

    return ConfigurationService.AppName;

  }
  //#endregion  App name Accessor 
  
  //#region  Server URL Accessor
  public getServerUrl(){
    return this.baseUrl ;
  }
  //#endregion  Server URL Accessor
}
