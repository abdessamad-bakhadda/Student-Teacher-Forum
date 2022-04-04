import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private authService :AuthService) {
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if(this.authService.connecté) console.log(this.authService.connecté) ;
      else console.log(false) ;
      console.log(this.authService.connecté) ;
      return true ;// changer la apres
      //return (this.authService.connecté) ;
  }
}
