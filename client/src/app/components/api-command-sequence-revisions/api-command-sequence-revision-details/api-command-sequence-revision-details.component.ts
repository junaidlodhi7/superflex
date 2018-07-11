import { Component, OnInit } from '@angular/core';
import {ApiCommandSequenceRevisionsService} from "../../../services/api_command_sequence_revisions/api-command-sequence-revisions.service";
import {ActivatedRoute, Params} from "@angular/router";
import {NotificationService} from "../../../services/notifications.services";

@Component({
    selector: 'app-api-command-sequence-revision-details',
    templateUrl: './api-command-sequence-revision-details.component.html',
    styleUrls: ['./api-command-sequence-revision-details.component.scss']
})
export class ApiCommandSequenceRevisionDetailsComponent implements OnInit {

    apiCommandSequenceRevisionId = null;
    apiCommandSequenceRevision: any = {};
    apiCommandSequence: any = {};
    constructor(private activatedRoute: ActivatedRoute,
                private apiCommandSequenceRevisionsService:ApiCommandSequenceRevisionsService,
                private notify:NotificationService) {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.apiCommandSequenceRevisionId = params['id'];
            this.getApiCommandSequenceRevision();
        });
    }

    getApiCommandSequenceRevision(){
        this.apiCommandSequenceRevisionsService.retrieve(this.apiCommandSequenceRevisionId).subscribe(res => {
            let response = res.json();
            if(response.success){
                this.apiCommandSequenceRevision = response.data;
                console.log(this.apiCommandSequenceRevision);
                if(response.data.api_command_sequence) {
                    this.apiCommandSequence = response.data.api_command_sequence;
                }
            }
        }, err => {
            try{
                err = err.json();
                if(err.errors) {
                    for(let i=0;i<err.errors.length;i++){
                        this.notify.errorNotify(err.errors[i].message);
                    }
                }
                else{
                    this.notify.errorNotify("Connectivity issue!");
                }
            }
            catch(e){
                console.log(e);
                console.log(err);
                this.notify.errorNotify("Error!");
            }
        });
    }

    ngOnInit() {
    }

}
