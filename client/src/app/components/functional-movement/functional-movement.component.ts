import { Component, OnInit } from '@angular/core';
import {FunctionalMovementsService} from "../../services/functional_movements/functional-movements.service";
import { NotificationService} from "../../services/notifications.services";

@Component({
    selector: 'app-functional-movement',
    templateUrl: './functional-movement.component.html',
    styleUrls: ['./functional-movement.component.scss']
})
export class FunctionalMovementComponent implements OnInit {

    data:any = [];
    pagination: any = {};
    public page:number = 1;
    public itemsPerPage:number = 10;
    public maxSize:number = 3;
    public numPages:number = 100;
    public length:number = 0;
    constructor(private functionalMovementsService: FunctionalMovementsService,
                private notify: NotificationService) {
    }

    ngOnInit() {
        this.list(1);
    }

    list(page){
        this.functionalMovementsService.list(page).subscribe(res => {
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

    setStatus(status, id){
        this.functionalMovementsService.setStatus(status,id).subscribe( result => {
            let response =  result.json();
            if(response.success){
                this.notify.successNotify(response.message);
                this.list(1);
            }
            else if(!response.success) {
                for(let i=0;i<response.errors.length;i++){
                    this.notify.errorNotify(response.errors[i].message);
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
