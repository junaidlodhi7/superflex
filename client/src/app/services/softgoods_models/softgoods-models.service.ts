import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class SoftgoodsModelsService {

    constructor(private http: ApiService) { }

    list(page?){
        let url = typeof(page)=='number'? '/softgoods_models?page='+page : '/softgoods_models';
        return this.http.get(url);
    }

    createSoftgoodsModel(softgoods_model) {
        return this.http.post('/softgoods_models', softgoods_model);
    }

}
