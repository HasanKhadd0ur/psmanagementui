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
  loginRequest:LoginRequest = {
    email :"",
    passWord:""
  }
  ngOnInit(): void {
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


  onLogin() {
    this.authService
        .Login(this.loginRequest)
        .subscribe({
          next: (res:AuthenticationResponse)=>{
            if(res.email) {
              this.dataStorage.setItem('userDetails', JSON.stringify(res));
              this.dataStorage.setItem('token', JSON.stringify(res.token));
              console.log(res.token)
              this.toastr.info('مرحبا بك مجددا يا ' + res.firstName+" " +res.lastName);
              this.router.navigateByUrl('/home');


            } else {
            }
          },
          error: (err)=>{
            console.log(err);
            this.showErrors(err.errors || ['An unexpected error occurred.']);
            //            this.router.navigateByUrl('/home');
          }
        });

    }
    private showErrors(errors: string[]): void {
      errors.forEach(error => this.toastr.error(error, 'Login Failed'));
    }
       
}
