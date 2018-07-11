import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class ProductConfigRevisionsService {

    constructor(private http: ApiService) { }

    list(page?){
        let url = typeof(page)=='number'? '/product_config_revisions?page='+page : '/product_config_revisions';
        return this.http.get(url);
    }

    createProductConfigRevision(product_config_revision) {
        return this.http.post('/product_config_revisions', product_config_revision);
    }
}
