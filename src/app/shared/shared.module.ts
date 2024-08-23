import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './sharedLayout/header/header.component';
import { FooterComponent } from './sharedLayout/footer/footer.component';
import { SidebarComponent } from './sharedLayout/sidebar/sidebar.component';
import { LayoutComponent } from './sharedLayout/layout/layout.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavItemComponent } from './componenets/nav-item/nav-item.component';
import { LoadingSpinnerComponent } from './componenets/loading-spinner/loading-spinner.component';
import { FullnamePipe } from './pipes/fullName/fullname.pipe';
import { CardItemComponent } from './componenets/card-item/card-item.component';


@NgModule({
  declarations: [

    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent,
    NavItemComponent,
    LoadingSpinnerComponent,
    FullnamePipe,
    CardItemComponent
  
  ],
  imports: [
    CommonModule,  
    RouterModule 
  ],
  exports:[
    HeaderComponent,
    FooterComponent,    
    SidebarComponent,
    LayoutComponent,
    FullnamePipe,
    CardItemComponent,
    LoadingSpinnerComponent
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
