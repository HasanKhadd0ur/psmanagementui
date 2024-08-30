import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../../core/models/authentication/loginRequest';
import { ConfigurationService } from '../../core/services/configuration/configuration.service';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { AuthenticationResponse } from '../../core/models/authentication/authenticationResponse';
import { DataStorageService } from '../../core/services/dataStorage/data-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
 
  //login request  
  loginRequest:LoginRequest = {
    email :"",
    passWord:""
  }


  ngOnInit(): void {
   
    // check if the user already exist 
    if(this.authService.isAuthenticated()){
   
      this.toastr.info('أنت مسجل بالفعل لاداعي لإعادة التسجيل', ' ')
      this.router.navigateByUrl('/home');
    }

  }

  constructor(
    private dataStorage : DataStorageService,
    private router: Router,
    private authService :AuthenticationService,
    private toastr: ToastrService ) {
  
  }


  // handel login
  //#region  Login handler
  onLogin() {

    this
    .authService
    .Login(this.loginRequest)
    .subscribe(
      {
      next: (res:AuthenticationResponse)=>{
        if(res.email) {
          this.dataStorage.setItem('userDetails', JSON.stringify(res));
          this.dataStorage.setItem('token', JSON.stringify(res.token));
          this.toastr.info('مرحبا بك مجددا يا ' + res.firstName+" " +res.lastName);
          this.router.navigateByUrl('/home');

        } 
      },
      error: (err)=>{
        console.log(err);
        this.showErrors(err.errors || ['لقد حدث خطاء ما']);
      }
    });
  }

  //#endregion  Login handler


  //#region  Error Show
  private showErrors(errors: string[]): void {
    errors.forEach(error => this.toastr.error(error, 'Login Failed'));
  }
  //#endregion  Error Show
}
