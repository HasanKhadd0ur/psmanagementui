import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../../core/models/authentication/loginRequest';
import { ConfigurationService } from '../../core/services/configuration/configuration.service';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { AuthenticationResponse } from '../../core/models/authentication/authenticationResponse';
import { DataStorageService } from '../../core/services/dataStorage/data-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginRequest:LoginRequest = {
    email :"",
    passWord:""
  }

  constructor(private dataStorage : DataStorageService,private router: Router,private authService :AuthenticationService ) {
  
  }


  onLogin() {
    this.authService
          .Login(this.loginRequest)
          .subscribe((res:AuthenticationResponse)=>{
          debugger;
          if(res.email) {
            this.dataStorage.setItem('userDetails', JSON.stringify(res));
            this.dataStorage.setItem('token', JSON.stringify(res.token));
            
            this.router.navigateByUrl('/board');

          } else {
            //alert(res.message)
          }
        },(err)=>console.log(err))
       
      }
       
}
