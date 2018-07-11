import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "ng2-validation";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {NotificationService} from "../../services/notifications.services";


const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', Validators.compose([Validators.required, CustomValidators.equalTo(password)]));

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

    token='';
    public form: FormGroup;
    constructor(private fb: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private authenticationService:AuthenticationService,
                private notify : NotificationService) {

        this.activatedRoute.params.subscribe((params: Params) => {
            this.token = params['token'];

        });
    }

    ngOnInit() {
        this.form = this.fb.group ( {
            password: password,
            confirmPassword: confirmPassword
        } );
    }

    onSubmit(){
        let obj = {
            password: this.form.value.password,
        };

        this.authenticationService.resetPassword(this.token, obj).subscribe(response => {
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
