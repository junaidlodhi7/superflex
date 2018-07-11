import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {NotificationService} from "../../services/notifications.services";

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

    public form: FormGroup;
    constructor(private fb: FormBuilder,
                private authenticationService:AuthenticationService,
                private notify : NotificationService) {}

    ngOnInit() {
        this.form = this.fb.group ( {
            email: [null , Validators.compose ( [ Validators.required ] )]
        } );
    }

    onSubmit() {
        let obj = {
            email: this.form.value.email
        };
        this.authenticationService.requestForReset(obj).subscribe(response => {
            let res = response.json();
            if (res.success) {
                this.notify.successNotify(res.message);
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
