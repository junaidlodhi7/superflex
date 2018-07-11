import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import {AdminGuard} from "./admin.guard";
import {AuthGuard} from "./auth.guard";

export const AppRoutes: Routes = [{
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
        {
            path: '',
            loadChildren: './components/components.module#ComponentsModule'
        },{
            path: '',
            loadChildren: './dashboard/dashboard.module#DashboardModule'
        } ]
}, {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
        path: 'authentication',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
    }, {
        path: 'error',
        loadChildren: './error/error.module#ErrorModule'
    }]
}, {
    path: '**',
    redirectTo: 'error/404'
}];

