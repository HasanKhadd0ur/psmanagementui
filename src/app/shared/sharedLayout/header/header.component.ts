import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/authentication/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';

@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  @Input() isToggled :Boolean;

  fullName :string
  
  constructor(
    private router: Router,
    private userService : UserService,
    private toastr : ToastrService,
    private auth : AuthenticationService
  ) { }

  ngOnInit(): void {
    
    this.fullName= this.userService.getUserFirstName()+"  " + this.userService.getUserLastName();

  }

  toggleSidebar() {
    console.log(this.isToggled)
    this.isToggled = !this.isToggled;
  }

  logout() {

    this.toastr.info("بانتظارك في المرة القادمة");
    this.auth.logou();
    this.router.navigate(['/login']);
    }
    

}
