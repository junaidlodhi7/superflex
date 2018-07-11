import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class SuitsService {

  constructor(private http: ApiService) { }

    list(pagination?){
        let url = typeof(pagination) == "undefined" ? '/suits' : '/suits?pagination=false' ;
        return this.http.get( url);
    }

    getUserCount(suitID){
        let url = '/suits/'+suitID+'/users/count';
        return this.http.get( url);
    }

    getUserTestsCount(suitID){
        let url = '/suits/'+suitID+'/users_tests/count';
        return this.http.get( url);
    }


}
