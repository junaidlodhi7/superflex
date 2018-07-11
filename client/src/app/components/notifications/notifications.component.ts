import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../services/notifications.services";
import {NotificationsService} from "../../services/notifications/notifications.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

    modaal:any;
    public form: FormGroup;
    notifications:any = []; // all notifications
    awareUsers = []; //users who have read the notification
    totalUsers = []; //total users
    notificationID = null;

    //variables for pagination
    pagination: any = {};
    public page:number = 1;
    public itemsPerPage:number = 10;
    public maxSize:number = 3;
    public numPages:number = 100;
    public length:number = 0;

    //pagination for Modal
    paginationModal: any = {};
    public pageModal:number = 1;
    public itemsPerPageModal:number = 10;
    public maxSizeModal:number = 3;
    public numPagesModal:number = 100;
    public lengthModal:number = 0;

    constructor(private fb: FormBuilder,
                private modalService: NgbModal,
                private notificationsService: NotificationsService,
                private notify: NotificationService) {}

    ngOnInit() {
        this.list(1);
    }

    //getting list of notifications
    list(page){
        this.notificationsService.getNotifications(page).subscribe(res => {
            let response = res.json();
            if(response.success) {
                //copying notifications
                this.notifications = response.data;
                //copying pagination variables
                this.pagination = response.pagination;
                this.page = this.pagination.current;
                this.itemsPerPage = this.pagination.per_page;
                this.numPages = this.pagination.pages;
                this.length = this.pagination.total;
            }
        }, err => {
            err = err.json();
            if(err.errors) {
                for(let i=0;i<err.errors.length;i++){
                    this.notify.errorNotify(err.errors[i].message);
                }
            }
            else{
                this.notify.errorNotify("Connectivity issue!");
            }
        });
    }

    //on changing page in pagination
    public onChangeTable(page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
        this.list(page.page);
    }

    //openning "New Notification" modal
    open(content) {
        this.form = this.fb.group ( {
            message: [null , Validators.compose ( [ Validators.required ] )],
        });
        this.modaal = this.modalService.open(content);
    }

    //on creating new notification
    onSubmit(){
        let obj = {
            message: this.form.value.message
        };

        this.notificationsService.createNotification(obj).subscribe( result => {
            let response = result.json();
            if(response.success){
                this.notify.successNotify(response.message);
                //closing modal
                this.modaal.close();
                //resetting form
                this.form.reset();
                //getting updated list of notifications
                this.list(1);
            }
            else if(!response.success) {
                for(let i=0;i<response.errors.length;i++){
                    this.notify.errorNotify(response.errors[i].message);
                }
            }
        }, err => {
            err = err.json();
            if(err.errors) {
                for(let i=0;i<err.errors.length;i++){
                    this.notify.errorNotify(err.errors[i].message);
                }
            }
            else{
                this.notify.errorNotify("Connectivity issue!");
            }
        });
    }

    //openning "list of users who have read the notification" modal
    openAwareUsersInfo(notificationID, content){
        this.notificationID = notificationID;
        this.modaal = this.modalService.open(content);
        this.getAwareUsers(1);
    }

    public onChangeTableAwareModal(page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
        this.getAwareUsers(page.page);
    }

    //getting list of users who have read the notification
    getAwareUsers(pageAwareModal){
        this.notificationsService.getAwareUsers(this.notificationID, pageAwareModal).subscribe( result => {
            let response = result.json();
            if(response.success){
                this.awareUsers = response.data;
                this.paginationModal = response.pagination;
                this.pageModal = this.paginationModal.current;
                this.itemsPerPageModal = this.paginationModal.per_page;
                this.numPagesModal = this.paginationModal.pages;
                this.lengthModal = this.paginationModal.total;
            }
        }, err => {
            err = err.json();
            if(err.errors) {
                for(let i=0;i<err.errors.length;i++){
                    this.notify.errorNotify(err.errors[i].message);
                }
            }
            else{
                this.notify.errorNotify("Connectivity issue!");
            }
        });
    }

    //openning "total users" modal
    openTotalUsersInfo(notificationID, content){
        this.notificationID = notificationID;
        this.modaal = this.modalService.open(content);
        this.getTotalUsers(1);
    }

    public onChangeTableTotalModal(page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
        this.getTotalUsers(page.page);
    }

    //getting total users
    getTotalUsers(pageTotalModal){
        this.notificationsService.getTotalUsers(this.notificationID, pageTotalModal).subscribe( result => {
            let response = result.json();
            if(response.success){
                this.totalUsers = response.data;
                this.paginationModal = response.pagination;
                this.pageModal = this.paginationModal.current;
                this.itemsPerPageModal = this.paginationModal.per_page;
                this.numPagesModal = this.paginationModal.pages;
                this.lengthModal = this.paginationModal.total;
            }
        }, err => {
            err = err.json();
            if(err.errors) {
                for(let i=0;i<err.errors.length;i++){
                    this.notify.errorNotify(err.errors[i].message);
                }
            }
            else{
                this.notify.errorNotify("Connectivity issue!");
            }
        });
    }

}
