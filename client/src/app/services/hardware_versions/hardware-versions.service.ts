import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class HardwareVersionsService {

    constructor(private http: ApiService) { }

    list(page?){
        let url = typeof(page)=='number'? '/hardware_versions?page='+page : '/hardware_versions';
        return this.http.get(url);
    }

    createHVersion(hardwareVersion){
        return this.http.post('/hardware_versions',hardwareVersion);
    }

    updateHVersion(id, obj){
        return this.http.put('/hardware_versions/'+id, obj);
    }

    deleteHVersion(id){
        return this.http.destroy('/hardware_versions/'+id);
    }

}
