import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { aggregateBy ,process} from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent ,GridComponent,DataStateChangeEvent, PageSizeItem} from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { AlertService, AuthenticationService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first ,delay} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { InvoiceRow } from './invoice-row';

@Component({
  selector: 'app-stat-account',
  templateUrl: './stat-account.component.html',
  styleUrls: ['./stat-account.component.css']
})
export class StatAccountComponent implements OnInit {
  mobile: string;
  invdate: string;

  contrno: string;
  name: string;
  bperiod: string;
  duedate: string;
  tot_sub_inv: string;
  open_bal: string;
  closed_bal: string;
  statm_no: string;
  split_date: any[];
  from_date: string;
  to_date: string;

  public invoiceData: any;
  public data:InvoiceRow[] ;



  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.mobile = localStorage.getItem('mobile');
   this.invdate = localStorage.getItem('invdate');
  
   this.contrno = localStorage.getItem('contrno');
   this.name = localStorage.getItem('name');

   this.bperiod = localStorage.getItem('bperiod');
  
    this.split_date = this.bperiod.split("|");
    this.from_date = this.split_date[0];
    this.to_date = this.split_date[1];

   this.duedate = localStorage.getItem('duedate');
   this.tot_sub_inv = localStorage.getItem('tot_sub_inv');
   this.open_bal = localStorage.getItem('open_bal');
   this.closed_bal = localStorage.getItem('closed_bal');
   this.statm_no = localStorage.getItem('statm_no');
   this.mobile = localStorage.getItem('mobile');
   this.invdate = localStorage.getItem('invdate');
             
        
     this.authenticationService.invstatement(this.mobile, this.invdate)
           .pipe(first())
        .subscribe(
            det => {
                     
             this.invoiceData = det.data;   

          //   console.log("STATMN",det.data,det.data.length);

             this.data = this.invoiceData ;

            // console.log("DATA_PDF",det.data);
            
                     },
            error => {
              
                this.alertService.error(" Required Data is not found ");
                          
               
            })

  }
         
    
  


}
