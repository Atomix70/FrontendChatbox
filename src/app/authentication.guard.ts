import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardService } from './authguard.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
constructor(private authguard:AuthguardService,private router:Router){

}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    if(!this.authguard.getToken()){
      this.router.navigateByUrl("/login/login")
    }
    return this.authguard.getToken();
  }
  
}
