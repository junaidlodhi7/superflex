import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../services/notifications.services";
import {AnnotationsService} from "../../services/annotations/annotations.service";
import {StorageSessionService} from "../../services/storage_sessions/storage-session.service";
import {DateFormatter} from "ngx-bootstrap";

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.scss']
})
export class AnnotationsComponent implements OnInit {

    public form: FormGroup;
    annotations: any= [];
    sSessions: any=[];
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
                private annotationsService:AnnotationsService,
                private storageSessionService:StorageSessionService){
    }


    ngOnInit() {
        this.getAnnotations(1);
        this.form = this.fb.group ( {
            name: [null , Validators.compose ( [ Validators.required, Validators.maxLength(512) ] )],
            notes: [null, Validators.compose([Validators.maxLength(8192)])],
            ts: [null , Validators.compose ( [ Validators.required ] )],
            ts_end: [null , Validators.compose ( [ Validators.required ] )],
            author: [null, Validators.compose([Validators.maxLength(1024)])],
            storage_session_id: [null , Validators.compose ( [ Validators.required ] )]
        });
        // this.editForm = this.fb.group ( {
        //     fname: [''],
        //     lname: [''],
        //     role: ['']
        // });


    }

    getAnnotations(page){
        this.annotationsService.list(page).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.annotations = response.data;
                this.formate(this.annotations);
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

    formate(annotations){
        for(let i=0;i<annotations.length;i++){
            if(annotations[i].ts){
                let a = annotations[i].ts;
                this.annotations[i].start = new DateFormatter().format(new Date(parseInt(a)),'YYYY-MM-DD hh:mm:ss A','en');
            }
            if(annotations[i].ts_end){
                let b = annotations[i].ts_end;
                this.annotations[i].end = new DateFormatter().format(new Date(parseInt(b)),'YYYY-MM-DD hh:mm:ss A','en');
            }
        }
    }

    public onChangeTable(page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
        this.getAnnotations(page.page);
    }

    open(content) {
        this.getStorageSessions();
        this.form.reset();
        this.modaal = this.modalService.open(content);
    }

    getStorageSessions(){
        this.storageSessionService.list(1).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.sSessions = response.data;
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
            notes: this.form.value.notes,
            ts: new Date(this.form.value.ts).getTime(),
            ts_end: new Date(this.form.value.ts_end).getTime(),
            author : this.form.value.author,
            storage_session_id : this.form.value.storage_session_id,
        };
        this.annotationsService.createAnnotation(HV).subscribe( result => {
            let response =  result.json();
            if(response.success){
                this.notify.successNotify(response.message);
                this.modaal.close();
                this.form.reset();
                this.getAnnotations(1);
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
