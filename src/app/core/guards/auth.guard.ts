import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private  auth :AuthenticationService) { }
  canActivate(
    next : ActivatedRouteSnapshot,
    state: RouterStateSnapshot, ) {

      
    if (this.auth.isAuthenticated()) {
      return true ;
    } else {
      this.router.navigate(["/login"])
      return false;
    }
  }
}

