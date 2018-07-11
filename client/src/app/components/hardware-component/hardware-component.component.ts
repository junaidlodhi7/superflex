import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../services/notifications.services";
import {HardwareComponentService} from "../../services/hardware_component/hardware-component.service";

@Component({
  selector: 'app-hardware-component',
  templateUrl: './hardware-component.component.html',
  styleUrls: ['./hardware-component.component.scss']
})
export class HardwareComponentComponent implements OnInit {

    public form: FormGroup;
    public editForm: FormGroup;
    hComponent: any= [];
    toEdit: any = {};
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
                private hardwareComponentService:HardwareComponentService){
    }


    ngOnInit() {
        this.getHComponent(1);
        this.form = this.fb.group ( {
            name: [null , Validators.compose ( [ Validators.required ] )],
            nice_name: [null],
            description: [null],
            notes: [null],
            part_number: [null , Validators.compose ( [ Validators.required ] )],
            manufacturer: [null , Validators.compose ( [ Validators.required ] )],
            dimensions: [null],
            weight: [null],
        });
        this.editForm = this.fb.group ( {
            name: [''],
            nice_name: [''],
            description: [''],
            notes: [''],
            part_number: [''],
            manufacturer: [''],
            dimensions: [''],
            weight: ['']
        });


    }

    getHComponent(page){
        this.hardwareComponentService.list(page).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.hComponent = response.data;
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
        this.getHComponent(page.page);
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
            part_number : this.form.value.part_number,
            manufacturer: this.form.value.manufacturer,
            dimensions: this.form.value.dimensions,
            weight : this.form.value.weight
        };
        this.hardwareComponentService.createHComponent(HV).subscribe( result => {
            let response =  result.json();
            if(response.success){
                this.notify.successNotify(response.message);
                this.modaal.close();
                this.form.reset();
                this.getHComponent(1);
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
        for(let i=0; i<this.hComponent.length; i++){
            if(this.hComponent[i].id == id){
                this.toEdit = this.hComponent[i];
            }
        }
        this.modaal = this.modalService.open(content);
    }

    confirmDelete(id){
        this.hardwareComponentService.deleteHComponent(id).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notify.successNotify(response.message);
                this.getHComponent(1);
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
        let HC = {
            name: this.editForm.value.name  || this.toEdit['name'],
            nice_name: this.editForm.value.nice_name  || this.toEdit['nice_name'],
            description: this.editForm.value.description  || this.toEdit['description'],
            notes: this.editForm.value.notes  || this.toEdit['notes'],
            part_number : this.editForm.value.part_number  || this.toEdit['part_number'],
            manufacturer: this.editForm.value.manufacturer  || this.toEdit['manufacturer'],
            dimensions: this.editForm.value.dimensions  || this.toEdit['dimensions'],
            weight : this.editForm.value.weight  || this.toEdit['weight']
        };

        this.hardwareComponentService.updateHComponent(id, HC).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notify.successNotify(response.message);
                this.getHComponent(1);
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
