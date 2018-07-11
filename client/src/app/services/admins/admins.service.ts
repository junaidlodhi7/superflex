import { Injectable }     from '@angular/core';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import {ApiService} from "../api.service";

@Injectable()
export class AdminsService {

    constructor(private http: ApiService) {}

    getUsers(page){
        return this.http.get('/admins?page='+page);
    }

    createUser(user){
        return this.http.post('/admins',user);
    }

    update(userID, user){
        let url = '/admins/'+userID;
        return this.http.put(url, user);
    }

    changePassword(updateUser){
        let url = '/settings/change_password';
        return this.http.post(url, updateUser);
    }

    regenerateInvitationLink(id){
        return this.http.get('/'+id+'/invitation_link');
    }

    updateUserProfile(user){
        let url = '/profile';
        return this.http.put(url, user);

    }

}
