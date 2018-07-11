import { Injectable }     from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

    baseUrl = "";

    constructor(private http: Http) {
        this.baseUrl = environment.backendUrl;
    }

    setHeaders(): RequestOptions{
        let headers = new Headers({ 'Accept': 'application/json' });
        headers.append('authorization', JSON.parse(localStorage.getItem('currentUserToken')));
        let options = new RequestOptions({ headers: headers });
        return options;
    }

    getUrl(url)
    {
        return this.baseUrl + url;
    }

    get(url){
        return this.http.get(this.getUrl(url),this.setHeaders());
    }

    post(url, data){
        return this.http.post(this.getUrl(url),data , this.setHeaders());
    }

    put(url, data){
        return this.http.put(this.getUrl(url),data,this.setHeaders());
    }

    destroy(url){
        return this.http.delete(this.getUrl(url),this.setHeaders());
    }

}
