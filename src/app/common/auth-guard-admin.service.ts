import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class authGuardAdmin implements CanActivate {

  constructor(private router: Router,private cookieService: CookieService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token') !=null && this.cookieService.get('role') == 'ADMIN') {
      return true;
    }

    this.router.navigateByUrl("/home");
    return false;
  }

}
