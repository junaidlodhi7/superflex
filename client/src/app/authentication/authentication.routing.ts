import { Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import {ResetComponent} from "./reset/reset.component";
import {InvitationComponent} from "./invitation/invitation.component";
import {AuthGuard} from "../auth.guard";

export const AuthenticationRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'signin',
                canActivate: [AuthGuard],
                component: SigninComponent
            },
            {
                path: 'signup',
                canActivate: [AuthGuard],
                component: SignupComponent
            },
            {
                path: 'forgot',
                canActivate: [AuthGuard],
                component: ForgotComponent
            },
            {
                path: 'lockscreen',
                canActivate: [AuthGuard],
                component: LockscreenComponent
            },
            {
                path: 'reset/:token',
                canActivate: [AuthGuard],
                component: ResetComponent
            },
            {
                path: 'invitation/:token',
                canActivate: [AuthGuard],
                component: InvitationComponent
            }
        ]
    }
];
