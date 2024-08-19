import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent   {

  isToggled :Boolean= false ;
  constructor( ) {
  
  }
  toggleSidebar(){

    this.isToggled=!this.isToggled;
  }

}
