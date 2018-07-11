import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';


@Injectable()
export class NotificationService {

    constructor( private NotificationsService: NotificationsService) { }

    successNotify(content){
        this.notify('Success', content, 'success' )
    }
    errorNotify(content){
        this.notify('Error', content, 'error' )
    }
    infoNotify(content){
        this.notify('Info', content, 'info' )
    }
    notify(title, content, type ) {
        if (type == 'success') {
            this.NotificationsService.success(
                title,
                content,
                {
                    timeOut: 5000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true,
                    maxLength: 50,
                    position: ['top', 'right']

                }
            );
        } else if (type == 'error' ) {
            this.NotificationsService.error(
                title,
                content,
                {
                    timeOut: 5000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: false,
                    maxLength: 50,
                    position: ['top', 'right']
                }
            );

        } else if ( type == 'info') {
            this.NotificationsService.info(
                title,
                content,
                {
                    timeOut: 5000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: false,
                    maxLength: 50,
                    position: ['top', 'right']
                }
            );

        }

    }




}