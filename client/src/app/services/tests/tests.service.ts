import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestsService {

    constructor( private http: ApiService) {}

    list(page){
        let url = '/tests?'+page;
        return this.http.get(url);
    }

    retrieve(id){
        let url = '/tests'+'/'+id;
        return this.http.get( url);
    }

    retrieveIntervals(id,page){
        let url = '/tests/'+id+'/data_intervals?page='+page;
        return this.http.get( url);
    }

    getGraphDataForShow(id){
        let url = '/tests/'+id+'/graph';
        return this.http.get(url);
    }

    getMotorIntervals(id, isFirstRequest, start?, end?){
        let url = isFirstRequest ? '/tests/'+id+'/motor_intervals' : '/tests/'+id+'/motor_intervals?start='+start+'&end='+end;
        return this.http.get(url);
    }

    createTest(test){
        let url = '/tests';
        return this.http.post(url,test);
    }

    stopTest(id){
        let url = '/tests/'+id+'/stop';
        return this.http.post(url,{});
    }

    extendTest(id){
        let url = '/tests/'+id+'/extend';
        return this.http.post(url,{});
    }

}
