import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class ProductVersionsService {

    constructor(private http: ApiService) { }

    list(page?){
        let url = typeof(page)=='number'? '/product_versions?page='+page : '/product_versions';
        return this.http.get(url);
    }

    createPVersion(product_version){
        return this.http.post('/product_versions',product_version);
    }

}
