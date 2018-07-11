import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class TestTypesService {

  constructor(private http: ApiService) { }

    list(pagination?){
        let url = typeof(pagination) == "undefined" ? '/test_types' : '/test_types?pagination=false' ;
        return this.http.get( url);
    }

}
