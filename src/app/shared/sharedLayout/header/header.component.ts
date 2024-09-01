import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/authentication/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { ConfigurationService } from '../../../core/services/configuration/configuration.service';

@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  @Input() isToggled :Boolean;

  appName =ConfigurationService.AppName
  fullName :string
  email : string
  constructor(
    private router: Router,
    private userService : UserService,
    private toastr : ToastrService,
    private auth : AuthenticationService
  ) { }

  ngOnInit(): void {
    this.email= this.userService.getCurrentUser().email
    this.fullName= this.userService.getUserFirstName()+"  " + this.userService.getUserLastName();

  }

  toggleSidebar() {
    console.log(this.isToggled)
    this.isToggled = !this.isToggled;
  }

  logout() {

    this.toastr.info("بانتظارك في المرة القادمة");
    this.auth.logout();
    this.router.navigate(['/login']);
    }
    

}
