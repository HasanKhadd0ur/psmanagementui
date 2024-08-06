import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './sharedLayout/header/header.component';
import { FooterComponent } from './sharedLayout/footer/footer.component';
import { SidebarComponent } from './sharedLayout/sidebar/sidebar.component';
import { LayoutComponent } from './sharedLayout/layout/layout.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@NgModule({
  declarations: [

    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent
  
  ],
  imports: [
    CommonModule,  
    RouterModule 
  ],
  exports:[
    HeaderComponent,
    FooterComponent,    
    SidebarComponent,
    LayoutComponent
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
