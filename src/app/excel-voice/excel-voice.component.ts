import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { aggregateBy ,process} from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent ,GridComponent,DataStateChangeEvent, PageSizeItem} from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { AlertService, AuthenticationService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first ,delay} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { componentConfigDef} from '../_models';


@Component({
  selector: 'excel-voice',
  templateUrl: './excel-voice.component.html',
  styleUrls: ['./excel-voice.component.css']
  
})

export class ExcelVoiceComponent implements OnInit {
  public grid: GridComponent;
  public view: Observable<GridDataResult>;

  
  load2: boolean;
   
  pagez: number=600;
  mobile: string;
  iv_no: string;
  invdate: string;
  voicef: string;
  obj: object[];
  viewloading: boolean;
  voice_ddd: string;
  
  
  


  public invdetail: any[];

  public paramConfig:  {
        Name: "Voice"
  };

  public group: any[] = [{
    field: 'DATE'
}];



  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    
    this.allData = this.allData.bind(this);
   }

   public allData(): ExcelExportData {
    const result: ExcelExportData =  {
        data: process(this.invdetail, { group: this.group, sort: [{ field: 'DATE', dir: 'asc' }] }).data,
        group: this.group
    };

    return result;
}


  ngOnInit(): void {
          
    
   this.mobile = localStorage.getItem('mobile');
   this.invdate = localStorage.getItem('invdate');
   this.iv_no = localStorage.getItem('iv_no');
   this.load_data();   
   
  }
  public load_data() {
    var startdate = new Date();

    console.log("voice:STARTDATE", startdate);

    console.log("Inside voice calls.......");

    this.load2 = true;
    localStorage.setItem('disable_voice','Y');
    this.authenticationService.invdetvoice(this.iv_no, this.invdate)
        .pipe(first())
        .subscribe(
            det => {
                this.load2 = false;
                console.log("voice:pre invdetail", new Date());
                this.invdetail = det.data;
                console.log("voice:Finished", new Date());
                
            },
            error => {
                this.load2 = false;
                
              //  this.alertService.error(" Data is not available for some tabs ");
              localStorage.setItem('disable_voice','N');

            })
this.voice_ddd = localStorage.getItem('disable_voice');
console.log("VVVVV",this.voice_ddd);
    }

    
  
}
