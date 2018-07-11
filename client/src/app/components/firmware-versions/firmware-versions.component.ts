import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../services/notifications.services";
import {FirmwareVersionsService} from "../../services/firmware_versions/firmware-versions.service";
import {HardwareVersionsService} from "../../services/hardware_versions/hardware-versions.service";

@Component({
  selector: 'app-firmware-versions',
  templateUrl: './firmware-versions.component.html',
  styleUrls: ['./firmware-versions.component.scss']
})
export class FirmwareVersionsComponent implements OnInit {

    public form: FormGroup;
    fVersions: any = [];
    hVersions: any = [];
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
                private firmwareVersionsService:FirmwareVersionsService,
                private hardwareVersionsService:HardwareVersionsService){
    }


    ngOnInit() {
        this.getFirmwareVersions(1);
        this.form = this.fb.group ( {
            name: [null , Validators.compose ( [ Validators.required ] )],
            nice_name: [null],
            description: [null],
            notes: [null],
            version: [null , Validators.compose ( [ Validators.required ] )],
            hardware_version_id: ['' , Validators.compose ( [ Validators.required ] )]

        });
        // this.editForm = this.fb.group ( {
        //     fname: [''],
        //     lname: [''],
        //     role: ['']
        // });


    }

    getFirmwareVersions(page){
        this.firmwareVersionsService.list(page).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.fVersions = response.data;
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
        this.getFirmwareVersions(page.page);
    }

    open(content) {
        this.getHradwareVersions();
        this.form.reset();
        this.modaal = this.modalService.open(content);
    }

    getHradwareVersions(){
        this.hardwareVersionsService.list(1).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.hVersions = response.data;
                // this.pagination = response.pagination;
                // this.page = this.pagination.current;
                // this.itemsPerPage = this.pagination.per_page;
                // this.numPages = this.pagination.pages;
                // this.length = this.pagination.total;
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
            version : this.form.value.version,
            hardware_version_id : this.form.value.hardware_version_id
        };
        this.firmwareVersionsService.createFVersion(HV).subscribe( result => {
            let response =  result.json();
            if(response.success){
                this.notify.successNotify(response.message);
                this.modaal.close();
                this.form.reset();
                this.getFirmwareVersions(1);
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
