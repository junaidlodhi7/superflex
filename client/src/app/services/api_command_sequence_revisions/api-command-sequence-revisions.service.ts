import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class ApiCommandSequenceRevisionsService {

    constructor(private http: ApiService) { }

    list(page?){
        let url = typeof(page)=='number'? '/api_command_sequence_revisions?page='+page : '/api_command_sequence_revisions';
        return this.http.get(url);
    }

    createApiCommandSequenceRevision(api_command_sequence_revision) {
        return this.http.post('/api_command_sequence_revisions', api_command_sequence_revision);
    }

    updateApiCommandSequenceRevision(id, obj){
        return this.http.put('/api_command_sequence_revisions/'+id, obj);
    }

    deleteApiCommandSequenceRevision(id){
        return this.http.destroy('/api_command_sequence_revisions/'+id);
    }

    retrieve(id){
        let url = '/api_command_sequence_revisions/'+id;
        return this.http.get( url);
    }
}
