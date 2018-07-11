import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class StorageSessionService {

    constructor(private http: ApiService) { }

    list(page?){
        let url = typeof(page)=='number'? '/storage_sessions?page='+page : '/storage_sessions';
        return this.http.get(url);
    }

    createStorageSession(storage_session) {
        return this.http.post('/storage_sessions', storage_session);
    }

    updateStorageSession(id, obj){
        return this.http.put('/storage_sessions/'+id, obj);
    }

    deleteStorageSession(id){
        return this.http.destroy('/storage_sessions/'+id);
    }

    retrieve(id){
        let url = '/storage_sessions/'+id;
        return this.http.get( url);
    }

    getGraphPoints(id, filters, start?, end?){
        // let url = '/motor_intervals' + (start? '?start='+start : '') + ( end? '&end='+end : '');
        // console.log(url);
        let url = '/storage_sessions/'+id+'/graph';
        return this.http.post( url , filters);
    }
}
