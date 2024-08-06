import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'PSManagement';

  ngAfterViewInit() {
    // if (window['feather']) {
    //   window['feather'].replace();
    // }
  }
}
