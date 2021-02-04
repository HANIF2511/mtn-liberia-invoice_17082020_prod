import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';
import { User, CurrUser ,invsummary} from '../_models';


 declare function date_format();
 declare function get_last_day(num: any);


declare function setParamConfig (paramas,inv_voice);
  

@Component({
  selector: 'app-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.css']
})
export class SelectAccountComponent implements OnInit {
  loading = false;
  public loading_1: boolean;
  public loading_2: boolean;
  public loading_3: boolean;

  public listItems:  string;
  selectedCompany = "";

  array_subno: string [];


 
  submitted = false;
  mobilenum: string;
  invdate: Date;
  returnUrl: string;
  array: any = [];

  public curr_bill: Date = new Date;
  public prev_bill: Date = new Date;
  public pre_prev__bill: Date = new Date;
  public format: string = 'mm/dd/yyyy';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.mobilenum = localStorage.getItem('acountnum');  

  
   this.curr_bill  = get_last_day(0);
   this.prev_bill = get_last_day(1);
   this.pre_prev__bill = get_last_day(2);
   
   }


  public form: FormGroup = new FormGroup({
    invdate: new FormControl()
});


get f() { return this.form.controls; }

  ngOnInit(): void {
    
  
  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  this.form.reset();
  this.loading_1 = false;
  this.loading_2 = true;
  
 // this.check_0();
 this.get_invdate4contrno()
  
 
  }

  public clearForm(): void {
    this.form.reset();
}


check_0()
{
  console.log("Inside false of current bill",this.curr_bill.toString(),this.mobilenum);
  this.authenticationService.invcontrno(this.mobilenum, this.curr_bill.toString())
  .pipe(first())
.subscribe(
   data => {
       
      console.log("Inside false of current bill");
     this.loading_1 = false;
  
  
            },
   error => {
    console.log("Inside false of current bill errorrrrrr",this.curr_bill.toString(),this.mobilenum);
    this.loading_1 = true;
    
     
   });


}

check_1()
{
  console.log("Inside false of current bill",this.prev_bill.toString());
  this.authenticationService.invcontrno(this.mobilenum, this.prev_bill.toString())
  .pipe(first())
.subscribe(
   data => {
       
    
     this.loading_2 = false;
  
  
            },
   error => {
    this.loading_2 = true;
    
     
   });


}


onSubmit_0()
{
  
  this.authenticationService.invcontrno(this.mobilenum, this.selectedCompany)
  .pipe(first())
.subscribe(
   data => {
    //   this.alertService.success(this.f.username.value);

    // this.userinfo = localStorage.getItem('currentUser');
    this.array = data.data;             
             
    setParamConfig("Data",this.array);
    
     localStorage.setItem('accountnum', this.mobilenum);
     localStorage.setItem('invdate', this.selectedCompany);
    
     
   this.router.navigate(['/account-srcreen']);
  
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
  this.authenticationService.invcontrno(this.mobilenum, this.pre_prev__bill.toString())
  .pipe(first())
.subscribe(
   data => {
    //   this.alertService.success(this.f.username.value);

    // this.userinfo = localStorage.getItem('currentUser');
    this.array = data.data;             
             
    setParamConfig("Data",this.array);
    localStorage.setItem('accountnum', this.mobilenum);
    localStorage.setItem('invdate', this.pre_prev__bill.toString());
   
    
  this.router.navigate(['/account-srcreen']);
 
           },
  error => {
   this.loading_1 = false;
    var str = "Billing Date is  not valid for: " + this.mobilenum ;
      this.alertService.error(str);
      this.loading = false;
    
  });

}

onSubmit_2()
{
  console.log("Mobile,Date==",this.mobilenum,this.prev_bill.toString())
  this.authenticationService.invcontrno(this.mobilenum, this.prev_bill.toString())
  .pipe(first())
.subscribe(
   data => {
    //   this.alertService.success(this.f.username.value);

    // this.userinfo = localStorage.getItem('currentUser');
    this.array = data.data;    
    setParamConfig("Data",this.array);         
    localStorage.setItem('accountnum', this.mobilenum);
    localStorage.setItem('invdate', this.prev_bill.toString());
   
    
  this.router.navigate(['/account-srcreen']);
 
           },
  error => {
   this.loading_1 = false;
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



get_invdate4contrno()
{
  this.authenticationService.inv4contrno(this.mobilenum)
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



}
