import { Component, OnInit } from '@angular/core';
import { AdminsService} from "../../services/admins/admins.service";
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators } from "@angular/forms";
import {NotificationService} from "../../services/notifications.services";
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Component({
    selector: 'app-users',
    templateUrl: './admins.component.html',
    styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

    public form: FormGroup;
    public editForm: FormGroup;
    loggedInUser = {};
    users: any= [];
    userToEdit: any={};
    pagination: any = {};

    public page:number = 1;
    public itemsPerPage:number = 10;
    public maxSize:number = 3;
    public numPages:number = 100;
    public length:number = 0;
    modaal:any;

    admin='admin';
    support='support';
    user='user';
    selected='selected';
    no=null;
    invitationLink = '';
    isLinkCopied:boolean = false;
    invitedUserID = null;
    constructor(private fb: FormBuilder,
                private adminsService: AdminsService,
                private modalService: NgbModal,
                private notify:NotificationService,
                private authenticationService:AuthenticationService) {
    }


    ngOnInit() {
        this.getLoggedInUser();
        this.getUsers(1);
        this.form = this.fb.group ( {
            fname: [null , Validators.compose ( [ Validators.required ] )],
            lname: [null , Validators.compose ( [ Validators.required ] )],
            email: [null , Validators.compose ( [ Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+$') ] )],
            role: [null, Validators.compose ( [ Validators.required ])]
        });
        this.editForm = this.fb.group ( {
            fname: [''],
            lname: [''],
            role: ['']
        });


    }

    getLoggedInUser(){
        this.loggedInUser = this.authenticationService.getLoggedInUser();
    }

    getUsers(page){
        this.adminsService.getUsers(page).subscribe(res => {
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
        this.modaal = this.modalService.open(content);
    }

    openInvitationModal(content, id){
        this.invitedUserID = id;
        this.isLinkCopied = false;
        for(let i=0;i<this.users.length;i++){
            if(this.users[i].id == id){
                this.invitationLink = 'http://ec2-18-220-95-175.us-east-2.compute.amazonaws.com:8000/authentication/invitation/'+this.users[i].invitation_token;
            }
        }
        this.modaal = this.modalService.open(content);
    }

    clipBoardOnSuccess(){
        this.notify.successNotify('Link is copied.');
        this.isLinkCopied = true;
        this.modaal.close();
    }

    regenerateInvitationLink(){
        this.adminsService.regenerateInvitationLink(this.invitedUserID).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.invitationLink = response.data.link;
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

    closeX(str){
        this.modaal.close();
        this.form.reset();
    }
    closeButton(str){
        this.modaal.close();
        this.form.reset();
    }

    onSubmit(event){

        let user = {
            first_name: this.form.value.fname,
            last_name: this.form.value.lname,
            email : this.form.value.email,
            role: this.form.value.role.toLowerCase()
        };

        this.adminsService.createUser(user).subscribe( result => {
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
        for(let i=0;i<this.users.length;i++){
            if(this.users[i].id == id){
                this.userToEdit = this.users[i];
            }
        }
        this.modaal = this.modalService.open(content);
    }

    onSaveChanges(userID){
        let user = {
            first_name: this.editForm.value.fname || this.userToEdit['first_name'],
            last_name: this.editForm.value.lname || this.userToEdit['last_name'],
            role: this.editForm.value.role || this.userToEdit['role'],
        };

        this.adminsService.update(userID, user).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notify.successNotify(response.message);
                this.getUsers(1);
                this.modaal.close();
                this.form.reset();
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
