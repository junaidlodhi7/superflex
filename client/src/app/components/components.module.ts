import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import {SelectModule} from 'angular2-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './components.routing';
import { FunctionalMovementComponent } from './functional-movement/functional-movement.component';
import { AdminsComponent } from './admins/admins.component';
import { FunctionalMovementRevisionComponent } from './functional-movement-revision/functional-movement-revision.component';
import {CodemirrorModule} from '@ng4/codemirror';
import { FiniteStateMachineComponent } from './finite-state-machine/finite-state-machine.component';
import { FiniteStateMachineRevisionComponent } from './finite-state-machine-revision/finite-state-machine-revision.component';
import { YamlEditorComponent } from './yaml-editor/yaml-editor.component';
import { NewFunctionalMovementComponent } from './functional-movement/new/new.component';
import {Ng2BreadcrumbModule, BreadcrumbService} from 'ng2-breadcrumb/ng2-breadcrumb';


import { TestsComponent } from './tests/tests.component';
import { ShowComponent } from './tests/show/show.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { NotificationsComponent } from './notifications/notifications.component';
// import { ChartModule,HIGHCHARTS_MODULES } from 'angular-highcharts';
import highchartsMoreExtension from 'highcharts/highcharts-more.src';
import xRangeExtension from 'highcharts/modules/xrange.src';
import {ClipboardModule} from "ngx-clipboard/dist";
import {ExtendTestModalContent, SuitAnnotationsComponent} from './tests/suit-annotations/suit-annotations.component';
import { UsersComponent } from './users/users.component';
import {HardwareVersionsComponent} from "./hardware-versions/hardware-versions.component";
import { HardwareComponentComponent } from './hardware-component/hardware-component.component';
import { FirmwareVersionsComponent } from './firmware-versions/firmware-versions.component';
import { ProductModelComponent } from './product-model/product-model.component';
import { SoftgoodsModelsComponent } from './softgoods-models/softgoods-models.component';
import { SoftgoodsVersionsComponent } from './softgoods-versions/softgoods-versions.component';
import { ProductVersionsComponent } from './product-versions/product-versions.component';
import { ProductsComponent } from './products/products.component';
import { ProductConfigsComponent } from './product-configs/product-configs.component';
import { ProductConfigRevisionsComponent } from './product-config-revisions/product-config-revisions.component';
import { StorageSessionsComponent } from './storage-sessions/storage-sessions.component';
import { AnnotationsComponent } from './annotations/annotations.component';
import { ApiCommandSequencesComponent } from './api-command-sequences/api-command-sequences.component';
import { ApiCommandSequenceRevisionsComponent } from './api-command-sequence-revisions/api-command-sequence-revisions.component';
import { UsersDetailsComponent } from './users/users-details/users-details.component';
import { StorageSessionDetailsComponent } from './storage-sessions/storage-session-details/storage-session-details.component';
import { ApiCommandSequenceDetailsComponent } from './api-command-sequences/api-command-sequence-details/api-command-sequence-details.component';
import { ApiCommandSequenceRevisionDetailsComponent } from './api-command-sequence-revisions/api-command-sequence-revision-details/api-command-sequence-revision-details.component';

// export function highchartsModules() {
//     return [highchartsMoreExtension, xRangeExtension];
// }

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ComponentsRoutes),
        FormsModule,
        ReactiveFormsModule,
        JsonpModule,
        NgbModule,
        CodemirrorModule.forRoot(),
        NgxChartsModule,
        Ng2TableModule,
        PaginationModule.forRoot(),
        Ng2BreadcrumbModule,
        CodemirrorModule.forRoot(),
        DateTimePickerModule,
        // ChartModule,
        SelectModule,
        ClipboardModule
    ],
    providers: [BreadcrumbService
        // , { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
    ],
    declarations: [
        FunctionalMovementComponent,
        AdminsComponent,
        FunctionalMovementRevisionComponent,
        FiniteStateMachineComponent,
        FiniteStateMachineRevisionComponent,
        YamlEditorComponent,
        TestsComponent,
        ShowComponent,
        NewFunctionalMovementComponent,
        NotificationsComponent,
        SuitAnnotationsComponent,
        ExtendTestModalContent,
        UsersComponent,
        HardwareVersionsComponent,
        HardwareComponentComponent,
        FirmwareVersionsComponent,
        ProductModelComponent,
        SoftgoodsModelsComponent,
        SoftgoodsVersionsComponent,
        ProductVersionsComponent,
        ProductsComponent,
        ProductConfigsComponent,
        ProductConfigRevisionsComponent,
        StorageSessionsComponent,
        AnnotationsComponent,
        ApiCommandSequencesComponent,
        ApiCommandSequenceRevisionsComponent,
        UsersDetailsComponent,
        StorageSessionDetailsComponent,
        ApiCommandSequenceDetailsComponent,
        ApiCommandSequenceRevisionDetailsComponent
    ],
    entryComponents:[ExtendTestModalContent]
})

export class ComponentsModule {}

