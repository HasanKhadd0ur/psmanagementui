import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
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
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomerRoutingModule } from './customers/routing/customer-routing.module';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { ProjectsModule } from './projects/projects.module';
import { ProjectRoutingModule } from './projects/project-routing.module';
import { ProjectFAQComponent } from './pages/project-faq/project-faq.component';
import { PsmStartComponent } from './pages/psm-start/psm-start.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PageNotfoundComponent,
    ProjectFAQComponent,
    PsmStartComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerRoutingModule,
    ProjectRoutingModule,
    FormsModule,
    ProjectsModule,
    CoreModule,
    CustomersModule,
    SharedModule,
    NgxPaginationModule,
    BrowserAnimationsModule, // Required for toast animations
    ToastrModule.forRoot({
      positionClass: 'toast-top-full-width', // Position the toast
      timeOut: 3000, // Toast timeout
      preventDuplicates: true,
      progressBar: true, // Prevent duplicate toasts
    }),
    HttpClientModule,
    NgbModule
  
],
  providers: [
  
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
