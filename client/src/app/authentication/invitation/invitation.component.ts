import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {NotificationService} from "../../services/notifications.services";

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', Validators.compose([Validators.required, CustomValidators.equalTo(password)]));

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

    private token;
    user = {};

    public form: FormGroup;
    constructor(private fb: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private authenticationService:AuthenticationService,
                private router: Router,
                private notify : NotificationService) {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.token = params['token'];

        });
    }

    ngOnInit() {
        this.form = this.fb.group( {
            fname: [null],
            lname: [null],
            email: [null],
            password: password,
            confirmPassword: confirmPassword,
            gender: [null , Validators.compose ( [ Validators.required ] )],
        } );
        this.authenticationService.getUserObject(this.token).subscribe(response => {
            let res = response.json();
            if (res.success) {
                this.user = res.data;
            }
        }, err => {
            err = err.json();
            if(err.errors) {
                for(let i=0;i<err.errors.length;i++){
                    this.notify.errorNotify(err.errors[i].message);
                    this.router.navigate(['error/404']);
                }
            }
            else{
                this.notify.errorNotify("Connectivity issue!");
            }
        });
    }

    onSubmit() {
        let user = {
            first_name: this.form.value.fname || this.user['first_name'],
            last_name: this.form.value.lname || this.user['last_name'],
            email: this.form.value.email || this.user['email'],
            password: this.form.value.password,
            gender: this.form.value.gender
        };
        this.authenticationService.setUserObject(this.token,user).subscribe(response => {
            let res = response.json();
            if (res.success) {
                this.notify.successNotify(res.message);
                this.router.navigate(['authentication/signin']);
            } else if(!res.success) {
                for(let i=0;i<res.errors.length;i++){
                    this.notify.errorNotify(res.errors[i].message);
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

}
