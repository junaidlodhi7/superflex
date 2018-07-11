import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class ApiCommandSequencesService {

    constructor(private http: ApiService) { }

    list(page?){
        let url = typeof(page)=='number'? '/api_command_sequences?page='+page : '/api_command_sequences';
        return this.http.get(url);
    }

    findRevisions(aCSId, page){
        let url = '/api_command_sequences/'+aCSId+'/api_command_sequence_revisions';
        url = url + (typeof(page)=='number'? '/?page='+page : '');
        return this.http.get(url);
    }

    createApiCommandSequence(api_command_sequence) {
        return this.http.post('/api_command_sequences', api_command_sequence);
    }

    updateApiCommandSequence(id, obj){
        return this.http.put('/api_command_sequences/'+id, obj);
    }

    deleteApiCommandSequence(id){
        return this.http.destroy('/api_command_sequences/'+id);
    }

    retrieve(id){
        let url = '/api_command_sequences/'+id;
        return this.http.get( url);
    }
}
