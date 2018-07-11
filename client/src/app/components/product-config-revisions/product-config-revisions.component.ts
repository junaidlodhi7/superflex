import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../services/notifications.services";
import {ProductConfigRevisionsService} from "../../services/product_config_revisions/product-config-revisions.service";
import {ProductConfigsService} from "../../services/product_configs/product-configs.service";

@Component({
  selector: 'app-product-config-revisions',
  templateUrl: './product-config-revisions.component.html',
  styleUrls: ['./product-config-revisions.component.scss']
})
export class ProductConfigRevisionsComponent implements OnInit {

    public form: FormGroup;
    pCRevisions: any= [];
    pConfigs: any= [];
    noVal = null;
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
                private productConfigRevisionsService:ProductConfigRevisionsService,
                private productConfigsService: ProductConfigsService){
    }

    ngOnInit() {
        this.getPCRevisions(1);
        this.form = this.fb.group ( {
            author: [null , Validators.compose ( [ Validators.required ] )],
            settings: [null , Validators.compose ( [ Validators.required ] )],
            description: [null],
            version: [null , Validators.compose ( [ Validators.required ] )],
            product_config_id: [null , Validators.compose ( [ Validators.required ] )]

        });
        // this.editForm = this.fb.group ( {
        //     fname: [''],
        //     lname: [''],
        //     role: ['']
        // });


    }

    getPCRevisions(page){
        this.productConfigRevisionsService.list(page).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.pCRevisions = response.data;
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

    public onChangeTable(page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
        this.getPCRevisions(page.page);
    }

    open(content) {
        this.getProductConfigs();
        this.form.reset();
        this.modaal = this.modalService.open(content);
    }

    getProductConfigs(){
        this.productConfigsService.list(1).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.pConfigs = response.data;
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
            author: this.form.value.author,
            settings: this.form.value.settings,
            description: this.form.value.description,
            version: this.form.value.version,
            product_config_id : this.form.value.product_config_id,
        };
        this.productConfigRevisionsService.createProductConfigRevision(HV).subscribe( result => {
            let response =  result.json();
            if(response.success){
                this.notify.successNotify(response.message);
                this.modaal.close();
                this.form.reset();
                this.getPCRevisions(1);
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

    // openEditModal(content,id){
    //     this.editForm.reset();
    //     for(let i=0; i<this.hVersions.length; i++){
    //         if(this.hVersions[i].id == id){
    //             this.userToEdit = this.hVersions[i];
    //         }
    //     }
    //     this.modaal = this.modalService.open(content);
    // }
    //
    // onSaveChanges(userID){
    //     let user = {
    //         first_name: this.editForm.value.fname || this.userToEdit['first_name'],
    //         last_name: this.editForm.value.lname || this.userToEdit['last_name'],
    //         role: this.editForm.value.role || this.userToEdit['role'],
    //     };
    //
    //     // this.adminsService.update(userID, user).subscribe(res => {
    //     //     let response = res.json();
    //     //     if (response.success) {
    //     //         this.notify.successNotify(response.message);
    //     //         this.getUsers(1);
    //     //         this.modaal.close();
    //     //         this.form.reset();
    //     //     }
    //     //     else if(!response.success) {
    //     //         for(let i=0;i<response.errors.length;i++){
    //     //             this.notify.errorNotify(response.errors[i].message);
    //     //         }
    //     //     }
    //     // }, err => {
    //     //     err = err.json();
    //     //     if(err.errors) {
    //     //         for(let i=0;i<err.errors.length;i++){
    //     //             this.notify.errorNotify(err.errors[i].message);
    //     //         }
    //     //     }
    //     //     else{
    //     //         this.notify.errorNotify("Connectivity issue!");
    //     //     }
    //     // })
    // }

}