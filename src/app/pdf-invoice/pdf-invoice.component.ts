import { Component, OnInit ,Input} from '@angular/core';
import { InvoiceRow } from '../pdf-comp/invoice-row';
import { Printer } from '../print.directive';

@Component({
  selector: 'app-pdf-invoice',
  templateUrl: './pdf-invoice.component.html',
  styleUrls: ['./pdf-invoice.component.css']
})
export class PdfInvoiceComponent implements OnInit {
  public position: 'top' | 'bottom' | 'both' = 'top';
  public name: string;
  public amount: string;
  public iv_no: string;
  public inv_date: string;
  public mobile: string;
  public duedate: string;
  public contrno: string;

  

  constructor(
   
  ) { }

  ngOnInit(): void {

    this.name =localStorage.getItem('name');
    var nnn = this.name;

    var n = nnn.search("~");

if (n == 0)	{
var array = nnn.split("~");
this.name = array[1];

}
    this.amount = localStorage.getItem('amount');
    this.inv_date = localStorage.getItem('invdate');
    this.mobile = localStorage.getItem('mobile');
    this.duedate = localStorage.getItem('duedate');
    this.iv_no = localStorage.getItem('iv_no');
    this.contrno = localStorage.getItem('contrno');
    
  }

  onClick()
  {
    window.print();
  }

  @Input()
  public data: InvoiceRow[] = [];

  

}
