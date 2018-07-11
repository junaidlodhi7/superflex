import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../services/notifications.services";
import {FirmwareVersionsService} from "../../services/firmware_versions/firmware-versions.service";
import {ProductVersionsService} from "../../services/product_versions/product-versions.service";
import {ProductConfigsService} from "../../services/product_configs/product-configs.service";

@Component({
  selector: 'app-product-configs',
  templateUrl: './product-configs.component.html',
  styleUrls: ['./product-configs.component.scss']
})
export class ProductConfigsComponent implements OnInit {

    public form: FormGroup;
    pConfigs: any= [];
    fVersions: any= [];
    pVersions: any= [];
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
                private productConfigsService:ProductConfigsService,
                private firmwareVersionsService: FirmwareVersionsService,
                private productVersionsService: ProductVersionsService){
    }


    ngOnInit() {
        this.getPConfigs(1);
        this.form = this.fb.group ( {
            name: [null , Validators.compose ( [ Validators.required ] )],
            nice_name: [null],
            description: [null],
            notes: [null],
            firmware_version_id: [null , Validators.compose ( [ Validators.required ] )],
            product_version_id: [null , Validators.compose ( [ Validators.required ] )],


        });
        // this.editForm = this.fb.group ( {
        //     fname: [''],
        //     lname: [''],
        //     role: ['']
        // });


    }

    getPConfigs(page){
        this.productConfigsService.list(page).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.pConfigs = response.data;
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
        this.getPConfigs(page.page);
    }

    open(content) {
        this.getProductVersions();
        this.getFirmwareVersions();
        this.form.reset();
        this.modaal = this.modalService.open(content);
    }

    getProductVersions(){
        this.productVersionsService.list(1).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.pVersions = response.data;
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
    getFirmwareVersions(){
        this.firmwareVersionsService.list(1).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.fVersions = response.data;
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
            name: this.form.value.name,
            nice_name: this.form.value.nice_name,
            description: this.form.value.description,
            notes: this.form.value.notes,
            firmware_version_id : this.form.value.firmware_version_id,
            product_version_id : this.form.value.product_version_id
        };
        this.productConfigsService.createProductConfig(HV).subscribe( result => {
            let response =  result.json();
            if(response.success){
                this.notify.successNotify(response.message);
                this.modaal.close();
                this.form.reset();
                this.getPConfigs(1);
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
