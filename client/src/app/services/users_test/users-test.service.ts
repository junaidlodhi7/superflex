import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class UsersTestService {

    constructor(private http: ApiService) { }

    getTotalUsers(){
        let url = '/users_tests/count';
        return this.http.get( url);
    }

    getGraphData(){
        let url = '/users_tests/graph';
        return this.http.get( url);
    }

    getGraphPoints(start?, end?){
        let url = '/motor_intervals' + (start? '?start='+start : '') + ( end? '&end='+end : '');
        console.log(url);
        return this.http.get( url);
    }


}
