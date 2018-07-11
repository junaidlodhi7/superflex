import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class ProductsService {

    constructor(private http: ApiService) { }

    list(page?){
        let url = typeof(page)=='number'? '/products?page='+page : '/products';
        return this.http.get(url);
    }

    createProduct(product){
        return this.http.post('/products',product);
    }

}
