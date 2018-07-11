import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from "./services/authentication/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authenticationService:AuthenticationService, private router: Router) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        //check if user is logged in but tries to visit the 'sign in' or 'forgot password' etc pages
        if (this.authenticationService.isAuthenticated()){
            this.router.navigate(['/dashboard']);
        }
        return !this.authenticationService.isAuthenticated();
    }
}
