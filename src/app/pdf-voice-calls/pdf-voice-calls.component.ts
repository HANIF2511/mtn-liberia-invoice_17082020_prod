import { Component, OnInit ,Input} from '@angular/core';
import { InvoiceRow_voice } from '../pdf-comp/invoice-row';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { aggregateBy ,process} from '@progress/kendo-data-query';

@Component({
  selector: 'app-pdf-voice-calls',
  templateUrl: './pdf-voice-calls.component.html',
  styleUrls: ['./pdf-voice-calls.component.css']
})
export class PdfVoiceCallsComponent implements OnInit {
  load2: boolean;
  mobile: string;
  bperiod: string;
  split_date: any [];
  from_date: string;
  to_date: string;



 
  constructor() { 
    this.allData = this.allData.bind(this);
  }

  public group: any[] = [{
    field: 'DATE'
}];

  ngOnInit(): void {
    this.mobile = localStorage.getItem('mobile');
    this.bperiod = localStorage.getItem('bperiod');
    this.split_date = this.bperiod.split("|");
    this.from_date = this.split_date[0];
    this.to_date = this.split_date[1];
  }


  public allData(): ExcelExportData {
    const result: ExcelExportData =  {
        data: process(this.data, { group: this.group, sort: [{ field: 'DATE', dir: 'asc' }] }).data,
        group: this.group
    };

    return result;
}


  @Input()
  public data: InvoiceRow_voice[] = [];
}
