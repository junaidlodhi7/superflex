import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

@Injectable()
export class NotificationsService {

    constructor(private http: ApiService) { }

    getNotificationsCount(){
        return this.http.get('/notifications/unread/count');
    }

    getReceivedNotifications(){
        return this.http.get('/notifications/received');
    }

    getNotifications(page){
        return this.http.get('/notifications?page='+page);
    }

    createNotification(obj){
        return this.http.post('/notifications',obj);
    }

    getAwareUsers(notificationID, page){
        return this.http.get('/notifications/'+notificationID+'/read/users?page='+page);
    }

    getTotalUsers(notificationID, page){
        return this.http.get('/notifications/'+notificationID+'/users?page='+page);
    }

}
