import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../services/notifications.services";
import {ProductVersionsService} from "../../services/product_versions/product-versions.service";
import {HardwareVersionsService} from "../../services/hardware_versions/hardware-versions.service";
import {SoftgoodsVersionsService} from "../../services/softgoods_versions/softgoods-versions.service";
import {ProductModelsService} from "../../services/product_models/product-models.service";

@Component({
  selector: 'app-product-versions',
  templateUrl: './product-versions.component.html',
  styleUrls: ['./product-versions.component.scss']
})
export class ProductVersionsComponent implements OnInit {

    public form: FormGroup;
    pVersions: any= [];
    hVersions: any= [];
    sVersions: any= [];
    pModels: any= [];
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
                private productVersionsService:ProductVersionsService,
                private hardwareVersionsService: HardwareVersionsService,
                private softgoodsVersionsService: SoftgoodsVersionsService,
                private productModelsService: ProductModelsService){
    }


    ngOnInit() {
        this.getPVersions(1);
        this.form = this.fb.group ( {
            product_model_id: [null , Validators.compose ( [ Validators.required ] )],
            hardware_version_id: [null , Validators.compose ( [ Validators.required ] )],
            description: [null],
            notes: [null],
            version: [null , Validators.compose ( [ Validators.required ] )],
            softgoods_version_id: [null , Validators.compose ( [ Validators.required ] )],


        });
        // this.editForm = this.fb.group ( {
        //     fname: [''],
        //     lname: [''],
        //     role: ['']
        // });


    }

    getPVersions(page){
        this.productVersionsService.list(page).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.pVersions = response.data;
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
        this.getPVersions(page.page);
    }

    open(content) {
        this.getHardwareVersions();
        this.getSoftgoodsVersions();
        this.getProductModels();
        this.form.reset();
        this.modaal = this.modalService.open(content);
    }

    getHardwareVersions(){
        this.hardwareVersionsService.list(1).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.hVersions = response.data;
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
    getSoftgoodsVersions(){
        this.softgoodsVersionsService.list(1).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.sVersions = response.data;
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
    getProductModels(){
        this.productModelsService.list(1).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.pModels = response.data;
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
            product_model_id: this.form.value.product_model_id,
            hardware_version_id: this.form.value.hardware_version_id,
            description: this.form.value.description,
            notes: this.form.value.notes,
            version : this.form.value.version,
            softgoods_version_id : this.form.value.softgoods_version_id
        };
        this.productVersionsService.createPVersion(HV).subscribe( result => {
            let response =  result.json();
            if(response.success){
                this.notify.successNotify(response.message);
                this.modaal.close();
                this.form.reset();
                this.getPVersions(1);
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
