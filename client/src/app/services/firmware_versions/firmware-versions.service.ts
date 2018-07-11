import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class FirmwareVersionsService {

    constructor(private http: ApiService) { }

    list(page?){
        let url = typeof(page)=='number'? '/firmware_versions?page='+page : '/firmware_versions';
        return this.http.get(url);
    }

    createFVersion(firmware_version){
        return this.http.post('/firmware_versions',firmware_version);
    }
}
