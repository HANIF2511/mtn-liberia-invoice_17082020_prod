import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';
import { User, CurrUser ,invsummary} from '../_models';


 declare function date_format();
 declare function get_last_day(num: any);

@Component({
  selector: 'app-select-invoice',
  templateUrl: './select-invoice.component.html',
  styleUrls: ['./select-invoice.component.css']
})


export class SelectInvoiceComponent implements OnInit {
  loading = false;
  public loading_1: boolean;
  public loading_2: boolean;
  public loading_3: boolean;
 
  submitted = false;
  mobilenum: string;
  invdate: Date;
  returnUrl: string;
  array: invsummary;
  public listItems:  string;
  selectedCompany = "";

  array_subno: string [];

  public curr_bill: Date = new Date;
  public prev_bill: Date = new Date;
  public pre_prev__bill: Date = new Date;
  public prev_bill_4: Date = new Date;
  public prev_bill_5: Date = new Date;
  public prev_bill_6: Date = new Date;
  public format: string = 'mm/dd/yyyy';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.loading_1 = false;
    this.loading_2 = false;
   
   
   }


  public form: FormGroup = new FormGroup({
    invdate: new FormControl()
});


get f() { return this.form.controls; }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      invdate: ['', Validators.required]
      
  });
  
  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  this.form.reset();
  
  this.mobilenum = localStorage.getItem('mobilenum');  
  this.curr_bill  = get_last_day(0);
  this.prev_bill = get_last_day(1);
  this.pre_prev__bill = get_last_day(2);
  this.prev_bill_4 = get_last_day(3);
  this.prev_bill_5 = get_last_day(4);
  this.prev_bill_6 = get_last_day(5);
  // this.check_0();
 // this.check_1();
  console.log("Inside select invoice");

  this.get_invdate4subno();
 
  }

  public clearForm(): void {
    this.form.reset();
}


check_0()
{
  
  this.authenticationService.invsummary(this.mobilenum, this.curr_bill.toString())
  .pipe(first())
.subscribe(
   data => {
       
    
     this.loading_1 = false;
  
  
            },
   error => {
    this.loading_1 = true;
    
     
   });


}

check_1()
{
  
  this.authenticationService.invsummary(this.mobilenum, this.prev_bill.toString())
  .pipe(first())
.subscribe(
   data => {
       
    
     this.loading_2 = false;
  
  
            },
   error => {
    this.loading_2 = true;
    
     
   });


}


get_invdate4subno()
{
  this.authenticationService.invsubno(this.mobilenum)
  .pipe(first())
.subscribe(
   data => {
   
    this.array_subno = data;    
   
    console.log("INV_DATE HF Please",this.array_subno)   ;
    this.selectedCompany = data[0].INVDATE;
  },
  error => {
   this.loading_1 = false;
    var str = "Billing Date is  not valid for: " + this.mobilenum ;
      this.alertService.error(str);
      this.loading = false;
    
  });
  
}

onSubmit_0()
{
  
  this.authenticationService.invsummary(this.mobilenum, this.selectedCompany)
  .pipe(first())
.subscribe(
   data => {
    //   this.alertService.success(this.f.username.value);

    // this.userinfo = localStorage.getItem('currentUser');
    this.array = data.data;             
             
    
     localStorage.setItem('contrno', this.array.CONTRNO);
     localStorage.setItem('name', this.array.NAME);
     localStorage.setItem('bperiod', this.array.BILLING_PERIOD);
     localStorage.setItem('invdate', this.array.INVOICE_DATE);
     localStorage.setItem('duedate', this.array.DUE_DATE);
     localStorage.setItem('iv_no', this.array.IV_NO);
     localStorage.setItem('amount', this.array.AMOUNT);
     localStorage.setItem('tot_sub_inv', this.array.TOT_SUB_INV);
     localStorage.setItem('open_bal', this.array.OPEN_BAL);
     localStorage.setItem('closed_bal', this.array.CLOSED_BAL);
     localStorage.setItem('statm_no', this.array.STATM_NO);
     localStorage.setItem('mobile', this.mobilenum);
     localStorage.setItem('chartflag', 'N');
     localStorage.setItem('servicef', 'N');
     localStorage.setItem('voicef', 'N');
     localStorage.setItem('dataf', 'N');
  
   this.router.navigate(['/form-group']);
  
            },
   error => {
    this.loading_1 = false;
     var str = "Billing Date is  not valid for: " + this.mobilenum ;
       this.alertService.error(str);
       this.loading = false;
     
   });


}

onSubmit_1()
{
 
  console.log("Mobile,Date==",this.mobilenum,this.prev_bill.toString())
  this.authenticationService.invsummary(this.mobilenum, this.pre_prev__bill.toString())
  .pipe(first())
.subscribe(
   data => {
    //   this.alertService.success(this.f.username.value);

    // this.userinfo = localStorage.getItem('currentUser');
    this.array = data.data;             
             
    
     localStorage.setItem('contrno', this.array.CONTRNO);
     localStorage.setItem('name', this.array.NAME);
     localStorage.setItem('bperiod', this.array.BILLING_PERIOD);
     localStorage.setItem('invdate', this.array.INVOICE_DATE);
     localStorage.setItem('duedate', this.array.DUE_DATE);
     localStorage.setItem('iv_no', this.array.IV_NO);
     localStorage.setItem('amount', this.array.AMOUNT);
     localStorage.setItem('tot_sub_inv', this.array.TOT_SUB_INV);
     localStorage.setItem('open_bal', this.array.OPEN_BAL);
     localStorage.setItem('closed_bal', this.array.CLOSED_BAL);
     localStorage.setItem('statm_no', this.array.STATM_NO);
     localStorage.setItem('mobile', this.mobilenum);
     localStorage.setItem('chartflag', 'N');
     localStorage.setItem('servicef', 'N');
     localStorage.setItem('voicef', 'N');
     localStorage.setItem('dataf', 'N');
    
   this.router.navigate(['/form-group']);
            },
   error => {
    this.loading_2 = false;
     var str = "Billing Date is  not valid for: " + this.mobilenum ;
     this.alertService.error(str);
       this.loading = false;
   });


}


onSubmit_2()
{
  console.log("Mobile,Date==",this.mobilenum,this.prev_bill.toString())
  this.authenticationService.invsummary(this.mobilenum, this.prev_bill.toString())
  .pipe(first())
.subscribe(
   data => {
    //   this.alertService.success(this.f.username.value);

    // this.userinfo = localStorage.getItem('currentUser');
    this.array = data.data;             
    this.array = data.data;             
     localStorage.setItem('contrno', this.array.CONTRNO);
     localStorage.setItem('name', this.array.NAME);  
     localStorage.setItem('bperiod', this.array.BILLING_PERIOD);
     localStorage.setItem('invdate', this.array.INVOICE_DATE);
     localStorage.setItem('duedate', this.array.DUE_DATE);
     localStorage.setItem('iv_no', this.array.IV_NO);
     localStorage.setItem('amount', this.array.AMOUNT);
     localStorage.setItem('tot_sub_inv', this.array.TOT_SUB_INV);
     localStorage.setItem('open_bal', this.array.OPEN_BAL);
     localStorage.setItem('closed_bal', this.array.CLOSED_BAL);
     localStorage.setItem('statm_no', this.array.STATM_NO);
     localStorage.setItem('mobile', this.mobilenum);
     localStorage.setItem('chartflag', 'N');
     localStorage.setItem('servicef', 'N');
     localStorage.setItem('voicef', 'N');
     localStorage.setItem('dataf', 'N');
     console.log("INFO=",this.array.CONTRNO);
    
   this.router.navigate(['/form-group']);
            },
   error => {
    this.loading_3 = false;
     var str = "Billing Date is  not valid for: " + this.mobilenum ;
       this.alertService.error(str);
       this.loading = false;
   });


}

onSubmit_3()
{
  console.log("Mobile,Date==",this.mobilenum,this.prev_bill_4.toString())
  this.authenticationService.invsummary(this.mobilenum, this.prev_bill_4.toString())
  .pipe(first())
.subscribe(
   data => {
    //   this.alertService.success(this.f.username.value);

    // this.userinfo = localStorage.getItem('currentUser');
    this.array = data.data;             
    this.array = data.data;             
     localStorage.setItem('contrno', this.array.CONTRNO);
     localStorage.setItem('name', this.array.NAME);  
     localStorage.setItem('bperiod', this.array.BILLING_PERIOD);
     localStorage.setItem('invdate', this.array.INVOICE_DATE);
     localStorage.setItem('duedate', this.array.DUE_DATE);
     localStorage.setItem('iv_no', this.array.IV_NO);
     localStorage.setItem('amount', this.array.AMOUNT);
     localStorage.setItem('tot_sub_inv', this.array.TOT_SUB_INV);
     localStorage.setItem('open_bal', this.array.OPEN_BAL);
     localStorage.setItem('closed_bal', this.array.CLOSED_BAL);
     localStorage.setItem('statm_no', this.array.STATM_NO);
     localStorage.setItem('mobile', this.mobilenum);
     localStorage.setItem('chartflag', 'N');
     localStorage.setItem('servicef', 'N');
     localStorage.setItem('voicef', 'N');
     localStorage.setItem('dataf', 'N');
     console.log("INFO=",this.array.CONTRNO);
    
   this.router.navigate(['/form-group']);
            },
   error => {
    this.loading_3 = false;
     var str = "Billing Date is  not valid for: " + this.mobilenum ;
       this.alertService.error(str);
       this.loading = false;
   });


}

onSubmit_4()
{
  console.log("Mobile,Date==",this.mobilenum,this.prev_bill_5.toString())
  this.authenticationService.invsummary(this.mobilenum, this.prev_bill_5.toString())
  .pipe(first())
.subscribe(
   data => {
    //   this.alertService.success(this.f.username.value);

    // this.userinfo = localStorage.getItem('currentUser');
    this.array = data.data;             
    this.array = data.data;             
     localStorage.setItem('contrno', this.array.CONTRNO);
     localStorage.setItem('name', this.array.NAME);  
     localStorage.setItem('bperiod', this.array.BILLING_PERIOD);
     localStorage.setItem('invdate', this.array.INVOICE_DATE);
     localStorage.setItem('duedate', this.array.DUE_DATE);
     localStorage.setItem('iv_no', this.array.IV_NO);
     localStorage.setItem('amount', this.array.AMOUNT);
     localStorage.setItem('tot_sub_inv', this.array.TOT_SUB_INV);
     localStorage.setItem('open_bal', this.array.OPEN_BAL);
     localStorage.setItem('closed_bal', this.array.CLOSED_BAL);
     localStorage.setItem('statm_no', this.array.STATM_NO);
     localStorage.setItem('mobile', this.mobilenum);
     localStorage.setItem('chartflag', 'N');
     localStorage.setItem('servicef', 'N');
     localStorage.setItem('voicef', 'N');
     localStorage.setItem('dataf', 'N');
     console.log("INFO=",this.array.CONTRNO);
    
   this.router.navigate(['/form-group']);
            },
   error => {
    this.loading_3 = false;
     var str = "Billing Date is  not valid for: " + this.mobilenum ;
       this.alertService.error(str);
       this.loading = false;
   });


}

onSubmit_5()
{
  console.log("Mobile,Date==",this.mobilenum,this.prev_bill_6.toString())
  this.authenticationService.invsummary(this.mobilenum, this.prev_bill_6.toString())
  .pipe(first())
.subscribe(
   data => {
    //   this.alertService.success(this.f.username.value);

    // this.userinfo = localStorage.getItem('currentUser');
    this.array = data.data;             
    this.array = data.data;             
     localStorage.setItem('contrno', this.array.CONTRNO);
     localStorage.setItem('name', this.array.NAME);  
     localStorage.setItem('bperiod', this.array.BILLING_PERIOD);
     localStorage.setItem('invdate', this.array.INVOICE_DATE);
     localStorage.setItem('duedate', this.array.DUE_DATE);
     localStorage.setItem('iv_no', this.array.IV_NO);
     localStorage.setItem('amount', this.array.AMOUNT);
     localStorage.setItem('tot_sub_inv', this.array.TOT_SUB_INV);
     localStorage.setItem('open_bal', this.array.OPEN_BAL);
     localStorage.setItem('closed_bal', this.array.CLOSED_BAL);
     localStorage.setItem('statm_no', this.array.STATM_NO);
     localStorage.setItem('mobile', this.mobilenum);
     localStorage.setItem('chartflag', 'N');
     localStorage.setItem('servicef', 'N');
     localStorage.setItem('voicef', 'N');
     localStorage.setItem('dataf', 'N');
     console.log("INFO=",this.array.CONTRNO);
    
   this.router.navigate(['/form-group']);
            },
   error => {
    this.loading_3 = false;
     var str = "Billing Date is  not valid for: " + this.mobilenum ;
       this.alertService.error(str);
       this.loading = false;
   });


}

logout() {
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}

onChange(deviceValue) {
  this.selectedCompany =  deviceValue;
  // this.selectempexp(this.emp_id);
  console.log("Inside onchange",deviceValue);
 
}

getVal()
{
  console.log("Inside onchange",this.selectedCompany);  
  this.onSubmit_0();
}

}
