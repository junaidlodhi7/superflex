import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ApiCommandSequencesService} from "../../../services/api_command_sequences/api-command-sequences.service";
import {NotificationService} from "../../../services/notifications.services";
import {ApiCommandSequenceRevisionsService} from "../../../services/api_command_sequence_revisions/api-command-sequence-revisions.service";

@Component({
    selector: 'app-api-command-sequence-details',
    templateUrl: './api-command-sequence-details.component.html',
    styleUrls: ['./api-command-sequence-details.component.scss']
})
export class ApiCommandSequenceDetailsComponent implements OnInit {

    apiCommandSequenceId = null;
    apiCommandSequence: any = {};
    firmwareVersion: any = {};
    productVersion: any = {};
    apiCommandSequenceRevisionObject: any = {};
    apiCommandSequenceRevisions  =[];

    //pagination
    pagination: any = {};
    public page:number = 1;
    public itemsPerPage:number = 10;
    public maxSize:number = 3;
    public numPages:number = 100;
    public length:number = 0;

    constructor(private activatedRoute: ActivatedRoute,
                private apiCommandSequencesService:ApiCommandSequencesService,
                private notify:NotificationService) {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.apiCommandSequenceId = params['id'];
            this.getApiCommandSequence();
        });
    }

    getApiCommandSequence(){
        this.apiCommandSequencesService.retrieve(this.apiCommandSequenceId).subscribe(res => {
            let response = res.json();
            if(response.success){
                this.apiCommandSequence = response.data;
                if(response.data.firmware_version) {
                    this.firmwareVersion = response.data.firmware_version;
                }
                if(response.data.product_version) {
                    this.productVersion = response.data.product_version;
                }
                if(response.data.api_command_sequence_revisions) {
                    this.apiCommandSequenceRevisionObject = response.data.api_command_sequence_revisions;
                    this.apiCommandSequenceRevisions = this.apiCommandSequenceRevisionObject['data'];
                    this.pagination = this.apiCommandSequenceRevisionObject['pagination'];
                    this.page = this.pagination.current;
                    this.itemsPerPage = this.pagination.per_page;
                    this.numPages = this.pagination.pages;
                    this.length = this.pagination.total;
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

    public onChangeTable(page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
        this.getApiCommandSequenceRevisions(page.page);
    }

    getApiCommandSequenceRevisions(page){
        this.apiCommandSequencesService.findRevisions(this.apiCommandSequenceId, page).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                console.log(response);
                this.apiCommandSequenceRevisions = response.data;
                this.pagination = response.pagination;
                this.page = this.pagination.current;
                this.itemsPerPage = this.pagination.per_page;
                this.numPages = this.pagination.pages;
                this.length = this.pagination.total;
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

}
