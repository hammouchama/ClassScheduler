import { Injectable } from '@angular/core';
import { CanActivateFn, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../service/user-auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private userAthuService: UserAuthService,
    private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.userAthuService.getToken() !== null) {
      const role = route.data['role']
      if (role) {
        if (role === this.userAthuService.getRole()) {
          return true
        } else {
          this.router.navigate(['/forbidden']);
          return false
        }
      }
    }
    this.router.navigate(['/login'])
    return false

  }
}
