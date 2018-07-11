import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class HardwareComponentService {

    constructor(private http: ApiService) { }

    list(page?){
        let url = '/hardware_components?page='+page;
        return this.http.get(url);
    }

    createHComponent(hardwareComponent){
        return this.http.post('/hardware_components',hardwareComponent);
    }

    updateHComponent(id, obj){
        return this.http.put('/hardware_components/'+id, obj);
    }

    deleteHComponent(id){
        return this.http.destroy('/hardware_components/'+id);
    }
}
