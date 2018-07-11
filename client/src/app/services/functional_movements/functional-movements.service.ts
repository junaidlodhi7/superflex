import { Injectable }     from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ApiService} from "../api.service";

@Injectable()
export class FunctionalMovementsService {

    constructor( private http: ApiService) {}

    list(page){
        return this.http.get("/functional_movements?page="+page);
    }

    retrieve(id){
        let url = '/functional_movements'+'/'+id;
        return this.http.get( url);
    }

    create(user){
        return this.http.post("/functional_movements",user);
    }

    createRevision(functional_movement_id , revision){
        let url = "/functional_movements/"+functional_movement_id+"/functional_movement_revisions";
        return this.http.post(url,revision);
    }
    retrieveRevision(functional_movement_id , id){
        let url = "/functional_movements/"+functional_movement_id+"/functional_movement_revisions/"+id;
        return this.http.get(url);
    }

    setStatus(status, id){
        let url;
        if(status==true){
            url = '/functional_movements/'+id+'/approve';
        }
        else{
            url = '/functional_movements/'+id+'/reject';
        }
        return this.http.post(url,{});
    }

    updateDescription(obj, functional_movement_id, id){
        let url = "/functional_movements/"+functional_movement_id+"/functional_movement_revisions/"+id;
        return this.http.put(url, obj);
    }

}
