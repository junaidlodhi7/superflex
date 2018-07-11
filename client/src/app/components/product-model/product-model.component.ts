import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../services/notifications.services";
import {ProductModelsService} from "../../services/product_models/product-models.service";

@Component({
  selector: 'app-product-model',
  templateUrl: './product-model.component.html',
  styleUrls: ['./product-model.component.scss']
})
export class ProductModelComponent implements OnInit {

    public form: FormGroup;
    productModels: any= [];
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
                private productModelsService:ProductModelsService){
    }


    ngOnInit() {
        this.getProductModels(1);
        this.form = this.fb.group ( {
            name: [null , Validators.compose ( [ Validators.required ] )],
            nice_name: [null],
            description: [null],
            notes: [null]


        });
        // this.editForm = this.fb.group ( {
        //     fname: [''],
        //     lname: [''],
        //     role: ['']
        // });


    }

    getProductModels(page){
        this.productModelsService.list(page).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.productModels = response.data;
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
        this.getProductModels(page.page);
    }

    open(content) {
        this.form.reset();
        this.modaal = this.modalService.open(content);
    }

    onSubmit(){
        let HV = {
            name: this.form.value.name,
            nice_name: this.form.value.nice_name,
            description: this.form.value.description,
            notes: this.form.value.notes
        };
        this.productModelsService.createProductModel(HV).subscribe( result => {
            let response =  result.json();
            if(response.success){
                this.notify.successNotify(response.message);
                this.modaal.close();
                this.form.reset();
                this.getProductModels(1);
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
