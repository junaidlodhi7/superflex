import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutes } from './authentication.routing';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';

import {AuthenticationService} from "../services/authentication/authentication.service";
import { ResetComponent } from './reset/reset.component';
import { InvitationComponent } from "./invitation/invitation.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthenticationRoutes),
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [AuthenticationService],
    declarations: [SigninComponent,
        SignupComponent,
        ForgotComponent,
        LockscreenComponent,
        ResetComponent,
        InvitationComponent
    ]
})

export class AuthenticationModule {}
