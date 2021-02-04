import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';


import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';
import { User, CurrUser,inv,invsummary,invsumm} from '../_models';
import { InvoiceRow } from './invoice-row';

@Component({
  selector: 'app-pdf-comp',
  templateUrl: './pdf-comp.component.html',
  styleUrls: ['./pdf-comp.component.css']
})
export class PdfCompComponent implements OnInit {
  public position: 'top' | 'bottom' | 'both' = 'top';
  public invoiceData: any;
  public data:InvoiceRow[] ;
  invdate: string;
  mobile: string;
  service0: string;
  amount0: string;
  service1: string;
  amount1:  string;
  service2: string;
  amount2:  string;
  service3: string;
  amount3:  string;
  service4: string;
  amount4:  string;
  service5: string;
  amount5:  string;
  service6: string;
  amount6:  string;
  service7: string;
  amount7:  string;
  service8: string;
  amount8:  string;
  service9: string;
  amount9:  string;
  service10: string;
  amount10:  string;
  service11: string;
  amount11:  string;
  service12: string;
  amount12:  string;
  public array: invsumm;
  name: string;
  amount: string;
  iv_no: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

   
    
    this.invdate = localStorage.getItem('invdate');
    this.mobile = localStorage.getItem('mobile');
    this.name =localStorage.getItem('name');
    this.amount = localStorage.getItem('amount');
    this.iv_no = localStorage.getItem('iv_no');

    this.authenticationService.invtax(this.iv_no, this.invdate)
    .pipe(first())
 .subscribe(
     sum => {
               
   
  //    this.data = sum.data;           
         
  localStorage.setItem('disc_serv',sum.data[0].service);
  localStorage.setItem('disc_amt',sum.data[0].amount);
  localStorage.setItem('tax_serv',sum.data[1].service);
  localStorage.setItem('tax_amt',sum.data[1].amount);


          
      },
     error => {
         this.alertService.error(" No Tax service  ");
       
     });



    
       this.authenticationService.invsumm(this.iv_no, this.invdate)
             .pipe(first())
          .subscribe(
              sum => {
                        
            
          
            

       var output1 =    localStorage.getItem('disc_serv');
       var output2 =    localStorage.getItem('disc_amt');
       var output3 =    localStorage.getItem('tax_serv');
       var output4 =    localStorage.getItem('tax_amt');

  

    
       
       var     queryrows2 = 
       {
       "service": output1,
       "amount": output2
                                         
       }
       sum.data.push(queryrows2);

           queryrows2 = 
       {
       "service": output3,
       "amount": output4
                                         
       }
       sum.data.push(queryrows2);


                     
              this.data = sum.data;  
              
               },
              error => {
                  this.alertService.error(" No service  ");
                
              });


           

              
  

  }

}
