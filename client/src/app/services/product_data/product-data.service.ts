import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class ProductDataService {

    constructor(private http: ApiService) { }

    getBoards(){
        let url = '/product_data/boards';
        return this.http.get( url);
    }

    getGroups(board){
        let url = '/product_data/groups?category='+board;
        return this.http.get( url);
    }

    getStreams(board, group){
        let url = '/product_data/streams?category='+board+'&group='+group;
        return this.http.get( url);
    }

}
