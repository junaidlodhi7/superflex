import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule} from "@angular/common/http";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SharedModule } from './shared/shared.module';
import {AuthenticationService} from "./services/authentication/authentication.service";
import {AdminsService} from "./services/admins/admins.service";
import {FunctionalMovementsService} from "./services/functional_movements/functional-movements.service";
import {FiniteStateMachineService} from "./services/finite_state_machine/finite-state-machine.service";

import {CodemirrorModule} from '@ng4/codemirror';
import {AdminGuard} from "./admin.guard";
import {ApiService} from "./services/api.service";
import { SimpleNotificationsModule} from "angular2-notifications";
import {NotificationService} from "./services/notifications.services";
import {Ng2BreadcrumbModule} from 'ng2-breadcrumb/ng2-breadcrumb';
import {BreadcrumbService} from "ng2-breadcrumb/bundles/components/breadcrumbService";
import {TestsService} from "./services/tests/tests.service";
import {SuitsService} from "./services/suits/suits.service";
import {TestTypesService} from "./services/test_types/test-types.service";
import {SuitAnnotationsService} from "./services/suit_annotations/suit-annotations.service";
import {UsersService} from "./services/users/users.service";
import {NotificationsService} from "./services/notifications/notifications.service";
import {AuthGuard} from "./auth.guard";
import {UsersTestService} from "./services/users_test/users-test.service";
import {HardwareVersionsService} from "./services/hardware_versions/hardware-versions.service";
import {HardwareComponentService} from "./services/hardware_component/hardware-component.service";
import {FirmwareVersionsService} from "./services/firmware_versions/firmware-versions.service";
import {ProductModelsService} from "./services/product_models/product-models.service";
import {SoftgoodsModelsService} from "./services/softgoods_models/softgoods-models.service";
import {SoftgoodsVersionsService} from "./services/softgoods_versions/softgoods-versions.service";
import {ProductVersionsService} from "./services/product_versions/product-versions.service";
import {ProductsService} from "./services/products/products.service";
import {ProductConfigsService} from "./services/product_configs/product-configs.service";
import {ProductConfigRevisionsService} from "./services/product_config_revisions/product-config-revisions.service";
import {StorageSessionService} from "./services/storage_sessions/storage-session.service";
import {AnnotationsService} from "./services/annotations/annotations.service";
import {ApiCommandSequencesService} from "./services/api_command_sequences/api-command-sequences.service";
import {ApiCommandSequenceRevisionsService} from "./services/api_command_sequence_revisions/api-command-sequence-revisions.service";
import {ProductDataService} from "./services/product_data/product-data.service";

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        RouterModule.forRoot(AppRoutes),
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
            }
        }),
        NgbModule.forRoot(),
        SidebarModule.forRoot(),
        CodemirrorModule.forRoot(),
        SimpleNotificationsModule.forRoot(),
        Ng2BreadcrumbModule.forRoot()
    ],
    providers: [AuthenticationService,
        ApiService,
        AdminsService,
        FunctionalMovementsService,
        AdminGuard,
        AuthGuard,
        NotificationService,
        FiniteStateMachineService,
        BreadcrumbService,
        TestsService,
        SuitsService,
        TestTypesService,
        SuitAnnotationsService,
        UsersService,
        NotificationsService,
        UsersTestService,
        HardwareVersionsService,
        HardwareComponentService,
        FirmwareVersionsService,
        ProductModelsService,
        SoftgoodsModelsService,
        SoftgoodsVersionsService,
        ProductVersionsService,
        ProductsService,
        ProductConfigsService,
        ProductConfigRevisionsService,
        StorageSessionService,
        AnnotationsService,
        ApiCommandSequencesService,
        ApiCommandSequenceRevisionsService,
        ProductDataService],
    bootstrap: [AppComponent]
})
export class AppModule { }
