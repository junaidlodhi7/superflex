import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../services/notifications.services";
import {UsersService} from "../../services/users/users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    public form: FormGroup;
    public editForm: FormGroup;
    users: any= [];
    userToEdit: any={};
    userDetailsToEdit: any={};
    selected = "selected";
    male = "Male";
    female = "Female";
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
                private usersService: UsersService){
    }


    ngOnInit() {
        this.getUsers(1);
        this.form = this.fb.group ( {
            name: [null , Validators.compose ( [ Validators.required ] )],
            sex: [null , Validators.compose ( [ Validators.required ] )],
            date_of_birth: [null , Validators.compose ( [ Validators.required ] )],
            remoteID: [null],
            email: [null , Validators.compose ( [ Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+$') ] )],
        });
        this.editForm = this.fb.group ( {
            name: [],
            remoteID: [],
            sex: [],
            date_of_birth: [],
            email: []
        });


    }

    getUsers(page){
        this.usersService.list(page).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.users = response.data;
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
        this.getUsers(page.page);
    }

    open(content) {
        this.form.reset();
        this.modaal = this.modalService.open(content);
    }

    onSubmit(){
        let user = {
            name: this.form.value.name,
            sex: this.form.value.sex,
            date_of_birth: this.form.value.date_of_birth,
            remote_id: parseInt(this.form.value.remoteID),
            email : this.form.value.email,
        };
        this.usersService.createUser(user).subscribe( result => {
            let response =  result.json();
            if(response.success){
                this.notify.successNotify(response.message);
                this.modaal.close();
                this.form.reset();
                this.getUsers(1);
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
        this.userDetailsToEdit = {};
        for(let i=0; i<this.users.length; i++){
            if(this.users[i].id == id){
                this.userToEdit = this.users[i];
                if(this.userToEdit.user_detail){
                    this.userDetailsToEdit = this.userToEdit.user_detail;
                }
            }
        }
        this.modaal = this.modalService.open(content);
    }

    onSaveChanges(userID){
        let user = {
            name: this.editForm.value.name  || this.userToEdit['name'],
            remote_id: parseInt(this.editForm.value.remoteID) || this.userToEdit['remote_id'],
            email : this.editForm.value.email  || this.userToEdit['email'],
            sex: this.editForm.value.sex  || this.userDetailsToEdit['sex'],
            date_of_birth: this.editForm.value.date_of_birth  || new Date(this.userDetailsToEdit['date_of_birth'])
        };
        console.log(user);
        this.usersService.updateUser(userID, user).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notify.successNotify(response.message);
                this.getUsers(1);
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
        });
    }

    confirmDelete(id){
        this.usersService.deleteUser(id).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notify.successNotify(response.message);
                this.getUsers(1);
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
