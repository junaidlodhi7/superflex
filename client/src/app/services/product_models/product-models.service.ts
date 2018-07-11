import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class ProductModelsService {

    constructor(private http: ApiService) { }

    list(page?){
        let url = typeof(page)=='number'? '/product_models?page='+page : '/product_models';
        return this.http.get(url);
    }

    createProductModel(product_model){
        return this.http.post('/product_models',product_model);
    }
}
