import { Component, OnInit ,Input} from '@angular/core';
import { aggregateBy ,process} from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { AlertService, AuthenticationService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { User, CurrUser,inv,invsummary,componentConfigDef} from '../_models';






declare function getParamConfig_data():any;
declare function setParamConfig(var1,var2);


@Component({
  selector: 'excel-export',
  templateUrl: './excel-export.component.html',
  styleUrls: ['./excel-export.component.css']
})


export class ExcelExportComponent implements OnInit {
  
  mobile: string;
  invdate: string;
  iv_no: string;
  dataf: string;
  load2: boolean;
  

  public invdetail: any[];
  
  public xx: string;

  public group: any[] = [{
    field: 'DATE'
}];



  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private ngxXml2jsonService: NgxXml2jsonService
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
   
    
      this.load_data();   
   
  }

public load_data(){
  var startdate = new Date();

  console.log("data:STARTDATE",startdate);

  this.mobile  = localStorage.getItem('mobile');
  this.invdate = localStorage.getItem('invdate');
  this.iv_no = localStorage.getItem('iv_no');
         
    

      
        this.load2 = true;
     this.authenticationService.invdetdata(this.iv_no, this.invdate)
           .pipe(first())
        .subscribe(
            det => {
             this.load2 = false;
             this.invdetail = det.data;  
            var enddate = new Date();
            console.log("data:ENDDATE",enddate);
            },
            error => {
              this.load2 = false;
                this.alertService.error(" Data is not available for some tabs ");
                
            })
   
           

        
 
}

  
}
