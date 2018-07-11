import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from "./services/authentication/authentication.service";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private authenticationService:AuthenticationService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        //check if user is not logged in but tries to visit the pages of site
        if (!this.authenticationService.isAuthenticated()){
            this.router.navigate(['/authentication/signin']);
        }

        return this.authenticationService.isAuthenticated();
    }
}
