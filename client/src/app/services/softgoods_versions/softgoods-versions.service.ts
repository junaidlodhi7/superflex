import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class SoftgoodsVersionsService {

    constructor(private http: ApiService) { }

    list(page?){
        let url = typeof(page)=='number'? '/softgoods_versions?page='+page : '/softgoods_versions';
        return this.http.get(url);
    }

    createSVersion(softgoods_version){
        return this.http.post('/softgoods_versions',softgoods_version);
    }
}
