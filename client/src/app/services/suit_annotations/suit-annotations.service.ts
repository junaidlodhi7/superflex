import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class SuitAnnotationsService {

    constructor(private http: ApiService) { }

    create(testID, suitAnnotation){
        let url = '/tests/'+testID+'/suit_annotations';
        return this.http.post(url, suitAnnotation);
    }

    update(testID, suitAnnotationID, updatedAnnotation){
        let url = '/tests/'+testID+'/suit_annotations/'+suitAnnotationID;
        return this.http.put(url, updatedAnnotation);
    }

}
