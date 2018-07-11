import { Injectable }     from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ApiService} from "../api.service";

@Injectable()
export class FiniteStateMachineService {

  constructor( private http: ApiService) {}

  list(page){
    return this.http.get("/finite_state_machines?page="+page);
  }

  retrieve(id){
    let url = '/finite_state_machines'+'/'+id;
    return this.http.get( url);
  }

  create(object){
    return this.http.post("/finite_state_machines",object);
  }

  createRevision(functional_movement_id , revision){
    let url = "/finite_state_machines/"+functional_movement_id+"/finite_state_machine_revisions";
    return this.http.post(url,revision);
  }

  retrieveRevision(functional_movement_id , id){
    let url = "/finite_state_machines/"+functional_movement_id+"/finite_state_machine_revisions/"+id;
    return this.http.get(url);
  }


}
