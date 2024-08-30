import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataStorageService } from './services/dataStorage/data-storage.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ConfigurationService } from './services/configuration/configuration.service';
import { UserService } from './services/authentication/user.service';
import { PdfDownloaderService } from './services/pdfDownloader/pdf-downloader.service';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    DataStorageService,
    AuthenticationService,
    ConfigurationService,
    UserService,
    PdfDownloaderService
  ]
})
export class CoreModule { }
