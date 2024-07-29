import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataStorageService } from './services/dataStorage/data-storage.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ConfigurationService } from './services/configuration/configuration.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    DataStorageService,
    AuthenticationService,
    ConfigurationService
  ]
})
export class CoreModule { }
