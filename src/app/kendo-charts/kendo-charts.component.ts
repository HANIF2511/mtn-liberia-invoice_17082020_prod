import { Component, OnInit, Input } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { AlertService, AuthenticationService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { series_chart} from '../_models';
import { componentConfigDef} from '../_models';

@Component({
  selector: 'kendo-charts',
  templateUrl: './kendo-charts.component.html',
  styleUrls: ['./kendo-charts.component.css']
})


export class KendoChartsComponent implements OnInit {
  load2: boolean;
  public mobile: string;
  public iv_no: string;
  public bperiod: string;
  loading = false;
  submitted = false;  
  invdate: string;
  public series: any[];
  public split_date: any[];
  public from_date: string;
  public to_date: string;
  public serarray: string;
  public obj: object;
  public categories: string[] = ['Voice Calls', 'Data Calls', 'SMS'];
  chrtf: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.mobile = localStorage.getItem('mobile');
    this.bperiod = localStorage.getItem('bperiod');
    this.split_date = this.bperiod.split("|");
    this.from_date = this.split_date[0];
    this.to_date = this.split_date[1];
   }

  ngOnInit(): void {
    this.submitted = true;
       
     this.loading = true;
    this.mobile = localStorage.getItem('mobile');
    this.invdate = localStorage.getItem('invdate');
    this.iv_no = localStorage.getItem('iv_no');
      console.log(this.mobile,this.invdate);
      this.load_data();   
   
  }
  public load_data()
  {     
  
  var startdate = new Date();

  console.log("charts:STARTDATE",startdate);
  this.chrtf =  localStorage.getItem('chartflag');
  this.load2 = true;
    console.log("Inside chart........",this.chrtf);

  


  
    
  this.authenticationService.invchart(this.iv_no, this.invdate)
        .pipe(first())
     .subscribe(
         det => {
          this.load2 = false;
        
      var allRowschart=[];
          this.load2 = false;
      var     querychart = 
      {
      "name": "Voice Calls",
      "data": [det.data[0],0,0]
                              
      }
      
      allRowschart.push(querychart);
      
      querychart = 
      {
      "name": "Data Calls",
      "data": [0,det.data[1],0]
                            
      }
      allRowschart.push(querychart);
      
      querychart = 
      {
      "name": "SMS",
      "data": [0,0,det.data[2]]
                            
      }
      allRowschart.push(querychart);
      
      
        //  this.series = det.data;    
        this.series = allRowschart;

        console.log("CHARTS",det.data)

          },
         error => {
             this.alertService.error(" Data for Chart is not available ");
             this.load2 = false;
         })
        var enddate = new Date();
        console.log("charts:ENDDATE",enddate);   
        
      }


      
      
}