import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MenuItems } from '../../shared/menu-items/menu-items';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { TranslateService } from '@ngx-translate/core';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {NotificationsService} from "../../services/notifications/notifications.service";
import {NotificationService} from "../../services/notifications.services";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "ng2-validation";
import {AdminsService} from "../../services/admins/admins.service";
import {environment} from "../../../environments/environment";

export interface Options {
    heading?: string;
    removeFooter?: boolean;
    mapHeader?: boolean;
}

declare const filestack: {
    init(apiKey: string): {
        pick({ maxFiles,fromSources }: { maxFiles: number, fromSources: Array<String> }):
            Promise<{ filesUploaded: { url: string }[] }>
    }
};

const oldPassword = new FormControl('', Validators.required);
const newPassword = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', Validators.compose([Validators.required, CustomValidators.equalTo(newPassword)]));

@Component({
    selector: 'app-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

    private _router: Subscription;
    options: Options;
    theme = 'light';
    isBoxed = false;
    isOpened = true;
    mode = 'push';
    _mode = this.mode;
    width = window.innerWidth;

    notificationCount = 0;
    notifications = [];
    pagination: any = {};
    public page:number = 1;
    public itemsPerPage:number = 10;
    public maxSize:number = 3;
    public numPages:number = 100;
    public length:number = 0;
    modaal: any;
    changePasswordForm: FormGroup;
    currentYear= null;
    appVersion = null;
    public profileForm: FormGroup;
    selected = 'selected';
    no = null;
    male = 'M';
    female = 'F';
    currentUser = null;
    src: string = "";

    @ViewChild('sidebar') sidebar;

    constructor (private authenticationService: AuthenticationService,
                 public menuItems: MenuItems,
                 private router: Router,
                 private route: ActivatedRoute,
                 public translate: TranslateService,
                 private modalService: NgbModal,
                 private titleService: Title,
                 private notificationsService: NotificationsService,
                 private notify:NotificationService,
                 private fb: FormBuilder,
                 private adminsService: AdminsService) {

        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }

    ngOnInit(): void {

        if (this.isOver()) {
            this._mode = 'over';
            this.isOpened = false;
        }

        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            // Scroll to top on view load
            document.querySelector('.main-content').scrollTop = 0;

            if (this.isOver() || event.url === '/maps/fullscreen') {
                this.isOpened = false;
            }

            this.route.children.forEach((route: ActivatedRoute) => {
                let activeRoute: ActivatedRoute = route;
                while (activeRoute.firstChild) {
                    activeRoute = activeRoute.firstChild;
                }
                this.options = activeRoute.snapshot.data;
            });

            if (this.options.hasOwnProperty('heading')) {
                this.setTitle(this.options.heading);
            }
        });

        this.changePasswordForm = this.fb.group({
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
        });
        this.appVersion = environment.version;
        this.currentYear = new Date();

        this.profileForm = this.fb.group( {
            fname: [null],
            lname: [null],
            email: [null],
            gender: [null],
        });
        // this.getNotificationsCount();
        this.getUserProfile();
    }

    getNotificationsCount(){
        this.notificationsService.getNotificationsCount().subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notificationCount = response.count;
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

    getUserProfile(){
        this.currentUser = this.authenticationService.getLoggedInUser();
    }

    getReceivedNotifications(){
        this.notificationsService.getReceivedNotifications().subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notifications = response.data;
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
        })
    }

    logout(){
        this.authenticationService.logout();
    }

    openChangePasswordModal(content) {
        this.changePasswordForm.reset();
        this.getUserProfile();
        this.modaal = this.modalService.open(content);
    }

    onSaveChanges(){
        let updatedUser = {
            current_password: this.changePasswordForm.value.oldPassword,
            new_password: this.changePasswordForm.value.newPassword,
            confirm_password: this.changePasswordForm.value.confirmPassword,
        };

        this.adminsService.changePassword(updatedUser).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notify.successNotify(response.message);
                this.modaal.close();
                this.changePasswordForm.reset();
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
        })
    }

    openProfileModal(content){
        this.profileForm.reset();
        this.modaal = this.modalService.open(content);
    }

    async showPicker() {
        const client = filestack.init(environment.fileStackAPIKey);
        const result = await client.pick({ maxFiles: 1,
            fromSources:["local_file_system","url","facebook","instagram","dropbox","googledrive"]});
        this.src = result.filesUploaded[0].url;
    }

    onChangeProfile() {
        let user = {
            first_name: this.profileForm.value.fname || this.currentUser['first_name'],
            last_name: this.profileForm.value.lname || this.currentUser['last_name'],
            email: this.profileForm.value.email || this.currentUser['email'],
            gender: this.profileForm.value.gender || this.currentUser['gender'],
            profile_pic_url: this.src || this.currentUser['profile_pic_url']
        };

        this.adminsService.updateUserProfile(user).subscribe(response => {
            let res = response.json();
            if (res.success) {
                this.notify.successNotify(res.message);
                this.authenticationService.storeUpdatedUser(res.data);
                this.getUserProfile();
                this.modaal.close();
            } else if (!res.success) {
                for (let i = 0; i < res.errors.length; i++) {
                    this.notify.errorNotify(res.errors[i].message);
                }
            }
        }, err => {
            err = err.json();
            if (err.errors) {
                for (let i = 0; i < err.errors.length; i++) {
                    this.notify.errorNotify(err.errors[i].message);
                }
            }
            else {
                this.notify.errorNotify("Connectivity issue!");
            }
        });
    }

    ngOnDestroy() {
        this._router.unsubscribe();
    }

    setTitle( newTitle: string) {
        this.titleService.setTitle( 'SEISMIC | ' + newTitle );
    }

    toogleSidebar(): void {
        if (this._mode !== 'dock') {
            this.isOpened = !this.isOpened;
        }
    }

    isOver(): boolean {
        return window.matchMedia(`(max-width: 991px)`).matches;
    }

    openSearch(search) {
        this.modalService.open(search, { windowClass: 'search', backdrop: false });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.width === event.target.innerWidth) { return false; }
        if (this.isOver()) {
            this._mode = 'over';
            this.isOpened = false;
        } else {
            this._mode = this.mode;
            this.isOpened = true;
        }
        this.width = event.target.innerWidth;
    }

}
