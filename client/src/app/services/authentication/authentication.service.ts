import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';



@Injectable()
export class AuthenticationService {

    public authApi = environment.backendUrl+"/login";
    public token: string;
    private static justLoggedIn: false;

    constructor(private router: Router , private http: Http) {
        // set token if saved in local storage
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string) {
        return this.http.post(this.authApi , { email: username, password: password ,headers: { "Content-Type" : "application/json" }});
    }

    setCredentials(token, user, version){
        this.token = token;
        localStorage.setItem('currentUser', JSON.stringify({user}));
        localStorage.setItem('currentUserToken', JSON.stringify(token));
        localStorage.setItem('version', JSON.stringify(version));
    }

    requestForReset(obj){
        return this.http.post(environment.backendUrl+'/reset' , obj)
    }

    resetPassword(token, obj){
        return this.http.post(environment.backendUrl+'/reset/'+token , obj)
    }
    getJustLoggedInStatus(){
        return AuthenticationService.justLoggedIn;
    }

    setJustLoggedInStatus(flag){
        AuthenticationService.justLoggedIn = flag;
    }

    getUserObject(token){
        return this.http.get(environment.backendUrl+'/invitations/'+token)
    }

    setUserObject(token, obj){
        return this.http.post(environment.backendUrl+'/invitations/'+token , obj)
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUserToken');
        localStorage.removeItem('currentUser');
        location.reload();
        this.router.navigate(['login']);
    }


    getSession() {
        var session = JSON.parse (localStorage.getItem('currentUser'));
        var header = {
            'X-CSRF-Token': session.user.token,
            'x-loggedin-user-session': session.user.session_name+'='+session.user.sessid};
        return {session:session, header:header }
    }

    isAuthenticated(){
        if(localStorage.getItem('currentUser'))
        {
            return true;
        }
        else {
            return false;
        }
    }

    storeUpdatedUser(user){
        localStorage.setItem('currentUser', JSON.stringify({user}));
    }

    getLoggedInUser(){
        return JSON.parse(localStorage.getItem('currentUser')).user;
    }

    getVersion(){
        return JSON.parse(localStorage.getItem('version'));

    }

}
