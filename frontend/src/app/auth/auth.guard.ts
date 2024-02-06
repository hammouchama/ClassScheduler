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
      const roles = route.data['role'] as string[]
      if (roles) {
        if (this.userAthuService.roleMatch(roles)) {
          return true
        } else {
          this.router.navigate(['/403']);
          return false
        }
      }
    }
    this.router.navigate(['/login'])
    return false

  }
}
