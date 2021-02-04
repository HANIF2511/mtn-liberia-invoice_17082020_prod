import { Component, OnInit ,Input} from '@angular/core';
import { InvoiceRow } from '../pdf-comp/invoice-row';

@Component({
  selector: 'app-stat-pdf-account',
  templateUrl: './stat-pdf-account.component.html',
  styleUrls: ['./stat-pdf-account.component.css']
})
export class StatPdfAccountComponent implements OnInit {
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

  constructor() { 
    
  }

  ngOnInit(): void {
    this.mobile = localStorage.getItem('mobile');
   
   this.contrno = localStorage.getItem('contrno');
   this.name = localStorage.getItem('name');
   var nnn = this.name;

    var n = nnn.search("~");

if (n == 0)	{
var array = nnn.split("~");
this.name = array[1];

}

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
  }


  @Input()
  public data: InvoiceRow[] = [];

}
