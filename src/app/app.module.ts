import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigurationService } from './core/services/configuration/configuration.service';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './shared/sharedLayout/layout/layout.component';
import { FooterComponent } from "./shared/sharedLayout/footer/footer.component";
import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './shared/sharedLayout/sidebar/sidebar.component';
import { HeaderComponent } from './shared/sharedLayout/header/header.component';
import { CustomersModule } from './customers/customers.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PageNotfoundComponent } from './pages/page-notfound/page-notfound.component';
import { LOCALE_ID } from '@angular/core';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PageNotfoundComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    CustomersModule,
    SharedModule,
    HttpClientModule
],
  providers: [
  
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'en' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }
