import {ActivatedRoute, Params} from '@angular/router';
import {FunctionalMovementsService} from "../../services/functional_movements/functional-movements.service";
import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../services/notifications.services";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
    selector: 'app-functional-movement-revision',
    templateUrl: './functional-movement-revision.component.html',
    styleUrls: ['./functional-movement-revision.component.scss']
})
export class FunctionalMovementRevisionComponent  implements OnInit {

    functionalMovementId;
    functionalMovementName;
    revisions = [];

    public editForm: FormGroup;
    modaal:any;
    description = "";
    IDofRevisionToEdit = null;

    constructor(private fb: FormBuilder,
                private functionalMovementsService: FunctionalMovementsService,
                private activatedRoute: ActivatedRoute,
                private notify : NotificationService,
                private modalService: NgbModal) {
    }

    list(){
        this.activatedRoute.params.subscribe((params: Params) => {
            this.functionalMovementId = params['id'];
            this.functionalMovementsService.retrieve(this.functionalMovementId).subscribe(res => {
                let response = res.json().data;
                this.functionalMovementName = response.name;
                this.revisions = response.functional_movement_revisions;
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
        this.list();
        this.editForm = this.fb.group ( {
            description: [null, Validators.compose ( [ Validators.required ] )],
        });
    }

    openEditModal(content, id){
        for(let i=0;i<this.revisions.length;i++){
            if(this.revisions[i].id == id){
                this.description = this.revisions[i].description;
            }
        }
        this.IDofRevisionToEdit = id;
        this.modaal = this.modalService.open(content);
    }

    onSaveChanges(){
        let obj = {
            description : this.description
        };
        this.functionalMovementsService.updateDescription(obj, this.functionalMovementId, this.IDofRevisionToEdit).subscribe(res => {
            let response =  res.json();
            if(response.success){
                this.notify.successNotify(response.message);
                this.modaal.close();
                this.list();
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
