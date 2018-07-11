import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class ProductConfigsService {

    constructor(private http: ApiService) { }

    list(page?){
        let url = typeof(page)=='number'? '/product_configs?page='+page : '/product_configs';
        return this.http.get(url);
    }

    createProductConfig(product_config) {
        return this.http.post('/product_configs', product_config);
    }
}
