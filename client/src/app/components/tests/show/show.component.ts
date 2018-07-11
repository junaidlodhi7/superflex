import { Component, OnInit } from '@angular/core';
import {TestsService} from "../../../services/tests/tests.service";
import {ActivatedRoute, Params} from "@angular/router";

import {NotificationService} from "../../../services/notifications.services";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SuitAnnotationsService} from "../../../services/suit_annotations/suit-annotations.service";
import {DateFormatter} from "ngx-bootstrap";
import * as Highcharts from "highcharts";

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

    //current test
    testData = {};
    testDuration = '';
    startTemp = null;
    endTemp = null;
    tType = {};
    tSuitConfig = {};
    suitAnnotations = [];
    users = [];
    suitAnnotation = {};

    //graph variables
    points = [];
    chart: any = null;
    showGraph: boolean = false;
    zoomStack = [];
    graphMin = 0;
    graphMax = 0;

    //data variables
    testId;
    dataIntervals =[];

    modaal: any;
    form: FormGroup;

    testIDModal = 0;
    paginationModal: any = {};
    public pageModal:number = 1;
    public itemsPerPageModal:number = 10;
    public maxSizeModal:number = 3;
    public numPagesModal:number = 100;
    public lengthModal:number = 0;
    format = 'YYYY-MM-DD hh:mm:ss a';

    constructor(private testsService: TestsService,
                private notify: NotificationService,
                private activatedRoute: ActivatedRoute,
                private modalService: NgbModal,
                private fb: FormBuilder,
                private suitAnnotationsService: SuitAnnotationsService) {

    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.testId = params['id'];
            this.getTestDetails();
        });
        this.form = this.fb.group ( {
            label: ['', Validators.compose ( [ Validators.required ])],
            note: ['', Validators.compose ( [ Validators.required ])],
            startTime: [null],
            stopTime: [null]
        });
    }

    getTestDetails(){
        this.testsService.retrieve(this.testId).subscribe(res => {
            let response = res.json();
            if(response.success){
                this.testData = response.data;
                this.suitAnnotations = response.data.suit_annotations;
                this.tType = response.data.test_type;
                this.tSuitConfig = response.data.suit_config;
                this.users = response.data.users;
                this.startTemp = response.data.start_time;
                this.endTemp = response.data.end_time;
                this.getGraphData();
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

    getGraphData(){
        this.testsService.getGraphDataForShow(this.testId).subscribe(res => {
            let response = res.json();
            if(response.success){
                this.points = response.data.points;
                this.showGraph = true;
                let minimum,maximum;
                let pointMin = 0, pointMax = 100;
                if(this.points.length > 0){
                    pointMin = this.points[0].low;
                    pointMax = this.points[0].high;
                    for(let i=0;i<this.points.length;i++){
                        if(this.points[i].low < pointMin){
                            pointMin = this.points[i].low;
                        }
                        if(this.points[i].high > pointMax){
                            pointMax = this.points[i].high;
                        }
                    }
                }
                if(this.startTemp){
                    minimum = this.startTemp;
                    if(pointMin==0){
                        pointMin = new Date(minimum).getTime();
                    }
                }
                else{
                    minimum = pointMin;
                }
                if(this.endTemp){
                    maximum = this.endTemp;
                    if(pointMax==100){
                        pointMax = new Date(maximum).getTime();
                    }
                }
                else{
                    maximum = pointMax;
                }
                this.testDuration = new DateFormatter().format(new Date(minimum), 'hh:mm:ss a','en');
                this.testDuration = this.testDuration + ' - ';
                this.testDuration = this.testDuration + new DateFormatter().format(new Date(maximum), 'hh:mm:ss a','en');

                let series = [
                    {
                        pointWidth: 100,
                        legendIndex: null,
                        name: 'Duration',
                        type: 'columnrange',
                        data: this.points
                    }
                ];
                this.graphMin = pointMin;
                this.graphMax = pointMax;
                this.setGraphOptions(series);
                this.getMotorIntervals(true);
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

    getMotorIntervals(isFirstRequest, start?, end?){
        let data;
        let motor_1_data = [], motor_2_data = [];
        this.testsService.getMotorIntervals(this.testId, isFirstRequest, start, end).subscribe(res => {
            let response = res.json();
            if(response.success){
                data = response.data;
                if(data.length == 0){
                    return;
                }
                let min = parseInt(data[0].y);
                let max = parseInt(data[0].y);
                for(let i=0;i<data.length;i++){
                    let xAxisValue,yAxisValue;
                    yAxisValue = parseInt(data[i].y);
                    if(yAxisValue < min){
                        min = yAxisValue;
                    }
                    if(yAxisValue > max){
                        max = yAxisValue;
                    }
                    xAxisValue = parseInt(data[i].x1);
                    let obj1 = {
                        y: yAxisValue,
                        x: xAxisValue
                    };
                    motor_1_data.push(obj1);
                    xAxisValue = parseInt(data[i].x2);
                    let obj2 = {
                        y: yAxisValue,
                        x: xAxisValue
                    };
                    motor_2_data.push(obj2);
                }
                let series = [
                    {
                        pointWidth: 100,
                        legendIndex: null,
                        name: 'Duration',
                        type: 'columnrange',
                        data: this.points
                    },
                    {
                        name: 'ID_3 MOTOR_1__CURRENT',
                        type: 'line',
                        data: motor_1_data
                    },
                    {
                        name: 'ID_3 MOTOR_2__CURRENT',
                        type: 'line',
                        data: motor_2_data
                    }
                ];
                this.graphMin = min < this.graphMin? min : this.graphMin;
                this.graphMax = max > this.graphMax? max : this.graphMax;
                this.setGraphOptions(series);
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


    setGraphOptions(series){
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        this.chart = Highcharts.chart('chartDiv',{
            chart: {
                inverted: true,
                height: 550,
            },
            title: {
                text: this.testData['label']
            },
            subtitle: {
                text: 'Duration: '+ this.testDuration
            },
            credits: {
                enabled: false
            },
            xAxis: {
                labels: {
                    format: '{value}',
                },
                reversed: false
            },
            yAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    second: '%I:%M:%S %p',
                    millisecond : '%I:%M:%S.%L %p',
                    minute : '%I:%M %p',
                    hour: '%I %p'
                },
                min: this.graphMin,
                max: this.graphMax
            },
            plotOptions:{
                series:{
                    turboThreshold:20000//set it to a larger threshold, it is by default to 1000
                },
                line: {
                    marker: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                shared:false,
                crosshairs: [true,true],
                formatter: function () {
                    let tootltip = null;
                    if(typeof this.key == 'string'){
                        let a = new DateFormatter().format(new Date(this.point.low), 'hh:mm:ss a','en');
                        let b = new DateFormatter().format(new Date(this.point.high), 'hh:mm:ss a','en');
                        let str = a+' - '+b;
                        tootltip = '<span class="text-capitalize">'+this.point.name+'</span><br/>'+
                            '<table><tr><td>'+this.series.name +': </td>' +
                            '<td style="text-align: right"><b>'+str+'</b></td></tr></table>';
                    }
                    else{
                        let a = this.x;
                        let b = new DateFormatter().format(new Date(this.y), 'hh:mm:ss a','en');
                        tootltip = '<span class="text-capitalize">'+this.series.name+'</span><br/>'+
                            '<table><tr style="text-align: right"><td>'+'Value: <b>'+a+'</b></td><br/>' +
                            '<td>'+'Time: <b>'+b+'</b></td></tr></table>';
                    }
                    return tootltip;
                },
            },
            legend: {
                enabled: true
            },
            series: series
        });
    }

    graphZoomIn(){
        let min = this.chart.yAxis[0].min;
        let max = this.chart.yAxis[0].max;
        let diff = max - min;
        diff = (diff*10)/100;
        let lastDiff = this.zoomStack.pop();
        if(diff!=lastDiff){
            if(lastDiff){
                this.zoomStack.push(lastDiff);
            }
            this.zoomStack.push(diff);
            min = min+diff;
            max = max-diff;
            this.chart.yAxis[0].setExtremes(min, max);
            this.getMotorIntervals(false,min,max);
        }
    }

    graphZoomOut() {
        let lastDiff = this.zoomStack.pop();
        if(lastDiff){
            let min = this.chart.yAxis[0].min;
            let max = this.chart.yAxis[0].max;
            min = min-lastDiff;
            max = max+lastDiff;
            this.chart.yAxis[0].setExtremes(Math.max(min, this.graphMin), Math.min(max, this.graphMax));
            this.getMotorIntervals(false,Math.max(min, this.graphMin),Math.min(max, this.graphMax));
        }
        else{
            this.chart.yAxis[0].setExtremes(this.graphMin, this.graphMax);
            this.getMotorIntervals(false,this.graphMin,this.graphMax);
        }
    }

    graphZoomOutAll() {
        this.zoomStack = [];
        this.chart.yAxis[0].setExtremes(this.graphMin, this.graphMax);
        this.getMotorIntervals(false,this.graphMin,this.graphMax);
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
        this.suitAnnotationsService.update(this.testId, suitAnnotationID, sa).subscribe(res => {
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

    openDownloadModal(content,id) {
        this.testIDModal = id;
        this.getIntervals(1);
        this.pageModal = 1;
        this.modaal = this.modalService.open(content);
    }

    getIntervals(page) {
        this.testsService.retrieveIntervals(this.testIDModal, page).subscribe(res => {
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

    public onChangeTableModal(page:any = {page: this.pageModal, itemsPerPage: this.itemsPerPageModal}):any {
        this.getIntervals(page.page);
    }

}
