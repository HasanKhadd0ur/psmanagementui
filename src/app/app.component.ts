import { AfterViewInit, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigurationService } from './core/services/configuration/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title =ConfigurationService.AppName;
  

  //#region  Application Costrucotr
  constructor(private config : ConfigurationService) {  }
  //#endregion  Application Costrucotr
}

