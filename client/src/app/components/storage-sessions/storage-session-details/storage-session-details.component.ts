import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {StorageSessionService} from "../../../services/storage_sessions/storage-session.service";
import {NotificationService} from "../../../services/notifications.services";
import {DateFormatter} from "ngx-bootstrap";
import * as Highstock from "highcharts/highstock";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductDataService} from "../../../services/product_data/product-data.service";


@Component({
    selector: 'app-storage-session-details',
    templateUrl: './storage-session-details.component.html',
    styleUrls: ['./storage-session-details.component.scss']
})
export class StorageSessionDetailsComponent implements OnInit {


    //filter variables
    form: FormGroup;
    multiple: boolean = false;
    canClearSelect: boolean = true;

    boardOptions = [];
    boardSelectValue: string; // Array of strings for multi select, string for single select.
    boardPlaceholderText: string = 'Select Board';

    groupOptions = [];
    groupSelectValue: string; // Array of strings for multi select, string for single select.
    groupPlaceholderText: string = 'Select Group';

    streamTypeOptions = [];
    streamOriginals = [];
    streamTypeSelectValue: string; // Array of strings for multi select, string for single select.
    streamTypePlaceholderText: string = 'Select Stream';

    //table variables
    filters: any = [];
    index =0;

    //data variables
    public storageSessionId = null;
    public storageSession : any = {};
    public product : any = {};
    public user : any = {};
    public product_config_revision : any = {};

    //graph variables
    newChart: any = null;
    series : any = [];

    //color variables
    colors: any = [];

    constructor(private activatedRoute: ActivatedRoute,
                private storageSessionService:StorageSessionService,
                private notify:NotificationService,
                private fb: FormBuilder,
                private productDataService: ProductDataService) {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.storageSessionId = params['id'];
            this.getStorageSessionDetials();
        });
    }

    ngOnInit() {
        this.getBoards();
        this.form = this.fb.group({
            board: [null, Validators.compose ( [ Validators.required ])],
            group: [null,  Validators.compose ( [ Validators.required ])],
            stream: [null, Validators.compose ( [ Validators.required ])]
        });

    }

    getBoards(){
        this.productDataService.getBoards().subscribe(res => {
            let response = res.json();
            if(response.success){
                this.boardOptions = response.data;
                let ops = [];
                this.boardOptions.forEach(function(i){
                    ops.push({label: i.category, value: i.category});
                });
                this.boardOptions = ops;
                this.boardOptions.length > 0 ? this.getGroups(this.boardOptions[0].label) : this.getGroups('');
            }
            else{
                this.notify.errorNotify(response.message);
            }
        },err => {
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

    getGroups(board){
        this.productDataService.getGroups(board).subscribe(res => {
            let response = res.json();
            if(response.success){
                this.groupOptions = response.data;
                let ops =  [];
                this.groupOptions.forEach(function(i){
                    ops.push({label: i.group, value: i.group});
                });
                this.groupOptions = ops;
                this.groupOptions.length > 0 ?
                    this.getStreams(board, this.groupSelectValue || this.groupOptions[0].label) :
                    this.getStreams(board, this.groupSelectValue || '');
            }
            else{
                this.notify.errorNotify(response.message);
            }
        },err => {
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

    getStreams(board, group){
        this.productDataService.getStreams(board, group).subscribe(res => {
            let response = res.json();
            if(response.success){
                this.streamOriginals = response.data;
                if(this.streamOriginals.length > 0){
                    let obj = this.streamOriginals[0].labels;
                    this.streamTypeOptions = obj.split(',');
                }
                let ops =  [];
                this.streamTypeOptions.forEach(function(i){
                    ops.push({label: i, value: i});
                });
                this.streamTypeOptions = ops;
            }
            else{
                this.notify.errorNotify(response.message);
            }
        },err => {
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

    getStorageSessionDetials(){
        this.storageSessionService.retrieve(this.storageSessionId).subscribe(res => {
            let response = res.json();
            if(response.success){
                this.storageSession = response.data;
                if(this.storageSession['ts_start']){
                    let a = this.storageSession['ts_start'];
                    this.storageSession['startDate'] = new Date(parseInt(a));
                    this.storageSession['start'] = new DateFormatter().format(this.storageSession['startDate'],'YYYY-MM-DD hh:mm:ss A','en');
                }
                if(this.storageSession['ts_end']){
                    let b = this.storageSession['ts_end'];
                    this.storageSession['endDate'] = new Date(parseInt(b));
                    this.storageSession['end'] = new DateFormatter().format(this.storageSession['endDate'],'YYYY-MM-DD hh:mm:ss A','en');
                }
                if(response.data.product_config_revision) {
                    this.product_config_revision = response.data.product_config_revision;
                }
                if(response.data.product) {
                    this.product = response.data.product;
                }
                if(response.data.user) {
                    this.user = response.data.user;
                }
                // this.getGraphPoints();
                this.setGraph();
            }
            else{
                this.notify.errorNotify(response.message);
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

    getGraphPoints(filter){
        let len = Highstock.charts.length;
        let chart = Highstock.charts[len-1];
        chart.showLoading('Loading data from server...');
        this.storageSessionService.getGraphPoints(this.storageSessionId, filter).subscribe(res => {
            let response = res.json();
            if(response.success){
                let graphData = response.data;
                this.parseStreams(graphData);
                chart.hideLoading();
                this.setGraph();
            }
            else{
                this.notify.errorNotify(response.message);
            }
        },err=>{
            console.log("Error:");
            console.log(err);
            this.notify.errorNotify('Could not load points.')
        });
    }

    parseStreams(graphData) {
        let obj: any = {};
        let res = graphData.result;
        for (let j = 0; j < res.length; j++) {
            res[j].y = parseFloat(res[j].y.replace(/'/g, ''));
        }
        obj.name = graphData.key;
        obj.data = res;
        obj.color = graphData.color;
        obj.type = 'column';
        obj.dataGrouping = {
            approximation: function (data) {
                let average = 0;
                for(let i=0;i<data.length;i++){
                    average = average+data[i];
                }
                average = average / data.length;
                return average;
            }
        };

        this.series.push(obj);
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        if(color=='#FFFFFF'){
            color = this.getRandomColor();
        }
        for(let i = 0; i < this.colors.length ; i++){
            if(color == this.colors[i]){
                color = this.getRandomColor();
            }
        }
        return color;
    }

    setGraph() {
        let obj = this;
        this.newChart = Highstock.stockChart('chartDiv', {
            chart: {
                alignTicks: false,
                zoomType: 'x',
                height: 550,
            },
            credits: {
                enabled: false
            },
            rangeSelector: {
                buttons: [
                {
                    type: 'second',
                    count: 1,
                    text: '1s'
                }, {
                    type: 'minute',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'hour',
                    count: 1,
                    text: '1h'
                }, {
                    type: 'ytd',
                    text: 'YTD'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                selected: 1
            },
            // title: {
            //     text: 'Storage Sessions'
            // },
            scrollbar: {
                liveRedraw: true
            },
            // xAxis: {
            //     events: {
            //         setExtremes: function getGraphPoints2(e){
            //             console.log(e.dataMin);
            //             obj.getGraphPoints(e.dataMin,e.dataMax);
            //         }
            //     },
            // },
            plotOptions: {
                series: {
                    turboThreshold: 80000
                }
            },
            series: this.series
        });
    }

    addFilter(){
        let color = this.getRandomColor();
        //to find the index of selected stream
        let selectedStream = this.form.value.stream;
        let selectedStreamIndex = 1;
        for(let i=0; i< this.streamTypeOptions.length; i++){
            if(this.streamTypeOptions[i].value == selectedStream){
                selectedStreamIndex = i+1;
                break;
            }
        }
        let obj = {
            category: this.form.value.board,
            group: this.form.value.group,
            color: color,
            stream: {
                labels: this.streamOriginals[0].labels,
                index: selectedStreamIndex,
                key: selectedStream
            },
            index: this.index
        };

        for(let i=0; i<this.filters.length; i++){
            let f = this.filters[i];
            if(obj.category==f.category && obj.group==f.group && obj.stream.key==f.stream.key){
                this.notify.infoNotify("This stream is already added");
                return;
            }
        }

        this.colors.push(color);
        this.index++;
        this.filters.push(obj);
        this.getGraphPoints(obj);
    }

    RemoveFilter(index){
        this.index--;
        this.series.splice(index,1);
        this.setGraph();
        this.filters.splice(index, 1);
        for(let i=0; i< this.filters.length; i++){
            this.filters[i].index = i;
        }
    }

    onBoardSelect(item) {
        this.getGroups(item.value);
    }
    onBoardDeselect(item) {}
    onGroupSelect(item) {
        this.getStreams(this.boardSelectValue, item.value);
    }
    onGroupDeselect(item) {}
    onStreamSelect(item) {}
    onStreamDeselect(item) {}
}
