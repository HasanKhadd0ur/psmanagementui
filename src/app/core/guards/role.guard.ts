import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { UserService } from '../services/authentication/user.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: UserService,
    private router: Router,
    private toastr :ToastrService
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    // Get the roles required for the route from the route data
    const requiredRoles: string[] = route.data['roles'];

    // Get current user  roles
    const userRoles = this.authService.getCurrentUserRoles(); // Array of roles

    // Check if user has any of the required roles
    if (requiredRoles.some(role => userRoles.map(e => e.name).includes(role))) {
      return true;
    } else {
      this.toastr.error('ليس لديك صلاحيات الوصول إلى هذه الصفحة')
      this.router.navigate(['/']); // Redirect to home page
      return false;
    }
  }
}
