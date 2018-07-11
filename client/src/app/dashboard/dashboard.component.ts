import {Component, OnInit} from '@angular/core';
import * as Highcharts from "highcharts";
import * as Highstock from "highcharts/highstock";

import {NotificationService} from "../services/notifications.services";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {SuitsService} from "../services/suits/suits.service";
import {UsersTestService} from "../services/users_test/users-test.service";
import {DateFormatter} from "ngx-bootstrap";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{

    totalUsers = 0;
    suitUsers = 0;
    suitUserTestsCount = 0;
    months = [];
    points = [];
    data = [];
    newChart: any = null;
    chart = {};

    constructor(private  notify : NotificationService,
                private authenticationService:AuthenticationService,
                private usersTestService:UsersTestService,
                private suitsService:SuitsService) {

    }

    ngOnInit(): void {
        if(this.authenticationService.getJustLoggedInStatus()){
            this.notify.successNotify('Login successful!');
            this.authenticationService.setJustLoggedInStatus(false);
        }
        // this.getGraphPoints();
        // let d = new DateFormatter().format(new Date('2016-08-01T00:00:00.000Z'), 'MMM YYYY','en');
        // this.getTotalUsers();
        // this.getUserCount(6);
        // this.getUserTestsCount(6);
        // this.getGraphData();

    }

    // getGraphPoints(start?, end?){
    //     // this.setGraph(this.data);
    //     this.usersTestService.getGraphPoints(start,end).subscribe(res => {
    //         this.data = res.json().data;
    //         console.log(this.data);
    //         this.setGraph(this.data);
    //     },err=>{
    //         console.log("Error:");
    //         console.log(err);
    //         this.notify.errorNotify('Couldn\'t load points.')
    //     });
    // }

    setGraph(data){
        let obj = this;
        this.newChart = Highstock.stockChart('chartDiv', {
            chart: {
                alignTicks: false,
                zoomType: 'x'
            },
            credits: {
                enabled: false
            },
            rangeSelector: {
                selected: 1
            },
            title: {
                text: 'Suit Annotations'
            },
            scrollbar: {
                liveRedraw: false
            },
            // xAxis: {
            //     events: {
            //         setExtremes: function getGraphPoints2(e){
            //             console.log(e.dataMin);
            //             obj.getGraphPoints(e.dataMin,e.dataMax);
            //         }
            //     },
            // },
            plotOptions:{
                series:{
                    turboThreshold:2000
                }
            },
            series: [{
                type: 'column',
                name: 'Duration',
                data: data,
                // dataGrouping: {
                //     units: [[
                //         'week', // unit name
                //         [1] // allowed multiples
                //     ], [
                //         'month',
                //         [1, 2, 3, 4, 6]
                //     ]]
                // }
            }]
        });

        // this.newChart = Highstock.stockChart('chartDiv', {
        //     chart: {
        //         type: 'candlestick',
        //         zoomType: 'x'
        //     },
        //     navigator: {
        //         enabled: false,
        //         adaptToUpdatedData: true,
        //         series: {
        //             data: data
        //         }
        //     },
        //     scrollbar: {
        //         liveRedraw: true
        //     },
        //     title: {
        //         text: 'Annotations'
        //     },
        //     subtitle: {
        //         text: 'Temp data'
        //     },
        //     rangeSelector: {
        //         buttons: [{
        //             type: 'hour',
        //             count: 1,
        //             text: '1h'
        //         }, {
        //             type: 'day',
        //             count: 1,
        //             text: '1d'
        //         }, {
        //             type: 'month',
        //             count: 1,
        //             text: '1m'
        //         }, {
        //             type: 'year',
        //             count: 1,
        //             text: '1y'
        //         }, {
        //             type: 'all',
        //             text: 'All'
        //         }],
        //         inputEnabled: true, // it supports only days
        //         selected: 1 // all
        //     },
        //     plotOptions:{
        //         series:{
        //             turboThreshold:500//set it to a larger threshold, it is by default to 1000
        //         }
        //     },
        //     xAxis: {
        //         events: {
        //             afterSetExtremes: function getGraphPoints2(e){
        //                 console.log(e.dataMin);
        //                 obj.getGraphPoints(e.dataMin,e.dataMax);
        //             }
        //         },
        //     },
        //     yAxis: {
        //         floor: 0
        //     },
        //     series: [{
        //         data: data,
        //         dataGrouping: {
        //             enabled: false
        //         }
        //     }]
        // });
    }

    // afterSetExtremes(e){
    //     this.getGraphPoints(e.dateMin, e.dateMax);
    // }

    getTotalUsers(){
        this.usersTestService.getTotalUsers().subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.totalUsers = response.data.count;
            }
        }
        // , err => {
        //     err = err.json();
        //     if(err.errors) {
        //         for(let i=0;i<err.errors.length;i++){
        //             this.notify.errorNotify(err.errors[i].message);
        //         }
        //     }
        //     else{
        //         this.notify.errorNotify("Connectivity issue!");
        //     }
        // }
        );
    }

    getUserCount(suitID){
        this.suitsService.getUserCount(suitID).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.suitUsers = response.data.count;
            }
        }
        // , err => {
        //     err = err.json();
        //     if(err.errors) {
        //         for(let i=0;i<err.errors.length;i++){
        //             this.notify.errorNotify(err.errors[i].message);
        //         }
        //     }
        //     else{
        //         this.notify.errorNotify("Connectivity issue!");
        //     }
        // }
        );
    }

    getUserTestsCount(suitID){
        this.suitsService.getUserTestsCount(suitID).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.suitUserTestsCount = response.data.count;
            }
        }
        // , err => {
        //     err = err.json();
        //     if(err.errors) {
        //         for(let i=0;i<err.errors.length;i++){
        //             this.notify.errorNotify(err.errors[i].message);
        //         }
        //     }
        //     else{
        //         this.notify.errorNotify("Connectivity issue!");
        //     }
        // }
        );
    }

    getGraphData(){
        this.usersTestService.getGraphData().subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                let arr = response.data;
                for(let i=0;i<arr.length;i++){
                    this.points.push(parseInt(arr[i].count));
                    let d = new DateFormatter().format(new Date(arr[i].date_trunc), 'MMM YYYY','en');
                    this.months.push(d);
                }
                this.chart = Highcharts.chart('chartDiv',{
                    chart: {
                        type: 'column',
                        height: 550
                    },
                    title: {
                        text: 'User Tests By Month'
                    },
                    subtitle: {
                        // text: 'Source: WorldClimate.com'
                    },
                    xAxis: {
                        categories: this.months
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'User Tests'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                        footerFormat: '</table>',
                        useHTML: true
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0
                        }
                    },
                    series: [{
                        name: 'Tests',
                        data: this.points

                    }]
                });
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
