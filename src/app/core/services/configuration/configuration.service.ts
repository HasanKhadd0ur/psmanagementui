import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private  baseUrl = environment.serverUrl ;

  constructor() { }

  public getServerUrl(){
    return this.baseUrl ;
  }
}
