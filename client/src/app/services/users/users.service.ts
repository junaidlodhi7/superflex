import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class UsersService {

  constructor(private http: ApiService) { }

    createUser(user){
        return this.http.post('/users',user);
    }

    list(page?){
        let url = typeof(page)=='number'? '/users?page='+page : '/users';
        return this.http.get(url);
    }

    updateUser(id, obj){
        return this.http.put('/users/'+id, obj);
    }

    deleteUser(id){
        return this.http.destroy('/users/'+id);
    }

    retrieve(id){
        let url = '/users/'+id;
        return this.http.get( url);
    }

}
