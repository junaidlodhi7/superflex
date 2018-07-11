import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class AnnotationsService {

    constructor(private http: ApiService) { }

    list(page?){
        let url = typeof(page)=='number'? '/annotations?page='+page : '/annotations';
        return this.http.get(url);
    }

    createAnnotation(annotation) {
        return this.http.post('/annotations', annotation);
    }

}
