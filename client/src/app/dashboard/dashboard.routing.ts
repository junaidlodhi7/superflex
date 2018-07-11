import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import {AdminGuard} from "../admin.guard";

export const DashboardRoutes: Routes = [{
    path: 'dashboard',
    canActivate: [AdminGuard],
    component: DashboardComponent,
    data: {
        heading: 'Dashboard',
        breadcrumb: 'Dashboard',
    }
}];
