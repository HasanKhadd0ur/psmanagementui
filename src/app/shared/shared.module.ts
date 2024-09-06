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
import { StateTranslatePipe } from './pipes/stateTranslate/state-translate.pipe';
import { CardSkeletonComponent } from './componenets/card-skeleton/card-skeleton.component';
import { KnobModule } from 'primeng/knob';
import { ProgressBarModule } from 'primeng/progressbar';
import { SkeletonModule } from 'primeng/skeleton';



@NgModule({
  declarations: [

    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent,
    NavItemComponent,
    LoadingSpinnerComponent,
    FullnamePipe,
    StateTranslatePipe,
    CardItemComponent,
    CardSkeletonComponent
  
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
    StateTranslatePipe,
    CardItemComponent,
    SkeletonModule,
    ProgressBarModule,
    LoadingSpinnerComponent
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
