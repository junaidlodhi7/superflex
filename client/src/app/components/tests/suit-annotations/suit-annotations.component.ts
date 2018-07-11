import {Component, Input, OnInit, Output} from '@angular/core';
import {TestsService} from "../../../services/tests/tests.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NotificationService} from "../../../services/notifications.services";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {DateFormatter} from "ngx-bootstrap";
import {SuitAnnotationsService} from "../../../services/suit_annotations/suit-annotations.service";
import {environment} from "../../../../environments/environment";


declare class Pusher {
    constructor(apiKey: string, options:any)
    subscribe(channelID: string):{
        bind(event: string, callback):Promise<{}>
    }
    static logToConsole;
}

@Component({
    selector: 'ngbd-modal-content',
    template: `
        <div class="modal-header">
            <h6 class="modal-title text-uppercase">Timeout Confirmation</h6>
            <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-12">
                    <label>Test '{{testDataBeforeExtension['label']}}' is going to finish in {{timeLeft}}. Click "Extend" to extend the duration for 30 minutes.</label>
                </div>
            </div>
            <div class="block mb-3"></div>
        </div>
        <div class="modal-footer">
            <button title="Extend Test" class="btn btn-primary" (click)="extendTestRequest()">Extend</button>
            <button title="Close" type="button" class="btn btn-secondary" (click)="c('Close click')">Close</button>
        </div>`
})
export class ExtendTestModalContent implements OnInit{

    @Input() testDataBeforeExtension;
    @Output() testDataAfterExtension;
    timeLeft = null;

    constructor(public activeModal: NgbActiveModal,
                private testsService: TestsService,
                private notify: NotificationService) {
    }

    ngOnInit(){
        let end = new Date(this.testDataBeforeExtension.end_time).getTime();
        let now = new Date().getTime();
        this.timeLeft = this.convertIntoTime(end - now);
    }

    convertIntoTime(millisec) {

        let seconds = (millisec / 1000);
        let minutes = (millisec / (1000 * 60));
        let hours = (millisec / (1000 * 60 * 60));
        let days = (millisec / (1000 * 60 * 60 * 24));

        if (seconds < 60) {
            return seconds.toFixed(1) + " Sec";
        } else if (minutes < 60) {
            return minutes.toFixed(1) + " Min";
        } else if (hours < 24) {
            return hours.toFixed(1) + " Hrs";
        } else {
            return days.toFixed(1) + " Days"
        }
    }

    extendTestRequest(){
        this.testsService.extendTest(this.testDataBeforeExtension['test_id']).subscribe(res => {
            let response = res.json();
            if(response.success){
                this.notify.successNotify('Test Extended for 30 Minutes.');
                this.testDataAfterExtension = response.data;
                this.activeModal.close();
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

    d(reason){
        this.activeModal.close();
    }
    c(reason){
        this.activeModal.close();
    }
}

@Component({
    selector: 'app-suit-annotations',
    templateUrl: './suit-annotations.component.html',
    styleUrls: ['./suit-annotations.component.scss']
})
export class SuitAnnotationsComponent implements OnInit {

    testID = null;
    testData = {};
    modaal: any;
    newAnnotationForm: FormGroup;
    form: FormGroup;
    format = 'YYYY-MM-DD hh:mm:ss a';
    annotationStart : any = null;
    annotationEnd : any = null;
    testStart = null;
    testEnd = null;
    elapsedTime = null;
    testStatus = '';
    timeType = '';
    user = null;
    suitAnnotations = [];
    testDataFromPusher = {};
    suitAnnotation = {};

    constructor(private testsService: TestsService,
                private activatedRoute: ActivatedRoute,
                private notify: NotificationService,
                private fb: FormBuilder,
                private modalService: NgbModal,
                private authenticationService: AuthenticationService,
                private suitAnnotationsService: SuitAnnotationsService,
                private router: Router) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.testID = params['id'];
            this.getTestDetails();
        });
        this.newAnnotationForm = this.fb.group ( {
            label: [null , Validators.compose ( [ Validators.required ])],
            tags: [null , Validators.compose ( [ Validators.required ])],
            fieldNotes: [null , Validators.compose ( [ Validators.required ])],
            startTime: [null , Validators.compose ( [ Validators.required ])],
            endTime: [null , Validators.compose ( [ Validators.required ])]
        });
        this.form = this.fb.group ( {
            label: ['', Validators.compose ( [ Validators.required ])],
            note: ['', Validators.compose ( [ Validators.required ])],
            startTime: [null],
            stopTime: [null]
        });
        this.getCurrentUser();
        this.pusherFunction();
    }

    pusherFunction(){
        let pusher = new Pusher(environment.pusherAPIKey,{
            cluster: 'us2',
            encrypted: true
        });
        let channel = pusher.subscribe('channel-' + this.user.id);
        channel.bind('test-extend', data => {
            this.testDataFromPusher = data;
            this.openExtendTestModal();
        });
        channel.bind('pusher:subscription_succeeded', data => {
            // console.log(data);
        });
    }

    openExtendTestModal(){
        const modalRef = this.modalService.open(ExtendTestModalContent,{backdrop:"static", keyboard:false});
        modalRef.componentInstance.testDataBeforeExtension = this.testDataFromPusher;
        let end = new Date(this.testDataFromPusher['end_time']).getTime();
        let now = new Date().getTime();
        setTimeout(function () {
            modalRef.close();
        }, end - now);
    }

    getTestDetails(){
        this.testsService.retrieve(this.testID).subscribe(res => {
            let response = res.json();
            if(response.success){
                this.testData = response.data;
                this.suitAnnotations = response.data.suit_annotations;
                this.testStart = response.data.start_time;
                this.testEnd = response.data.end_time;
                this.getElapsedTime();
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

    stopTest(){
        this.testsService.stopTest(this.testID).subscribe(res => {
            let response = res.json();
            if(response.success){
                this.notify.successNotify(response.message);
                this.router.navigate(['/tests/'+this.testID]);
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

    getElapsedTime() {
        let duration = null;
        let now = new Date();
        let s = new Date(this.testStart);
        let e = new Date(this.testEnd);
        if(now.getTime() < e.getTime()){
            this.testStatus = "Running";
            this.timeType = "Elapsed Time";
            duration = now.getTime() - s.getTime();
            this.elapsedTime = this.convertIntoTime(duration);
        }
        else{
            this.testStatus = "Stopped";
            this.timeType = "Test duration";
            duration = e.getTime() - s.getTime();
            this.elapsedTime = this.convertIntoTime(duration);
        }
    }

    convertIntoTime(millisec) {

        let seconds = (millisec / 1000);
        let minutes = (millisec / (1000 * 60));
        let hours = (millisec / (1000 * 60 * 60));
        let days = (millisec / (1000 * 60 * 60 * 24));

        if (seconds < 60) {
            return seconds.toFixed(1) + " Sec";
        } else if (minutes < 60) {
            return minutes.toFixed(1) + " Min";
        } else if (hours < 24) {
            return hours.toFixed(1) + " Hrs";
        } else {
            return days.toFixed(1) + " Days"
        }
    }

    getCurrentUser() {
        this.user = this.authenticationService.getLoggedInUser();
    }

    openNewAnnotationModal(content) {
        this.newAnnotationForm.reset();
        this.annotationStart = null;
        this.annotationEnd = null;
        this.modaal = this.modalService.open(content);
    }

    onSubmit(){
        let t = '{'+this.newAnnotationForm.value.tags+'}';
        let sa = {
            label: this.newAnnotationForm.value.label,
            tags: t,
            notes: this.newAnnotationForm.value.fieldNotes,
            start_timestamp: new Date(this.newAnnotationForm.value.startTime).getTime(),
            stop_timestamp: new Date(this.newAnnotationForm.value.endTime).getTime(),
            created_by : this.user.first_name+' '+this.user.last_name
        };
        this.suitAnnotationsService.create(this.testID , sa).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notify.successNotify(response.message);
                this.modaal.close();
                this.newAnnotationForm.reset();
                this.annotationStart = null;
                this.annotationEnd = null;
                this.getTestDetails();
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

    openEditModal(content,id){
        this.form.reset();
        for(let i=0;i<this.suitAnnotations.length;i++){
            if(this.suitAnnotations[i].id == id){
                this.suitAnnotation = this.suitAnnotations[i];

                let d = new Date (this.suitAnnotation['start_timestamp']);
                this.suitAnnotation['start_time'] = d;
                let de = new DateFormatter().format(d,'YYYY-MM-DD hh:mm:ss a','en');
                this.suitAnnotation['start'] = de;

                d = new Date(this.suitAnnotation['stop_timestamp']);
                this.suitAnnotation['stop_time'] = d;
                de = new DateFormatter().format(d,'YYYY-MM-DD hh:mm:ss a','en');
                this.suitAnnotation['stop'] = de;
            }
        }
        this.modaal = this.modalService.open(content);
    }

    onSaveChanges(suitAnnotationID){
        let sa = {
            label: this.form.value.label || this.suitAnnotation['label'],
            notes: this.form.value.note || this.suitAnnotation['notes'],
            start_timestamp: this.form.value.startTime || this.suitAnnotation['start_timestamp'],
            stop_timestamp: this.form.value.stopTime || this.suitAnnotation['stop_timestamp']
        };
        this.suitAnnotationsService.update(this.testID, suitAnnotationID, sa).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notify.successNotify(response.message);
                this.getTestDetails();
                this.modaal.close();
                this.form.reset();
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
