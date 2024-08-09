import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './shared/sharedLayout/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { PageNotfoundComponent } from './pages/page-notfound/page-notfound.component';

export const routes: Routes = [
  
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: '',
        component:HomeComponent  ,
        pathMatch: "full"
      }    ,
      {
        path: 'customers',
        component: CustomerListComponent
      }
      
    ]

  }
  ,
  {
    path: '**',
    component:PageNotfoundComponent  
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
