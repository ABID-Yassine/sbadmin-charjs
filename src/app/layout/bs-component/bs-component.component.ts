import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import {HttpClient, HttpHeaders} from '@angular/common/http';


const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set( 'Accept', 'application/json' ).set('X-CustomHeader', 'custom header value');
@Component({
    selector: 'app-bs-component',
    templateUrl: './bs-component.component.html',
    styleUrls: ['./bs-component.component.scss']
})
export class BsComponentComponent implements OnInit {
    ngOnInit(): void {
    }

    closeResult: string;
    constructor(private http: HttpClient, private modalService: NgbModal) { }

    getDeps() {

        return new Promise(resolve => {
            this.http.get('http://34.253.70.101:8080/gameSession' , {headers}).subscribe(data => {
                resolve(data);
            }, err => {
                console.log(err);
            });
        });


    }

    open(content) {
        this.modalService.open(content, { size: 'lg', windowClass: 'modal-adaptive' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }


    // lineChart
    public lineChartData:Array<any> = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartType:string = 'line';
    public pieChartType:string = 'pie';

    // Pie
    public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    public pieChartData:number[] = [300, 500, 100];

    // public randomizeType():void {
    //     this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    //     this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
    // }

    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

}
