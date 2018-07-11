import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {NotificationService} from "../../services/notifications.services";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private  notify : NotificationService){

  }


  ngOnInit() {
      this.form = this.fb.group ( {
          uname: [null , Validators.compose ( [ Validators.required ] )],
          password: [null , Validators.compose ( [ Validators.required ] )]
      });
  }

  onSubmit(event) {
      let email    = this.form.value.uname;
      let password = this.form.value.password;

      this.authenticationService.login(email , password).subscribe(response => {
          let res = response.json();
          let token = res && res['token'];
          let user = res['user'];
          let version = res['app_version'];
          if (token && user) {
              this.authenticationService.setCredentials(token, user, version);
              this.authenticationService.setJustLoggedInStatus(true);
              this.router.navigate(['dashboard']);
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

