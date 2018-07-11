import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../services/notifications.services";
import {HardwareVersionsService} from "../../services/hardware_versions/hardware-versions.service";

@Component({
  selector: 'app-hardware-versions',
  templateUrl: './hardware-versions.component.html',
  styleUrls: ['./hardware-versions.component.scss']
})
export class HardwareVersionsComponent implements OnInit {

    public form: FormGroup;
    public editForm: FormGroup;
    hVersions: any= [];
    toEdit: any={};
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
                private hardwareVersionsService:HardwareVersionsService){
    }


    ngOnInit() {
        this.getHVersions(1);
        this.form = this.fb.group ( {
            name: [null , Validators.compose ( [ Validators.required ] )],
            nice_name: [null],
            description: [null],
            notes: [null],
            version: [null , Validators.compose ( [ Validators.required ] )],
        });
        this.editForm = this.fb.group ( {
            name: [''],
            nice_name: [''],
            description: [''],
            notes: [''],
            version: [''],
        });


    }

    getHVersions(page){
        this.hardwareVersionsService.list(page).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.hVersions = response.data;
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
        this.getHVersions(page.page);
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
            notes: this.form.value.notes,
            version : this.form.value.version,
        };
        this.hardwareVersionsService.createHVersion(HV).subscribe( result => {
            let response =  result.json();
            if(response.success){
                this.notify.successNotify(response.message);
                this.modaal.close();
                this.form.reset();
                this.getHVersions(1);
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
        for(let i=0; i<this.hVersions.length; i++){
            if(this.hVersions[i].id == id){
                this.toEdit = this.hVersions[i];
            }
        }
        this.modaal = this.modalService.open(content);
    }

    confirmDelete(id){
        this.hardwareVersionsService.deleteHVersion(id).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notify.successNotify(response.message);
                this.getHVersions(1);
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

    onSaveChanges(id){
        let HV = {
            name: this.editForm.value.name  || this.toEdit['name'],
            nice_name: this.editForm.value.nice_name  || this.toEdit['nice_name'],
            description: this.editForm.value.description  || this.toEdit['description'],
            notes: this.editForm.value.notes  || this.toEdit['notes'],
            version : this.editForm.value.version  || this.toEdit['version']
        };
        this.hardwareVersionsService.updateHVersion(id, HV).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notify.successNotify(response.message);
                this.getHVersions(1);
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

}
