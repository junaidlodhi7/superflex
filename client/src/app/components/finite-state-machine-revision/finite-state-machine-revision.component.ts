import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import {FiniteStateMachineService} from "../../services/finite_state_machine/finite-state-machine.service";
import {NotificationService} from "../../services/notifications.services";
@Component({
    selector: 'app-finite-state-machine-revision',
    templateUrl: './finite-state-machine-revision.component.html',
    styleUrls: ['./finite-state-machine-revision.component.scss']
})
export class FiniteStateMachineRevisionComponent implements OnInit {

    finiteStateMachineId;
    finiteStateMachineName;
    revisions = [];

    constructor(private finiteStateMachineService: FiniteStateMachineService,
                private activatedRoute: ActivatedRoute,
                private notify : NotificationService) {

        this.activatedRoute.params.subscribe((params: Params) => {
            this.finiteStateMachineId = params['id'];
            this.finiteStateMachineService.retrieve(this.finiteStateMachineId).subscribe(res => {
                let response = res.json().data;
                this.finiteStateMachineName = response.name;
                this.revisions = response.finite_state_machine_revisions;
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
        });
    }

    ngOnInit() {
    }

}
