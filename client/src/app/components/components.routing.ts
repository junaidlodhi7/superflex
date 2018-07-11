import { Routes } from '@angular/router';
// import { FunctionalMovementComponent } from "./functional-movement/functional-movement.component";
import {AdminsComponent} from "./admins/admins.component";
// import {FunctionalMovementRevisionComponent} from "./functional-movement-revision/functional-movement-revision.component";
import {AdminGuard} from "../admin.guard";
// import {FiniteStateMachineComponent} from "./finite-state-machine/finite-state-machine.component";
// import {FiniteStateMachineRevisionComponent} from "./finite-state-machine-revision/finite-state-machine-revision.component";
// import {YamlEditorComponent} from "./yaml-editor/yaml-editor.component";
// import {TestsComponent} from "./tests/tests.component";
// import {ShowComponent} from "./tests/show/show.component";
// import {NewFunctionalMovementComponent} from "./functional-movement/new/new.component";
// import { NotificationsComponent } from './notifications/notifications.component';
// import {SuitAnnotationsComponent} from "./tests/suit-annotations/suit-annotations.component";
import {UsersComponent} from "./users/users.component";
// import {HardwareVersionsComponent} from "./hardware-versions/hardware-versions.component";
// import {HardwareComponentComponent} from "./hardware-component/hardware-component.component";
// import {FirmwareVersionsComponent} from "./firmware-versions/firmware-versions.component";
// import {ProductModelComponent} from "./product-model/product-model.component";
// import {SoftgoodsModelsComponent} from "./softgoods-models/softgoods-models.component";
// import {SoftgoodsVersionsComponent} from "./softgoods-versions/softgoods-versions.component";
// import {ProductVersionsComponent} from "./product-versions/product-versions.component";
// import {ProductsComponent} from "./products/products.component";
// import {ProductConfigsComponent} from "./product-configs/product-configs.component";
// import {ProductConfigRevisionsComponent} from "./product-config-revisions/product-config-revisions.component";
import {StorageSessionsComponent} from "./storage-sessions/storage-sessions.component";
// import {AnnotationsComponent} from "./annotations/annotations.component";
import {ApiCommandSequencesComponent} from "./api-command-sequences/api-command-sequences.component";
import {ApiCommandSequenceRevisionsComponent} from "./api-command-sequence-revisions/api-command-sequence-revisions.component";
import {UsersDetailsComponent} from "./users/users-details/users-details.component";
import {StorageSessionDetailsComponent} from "./storage-sessions/storage-session-details/storage-session-details.component";
import {ApiCommandSequenceDetailsComponent} from "./api-command-sequences/api-command-sequence-details/api-command-sequence-details.component";
import {ApiCommandSequenceRevisionDetailsComponent} from "./api-command-sequence-revisions/api-command-sequence-revision-details/api-command-sequence-revision-details.component";

export const ComponentsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'admins',
                canActivate: [AdminGuard],
                component: AdminsComponent,
                data: {
                    heading: 'Admins',
                    breadcrumb: 'Admins',
                }
            },
            {
                path: 'users',
                canActivate: [AdminGuard],
                component: UsersComponent,
                data: {
                    heading: 'Users',
                    breadcrumb: 'Users',
                }
            },
            {
                path: 'users/:id',
                canActivate: [AdminGuard],
                component: UsersDetailsComponent,
                data: {
                    heading: 'Users Details',
                    breadcrumb: 'Users Details'
                }
            },
            // {
            //     path: 'hardwareversions',
            //     canActivate: [AdminGuard],
            //     component: HardwareVersionsComponent,
            //     data: {
            //         heading: 'Hardware Versions',
            //         breadcrumb: 'Hardware Versions',
            //     }
            // },
            // {
            //     path: 'hardwarecomponents',
            //     canActivate: [AdminGuard],
            //     component: HardwareComponentComponent,
            //     data: {
            //         heading: 'Hardware Components',
            //         breadcrumb: 'Hardware Components',
            //     }
            // },
            // {
            //     path: 'firmwareversions',
            //     canActivate: [AdminGuard],
            //     component: FirmwareVersionsComponent,
            //     data: {
            //         heading: 'Firmware Versions',
            //         breadcrumb: 'Firmware Versions',
            //     }
            // },
            // {
            //     path: 'productmodels',
            //     canActivate: [AdminGuard],
            //     component: ProductModelComponent,
            //     data: {
            //         heading: 'Product Models',
            //         breadcrumb: 'Product Models',
            //     }
            // },
            // {
            //     path: 'softgoodsmodels',
            //     canActivate: [AdminGuard],
            //     component: SoftgoodsModelsComponent,
            //     data: {
            //         heading: 'Softgoods Models',
            //         breadcrumb: 'Softgoods Models',
            //     }
            // },
            // {
            //     path: 'softgoodsversions',
            //     canActivate: [AdminGuard],
            //     component: SoftgoodsVersionsComponent,
            //     data: {
            //         heading: 'Softgoods Versions',
            //         breadcrumb: 'Softgoods Versions',
            //     }
            // },
            // {
            //     path: 'productversions',
            //     canActivate: [AdminGuard],
            //     component: ProductVersionsComponent,
            //     data: {
            //         heading: 'Product Versions',
            //         breadcrumb: 'Product Versions',
            //     }
            // },
            // {
            //     path: 'products',
            //     canActivate: [AdminGuard],
            //     component: ProductsComponent,
            //     data: {
            //         heading: 'Products',
            //         breadcrumb: 'Products',
            //     }
            // },
            // {
            //     path: 'productconfigs',
            //     canActivate: [AdminGuard],
            //     component: ProductConfigsComponent,
            //     data: {
            //         heading: 'Product Configs',
            //         breadcrumb: 'Product Configs',
            //     }
            // },
            // {
            //     path: 'productconfigrevisions',
            //     canActivate: [AdminGuard],
            //     component: ProductConfigRevisionsComponent,
            //     data: {
            //         heading: 'Product Config Revisions',
            //         breadcrumb: 'Product Config Revisions',
            //     }
            // },
            {
                path: 'storagesessions',
                canActivate: [AdminGuard],
                component: StorageSessionsComponent,
                data: {
                    heading: 'Storage Sessions',
                    breadcrumb: 'Storage Sessions',
                }
            },
            {
                path: 'storagesessions/:id',
                canActivate: [AdminGuard],
                component: StorageSessionDetailsComponent,
                data: {
                    heading: 'Storage Sessions Details',
                    breadcrumb: 'Storage Sessions Details'
                }
            },
            {
                path: 'apicommandsequences',
                canActivate: [AdminGuard],
                component: ApiCommandSequencesComponent,
                data: {
                    heading: 'Api Command Sequences',
                    breadcrumb: 'Api Command Sequences',
                }
            },
            {
                path: 'apicommandsequences/:id',
                canActivate: [AdminGuard],
                component: ApiCommandSequenceDetailsComponent,
                data: {
                    heading: 'ACS Details',
                    breadcrumb: 'ACS Details'
                }
            },
            // {
            //     path: 'annotations',
            //     canActivate: [AdminGuard],
            //     component: AnnotationsComponent,
            //     data: {
            //         heading: 'Annotations',
            //         breadcrumb: 'Annotations',
            //     }
            // },
            {
                path: 'apicommandsequencerevisions',
                canActivate: [AdminGuard],
                component: ApiCommandSequenceRevisionsComponent,
                data: {
                    heading: 'Api Command Sequence Revisions',
                    breadcrumb: 'Api Command Sequence Revisions',
                }
            },
            {
                path: 'apicommandsequencerevisions/:id',
                canActivate: [AdminGuard],
                component: ApiCommandSequenceRevisionDetailsComponent,
                data: {
                    heading: 'ACSR Details',
                    breadcrumb: 'ACSR Details'
                }
            },
            // {
            //     path: 'notifications',
            //     canActivate: [AdminGuard],
            //     component: NotificationsComponent,
            //     data: {
            //         heading: 'Notifications',
            //         breadcrumb: 'Notifications',
            //     }
            // },
            // {
            //     path: 'functionalmovements',
            //     canActivate: [AdminGuard],
            //     component: FunctionalMovementComponent,
            //     data: {
            //         heading: 'Functional Movements',
            //         breadcrumb: 'Functional Movements',
            //     }
            // },
            // {
            //     path: 'functionalmovements/new',
            //     canActivate: [AdminGuard],
            //     component: NewFunctionalMovementComponent,
            //     data: {
            //         heading: 'New Functional Movement',
            //         breadcrumb: 'New',
            //     }
            // },
            // {
            //     path: 'functionalmovements/:id',
            //     canActivate: [AdminGuard],
            //     component: FunctionalMovementRevisionComponent,
            //     data: {
            //         heading: 'Functional Movement Revisions',
            //         breadcrumb: 'Functional Movement Revisions'
            //     }
            // },
            // {
            //     path: 'functionalmovements/:id/functionalmovementrevisions',
            //     canActivate: [AdminGuard],
            //     component: FunctionalMovementRevisionComponent,
            //     data: {
            //         heading: 'Functional Movement Revisions',
            //         breadcrumb: 'Functional Movement Revisions'
            //     }
            // },
            // {
            //     path: 'functionalmovements/:functionalMovementId/functionalmovementrevisions/new',
            //     canActivate: [AdminGuard],
            //     component: YamlEditorComponent,
            //     data: {
            //         heading: 'Functional Movement Revisions',
            //         breadcrumb: 'New'
            //     }
            // },
            // {
            //     path: 'functionalmovements/:functionalMovementId/functionalmovementrevisions/:id',
            //     canActivate: [AdminGuard],
            //     component: YamlEditorComponent,
            //     data: {
            //         heading: 'Functional Movement Revisions',
            //         breadcrumb: 'Functional Movement Revisions'
            //     }
            // },
            // {
            //     path: 'finitestatemachines',
            //     canActivate: [AdminGuard],
            //     component: FiniteStateMachineComponent,
            //     data: {
            //         heading: 'Finite State Machines',
            //         breadcrumb: 'Finite State Machine'
            //     }
            // },
            //
            // {
            //     path: 'finitestatemachines/:id',
            //     canActivate: [AdminGuard],
            //     component: FiniteStateMachineRevisionComponent,
            //     data: {
            //         heading: 'Finite State Machine Revisions',
            //         breadcrumb: 'Finite State Machine Revisions'
            //     }
            // },
            // {
            //     path: 'finitestatemachines/:id/finitestatemachinerevisions',
            //     canActivate: [AdminGuard],
            //     component: FiniteStateMachineRevisionComponent,
            //     data: {
            //         heading: 'Finite State Machine Revisions',
            //         breadcrumb: 'Finite State Machine Revisions'
            //     }
            // },
            // {
            //     path: 'finitestatemachines/:finiteStateMachineId/finitestatemachinerevisions/new',
            //     canActivate: [AdminGuard],
            //     component: YamlEditorComponent,
            //     data: {
            //         heading: 'Finite State Machine Revisions',
            //         breadcrumb: 'Finite State Machine Revisions'
            //     }
            // },
            // {
            //     path: 'finitestatemachines/:finiteStateMachineId/finitestatemachinerevisions/:id',
            //     canActivate: [AdminGuard],
            //     component: YamlEditorComponent,
            //     data: {
            //         heading: 'Finite State Machine Revisions',
            //         breadcrumb: 'Finite State Machine Revisions'
            //     }
            // },
            // {
            //     path: 'tests',
            //     canActivate: [AdminGuard],
            //     component: TestsComponent,
            //     data: {
            //         heading: 'Tests',
            //         breadcrumb: 'Tests',
            //     }
            // },
            // {
            //     path: 'tests/:id',
            //     canActivate: [AdminGuard],
            //     component: ShowComponent,
            //     data: {
            //         heading: 'Show Tests',
            //         breadcrumb: 'Show Tests'
            //     }
            // },
            // {
            //     path: 'tests/:id/suitannotations',
            //     canActivate: [AdminGuard],
            //     component: SuitAnnotationsComponent,
            //     data: {
            //         heading: 'Suit Annotations',
            //         breadcrumb: 'Suit Annotations'
            //     }
            // },
        ]
    }
];
