import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../services/users/users.service";
import {ActivatedRoute, Params} from "@angular/router";
import {NotificationService} from "../../../services/notifications.services";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductsService} from "../../../services/products/products.service";
import {ProductConfigRevisionsService} from "../../../services/product_config_revisions/product-config-revisions.service";
import {StorageSessionService} from "../../../services/storage_sessions/storage-session.service";
import {DateFormatter} from "ngx-bootstrap";

@Component({
    selector: 'app-users-details',
    templateUrl: './users-details.component.html',
    styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {

    public userId = null;
    public user: any = {};
    public userDetail: any = {};
    public storageSessions: any = [];
    pCRevision: any= [];
    products: any= [];
    public noVal = null;
    public format = 'YYYY-MM-DD hh:mm:ss a';
    public form: FormGroup;
    public modaal:any;


    constructor(private fb: FormBuilder,
                private usersService: UsersService,
                private modalService: NgbModal,
                private activatedRoute: ActivatedRoute,
                private productConfigRevisionsService:ProductConfigRevisionsService,
                private productsService: ProductsService,
                private storageSessionService:StorageSessionService,
                private notify:NotificationService) {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.userId = params['id'];
            this.getUserDetails();
        });
    }

    ngOnInit() {
        this.form = this.fb.group ( {
            remote_id: [null],
            name: [null , Validators.compose ( [ Validators.required ] )],
            description: [null],
            location: [null , Validators.compose ( [ Validators.required ] )],
            connection_type: [null , Validators.compose ( [ Validators.required ] )],
            hardware_config: [null],
            ts_start: [null , Validators.compose ( [ Validators.required ] )],
            ts_end: [null , Validators.compose ( [ Validators.required ] )],
            product_config_revision_id: [null , Validators.compose ( [ Validators.required ] )],
            product_id: [null , Validators.compose ( [ Validators.required ] )]
        });
    }

    getUserDetails(){
        this.usersService.retrieve(this.userId).subscribe(res => {
            let response = res.json();
            if(response.success){
                this.user = response.data;
                if(response.data.user_detail) {
                    this.userDetail = response.data.user_detail;
                }
                if(response.data.storage_sessions) {
                    this.storageSessions = response.data.storage_sessions;
                    this.formate(this.storageSessions);
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

    formate(sessions){
        for(let i=0;i<sessions.length;i++){
            if(sessions[i].ts_start){
                let a = sessions[i].ts_start;
                this.storageSessions[i].startDate = new Date(parseInt(a));
                this.storageSessions[i].start = new DateFormatter().format(this.storageSessions[i].startDate,'YYYY-MM-DD hh:mm:ss A','en');
            }
            if(sessions[i].ts_end){
                let b = sessions[i].ts_end;
                this.storageSessions[i].endDate = new Date(parseInt(b));
                this.storageSessions[i].end = new DateFormatter().format(this.storageSessions[i].endDate,'YYYY-MM-DD hh:mm:ss A','en');
            }
        }
    }

    open(content) {
        this.getProductConfigRevisions();
        this.getProducts();
        this.form.reset();
        this.modaal = this.modalService.open(content, {size:'lg'});
    }

    getProductConfigRevisions(){
        this.productConfigRevisionsService.list(1).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.pCRevision = response.data;
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

    getProducts(){
        this.productsService.list(1).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.products = response.data;
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

    onSubmit(){
        let HV = {
            remote_id: this.form.value.remote_id,
            name: this.form.value.name,
            description: this.form.value.description,
            location: this.form.value.location,
            connection_type : this.form.value.connection_type,
            hardware_config : this.form.value.hardware_config,
            ts_start: new Date(this.form.value.ts_start).getTime(),
            ts_end: new Date(this.form.value.ts_end).getTime(),
            product_config_revision_id: this.form.value.product_config_revision_id,
            product_id: this.form.value.product_id,
            user_id : this.userId
        };
        this.storageSessionService.createStorageSession(HV).subscribe( result => {
            let response =  result.json();
            if(response.success){
                this.notify.successNotify(response.message);
                this.modaal.close();
                this.form.reset();
                this.getUserDetails();
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

}
