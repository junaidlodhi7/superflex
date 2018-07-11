import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../services/notifications.services";
import {ProductConfigRevisionsService} from "../../services/product_config_revisions/product-config-revisions.service";
import {ProductsService} from "../../services/products/products.service";
import {UsersService} from "../../services/users/users.service";
import {StorageSessionService} from "../../services/storage_sessions/storage-session.service";
import {DateFormatter} from "ngx-bootstrap";

@Component({
  selector: 'app-storage-sessions',
  templateUrl: './storage-sessions.component.html',
  styleUrls: ['./storage-sessions.component.scss']
})
export class StorageSessionsComponent implements OnInit {

    public form: FormGroup;
    sSessions: any= [];
    pCRevision: any= [];
    products: any= [];
    users: any= [];
    noVal = null;
    public editForm: FormGroup;
    toEdit = {};
    selected = "selected";
    no = null;
    pagination: any = {};

    public page:number = 1;
    public itemsPerPage:number = 10;
    public maxSize:number = 3;
    public numPages:number = 100;
    public length:number = 0;
    modaal:any;
    format = 'YYYY-MM-DD hh:mm:ss a';
    constructor(private fb: FormBuilder,
                private modalService: NgbModal,
                private notify:NotificationService,
                private storageSessionService:StorageSessionService,
                private productConfigRevisionsService:ProductConfigRevisionsService,
                private productsService: ProductsService,
                private usersService: UsersService){
    }


    ngOnInit() {
        this.getStorageSessions(1);
        this.getProductConfigRevisions();
        this.getProducts();
        this.getUsers();
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
            product_id: [null , Validators.compose ( [ Validators.required ] )],
            user_id: [null , Validators.compose ( [ Validators.required ] )]

        });
        this.editForm = this.fb.group ( {
            remote_id: [null],
            name: [null],
            description: [null],
            location: [null],
            connection_type: [null],
            hardware_config: [null],
            ts_start: [null ],
            ts_end: [null ],
            product_config_revision_id: [null],
            product_id: [null ],
            user_id: [null]
        });


    }

    getStorageSessions(page){
        this.storageSessionService.list(page).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.sSessions = response.data;
                this.formate(this.sSessions);
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

    formate(sessions){
        for(let i=0;i<sessions.length;i++){
            if(sessions[i].ts_start){
                let a = sessions[i].ts_start;
                this.sSessions[i].startDate = new Date(parseInt(a));
                this.sSessions[i].start = new DateFormatter().format(this.sSessions[i].startDate,'YYYY-MM-DD hh:mm:ss A','en');
            }
            if(sessions[i].ts_end){
                let b = sessions[i].ts_end;
                this.sSessions[i].endDate = new Date(parseInt(b));
                this.sSessions[i].end = new DateFormatter().format(this.sSessions[i].endDate,'YYYY-MM-DD hh:mm:ss A','en');
            }
        }
    }

    public onChangeTable(page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
        this.getStorageSessions(page.page);
    }

    open(content) {
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
    getUsers(){
        this.usersService.list(1).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.users = response.data;
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
            user_id : this.form.value.user_id
        };
        this.storageSessionService.createStorageSession(HV).subscribe( result => {
            let response =  result.json();
            if(response.success){
                this.notify.successNotify(response.message);
                this.modaal.close();
                this.form.reset();
                this.getStorageSessions(1);
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

    openEditModal(content,id){
        this.editForm.reset();
        for(let i=0; i<this.sSessions.length; i++){
            if(this.sSessions[i].id == id){
                this.toEdit = this.sSessions[i];
            }
        }
        this.modaal = this.modalService.open(content, {size:'lg'});
    }

    onSaveChanges(userID){
        let obj = {
            remote_id: this.editForm.value.remote_id  || this.toEdit['remote_id'],
            name: this.editForm.value.name  || this.toEdit['name'],
            description: this.editForm.value.description  || this.toEdit['description'],
            location: this.editForm.value.location  || this.toEdit['location'],
            connection_type : this.editForm.value.connection_type  || this.toEdit['connection_type'],
            hardware_config : this.editForm.value.hardware_config  || this.toEdit['hardware_config'],
            ts_start: new Date(this.editForm.value.ts_start).getTime()  || this.toEdit['ts_start'],
            ts_end: new Date(this.editForm.value.ts_end).getTime()  || this.toEdit['ts_end'],
            product_config_revision_id: this.editForm.value.product_config_revision_id  || this.toEdit['product_config_revision_id'],
            product_id: this.editForm.value.product_id  || this.toEdit['product_id'],
            user_id : this.editForm.value.user_id  || this.toEdit['user_id']
        };
        this.storageSessionService.updateStorageSession(userID, obj).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notify.successNotify(response.message);
                this.getStorageSessions(1);
                this.modaal.close();
                this.editForm.reset();
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

    confirmDelete(id){
        this.storageSessionService.deleteStorageSession(id).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notify.successNotify(response.message);
                this.getStorageSessions(1);
                this.modaal.close();
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

}
