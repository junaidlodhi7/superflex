import { Component, OnInit } from '@angular/core';
import {FiniteStateMachineService} from "../../services/finite_state_machine/finite-state-machine.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { NotificationService} from "../../services/notifications.services";

@Component({
  selector: 'app-finite-state-machine',
  templateUrl: './finite-state-machine.component.html',
  styleUrls: ['./finite-state-machine.component.scss']
})
export class FiniteStateMachineComponent implements OnInit {

    public form: FormGroup;
    data:any = [];
    pagination: any = {};

    public page:number = 1;
    public itemsPerPage:number = 10;
    public maxSize:number = 3;
    public numPages:number = 100;
    public length:number = 0;
    modaal:any;
    constructor(private fb: FormBuilder,
                private finiteStateMachine: FiniteStateMachineService,
                private modalService: NgbModal,
                private notify: NotificationService) {}

    ngOnInit() {
        this.list(1);
    }

    list(page){
        this.finiteStateMachine.list(page).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.data = response.data;
                this.pagination = response.pagination;
                this.page = this.pagination.current;
                this.itemsPerPage = this.pagination.per_page;
                this.numPages = this.pagination.pages;
                this.length = this.pagination.total;
            }
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
    }

    public onChangeTable(page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
        this.list(page.page);
    }

    open(content) {
        this.form = this.fb.group ( {
            name: [null , Validators.compose ( [ Validators.required ] )],
            description: []
        });
        this.modaal = this.modalService.open(content);
    }

    onSubmit(event){
        let obj = {
            name: this.form.value.name
        };

        this.finiteStateMachine.create(obj).subscribe( result => {
            let res = result.json();
            if(res.success){
                this.notify.successNotify(res.message);
                this.modaal.close();
                this.form.reset();
                this.list(1);
            }
            else if(!res.success) {
                for(let i=0;i<res.errors.length;i++){
                    this.notify.errorNotify(res.errors[i].message);
                }
            }
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
    }

}
