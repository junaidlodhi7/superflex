import { Component, OnInit } from '@angular/core';
import {TestsService} from "../../services/tests/tests.service";
import {NotificationService} from "../../services/notifications.services";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";

import {SuitsService} from "../../services/suits/suits.service";
import {TestTypesService} from "../../services/test_types/test-types.service";
import {UsersService} from "../../services/users/users.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-tests',
    templateUrl: `./tests.component.html`,
    styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

    userOptions = [];
    userSelectValue: Array<number>; // Array of strings for multi select, string for single select.
    multiple: boolean = false;
    userPlaceholderText: string = 'Search by User';
    canClearSelect: boolean = true;

    suitOptions = [];
    suitSelectValue: Array<number>; // Array of strings for multi select, string for single select.
    suitPlaceholderText: string = 'Search by Suit';

    testTypeOptions = [];
    testTypeSelectValue: Array<number>; // Array of strings for multi select, string for single select.
    testTypePlaceholderText: string = 'Search by Test Type';

    tests: any = [];
    duration = null;
    pagination: any = {};
    public page: number = 1;
    public itemsPerPage: number = 10;
    public maxSize: number = 3;
    public numPages: number = 100;
    public length: number = 0;

    testID;
    modaal: any;
    dataIntervals = [];
    paginationModal: any = {};
    public pageModal: number = 1;
    public itemsPerPageModal: number = 10;
    public maxSizeModal: number = 3;
    public numPagesModal: number = 100;
    public lengthModal: number = 0;

    form: FormGroup;
    test = {};
    flag = false;
    // currentTypeID: number = 1;
    // currentSuitID : number = 1;
    testTypes = [];
    suitTypes = [];
    users = [];

    newTestForm: FormGroup;
    format = 'YYYY-MM-DD hh:mm:ss a';

    constructor(private fb: FormBuilder,
                private testsService: TestsService,
                private notify: NotificationService,
                private modalService: NgbModal,
                private suitsService: SuitsService,
                private testTypesService: TestTypesService,
                private usersService: UsersService,
                private router: Router) {

    }

    public ngOnInit(): void {
        this.getTestResults(this.page);
        this.getUsers();
        this.getTestTypes();
        this.getSuits();
        this.form = this.fb.group({
            user: [null],
            test: [null],
            suit: [null]
        });

        this.userSelectValue = [];
        this.form = new FormGroup({});
        this.form.addControl('user', new FormControl([]));
        this.form.addControl('test', new FormControl([]));
        this.form.addControl('suit', new FormControl([]));

        this.newTestForm = this.fb.group ( {
            label: [null , Validators.compose ( [ Validators.required ])],
            testDate: [null , Validators.compose ( [ Validators.required ])],
            fieldNotes: [null , Validators.compose ( [ Validators.required ])],
            suitID: [null , Validators.compose ( [ Validators.required ])],
            testTypeID: [null , Validators.compose ( [ Validators.required ])],
            userID: [null , Validators.compose ( [ Validators.required ])],
            duration: [null, Validators.compose ( [ Validators.required ])]
        });

    }

    getTestResults(page) {
        let q = '';
        q = "page=" + page + '&';
        if (this.flag) {
            if (this.form.value.user)
                q += "user=" + this.form.value.user + '&';
            if (this.form.value.test)
                q += "type=" + this.form.value.test + '&';
            if (this.form.value.suit)
                q += "suit=" + this.form.value.suit + '&';
        }
        q = q.substr(0, q.length - 1);
        this.testsService.list(q).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.tests = response.data;
                for(let i=0;i<this.tests.length;i++){
                    let du: any;
                    if(this.tests[i].end_time && this.tests[i].start_time){
                        let d1 = new Date(this.tests[i].end_time);
                        let stop = Date.UTC(d1.getFullYear(),d1.getMonth()+1,d1.getDate(),d1.getHours(),d1.getMinutes(),d1.getSeconds(),d1.getMilliseconds());
                        let d2 = new Date(this.tests[i].start_time);
                        let start = Date.UTC(d2.getFullYear(),d2.getMonth()+1,d2.getDate(),d2.getHours(),d2.getMinutes(),d2.getSeconds(),d2.getMilliseconds());
                        du = this.timeConversion(stop - start);
                    }
                    else{
                        du = 'Null';
                    }
                    this.tests[i]['duration'] = du;
                }
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

    timeConversion(millisec) {

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

    getUsers() {
        this.usersService.list('false').subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.users = response.data;
                let ops = [];
                this.users.forEach(function (user) {
                    let op = {value: user.id , label: user.first_name};
                    ops.push(op);
                });
                this.userOptions = ops;
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

    getTestTypes() {
        this.testTypesService.list('false').subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.testTypes = response.data;
                let ops = [];
                this.testTypes.forEach(function (testType) {
                    let op = {value: testType.id , label: testType.label};
                    ops.push(op);
                });
                this.testTypeOptions = ops;
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

    getSuits() {
        this.suitsService.list('false').subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.suitTypes = response.data;
                let ops = [];
                this.suitTypes.forEach(function(suit){
                    let op = {value: suit.id , label: suit.label};
                    ops.push(op);
                });
                this.suitOptions = ops;
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

    public onChangeTable(page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
        this.getTestResults(page.page);
    }

    openDownloadModal(content, id) {
        this.testID = id;
        this.getIntervals(1);
        this.pageModal = 1;
        this.modaal = this.modalService.open(content);
    }

    getIntervals(page) {
        this.testsService.retrieveIntervals(this.testID, page).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.dataIntervals = response.data;
                this.paginationModal = response.pagination;
                this.pageModal = this.paginationModal.current;
                this.itemsPerPageModal = this.paginationModal.per_page;
                this.numPagesModal = this.paginationModal.pages;
                this.lengthModal = this.paginationModal.total;
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

    public onChangeTableModal(page: any = {page: this.pageModal, itemsPerPage: this.itemsPerPageModal}): any {
        this.getIntervals(page.page);
    }


    onSearch(item) {
        this.flag = true;
        this.getTestResults(1);
    }

    openNewTestModal(content) {
        this.newTestForm.reset();
        this.modaal = this.modalService.open(content);
    }

    onSubmit(){
        let test = {
            label: this.newTestForm.value.label,
            test_date: this.newTestForm.value.testDate,
            field_notes : this.newTestForm.value.fieldNotes,
            suit_id: this.newTestForm.value.suitID,
            test_type_id : this.newTestForm.value.testTypeID,
            user_id: this.newTestForm.value.userID,
            duration: this.newTestForm.value.duration*60*1000
        };
        this.testsService.createTest(test).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notify.successNotify(response.message);
                this.modaal.close();
                this.form.reset();
                this.router.navigate(['/tests/'+response.data.id+'/suitannotations']);
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