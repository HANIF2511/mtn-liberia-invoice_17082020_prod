import { Component, OnInit ,ViewEncapsulation,ViewChild, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { first } from 'rxjs/operators';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';



import { ProductsService } from './products.service';
import { AddEvent, GridComponent, CellClickEvent } from '@progress/kendo-angular-grid';
import { groupBy, GroupDescriptor } from '@progress/kendo-data-query';


import { AlertService, AuthenticationService } from '../_services';
import { User, CurrUser ,invsummary} from '../_models';

const formGroup = dataItem => new FormGroup({
  'ID': new FormControl(dataItem.ID),
  'Discontinued': new FormControl(dataItem.Discontinued),
  'SUB_NO': new FormControl(dataItem.SU_NO),
  'IV_NO': new FormControl(dataItem.IV_NO, Validators.required),
  'AMOUNT': new FormControl(dataItem.AMOUNT)
});

const hasClass = (el, className) => new RegExp(className).test(el.className);

const isChildOf = (el, className) => {
  while (el && el.parentElement) {
       if (hasClass(el.parentElement, className)) {
           return true;
       }
       el = el.parentElement;
   }
   return false;
};



declare function getParamConfig_data ();

@Component({
  selector: 'app-account-srcreen',
  templateUrl: './account-srcreen.component.html',
  styleUrls: ['./account-srcreen.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSrcreenComponent implements OnInit {
  
  public checkboxOnly = false;
  public mode = 'multiple';
  result: string = '';
 
  public selectableSettings: SelectableSettings;


  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  userinfo: string;
  usr: User;
  curru: CurrUser;
  pass: string;
  accountnum: string;
  invdate: string;
  billmob: string;
  opened: boolean = false;
  

  NAME: string;
  contrno: string;
  STATMN: string;
  BILLP: string;
  INVDATE: string;
  PREV_BAL: string;
  TOT_SUB_BAL: string;
  TOT_NET_BAL: string;
  from_date: string;
  to_date: string;
  DUEDATE: string;
  array: invsummary;
  loading_1: boolean;


  public data: any[];
  
   public iv_no: string;
  
  public form: FormGroup;

    public dataform: any = {
      mobilenum: ''
    };

    public formGroup: FormGroup;
    public groups: GroupDescriptor[] = [];
    public view: any[];
    @ViewChild(GridComponent) private grid: GridComponent;
    private editedRowIndex: number;
    private isNew = false;

    public get isInEditingMode(): boolean {
        return this.editedRowIndex !== undefined || this.isNew;
    }

    public groupChange(groups: GroupDescriptor[]): void {
        this.groups = groups;
        this.view = groupBy(this.service.products(), this.groups);
    }

   

  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private service: ProductsService, private renderer: Renderer2
  ) {
   
    this.setSelectableSettings();
  this.form = new FormGroup({
      mobilenum: new FormControl(this.dataform.mobilenum, [Validators.required]),
      
  });

  this.accountnum  = localStorage.getItem('accountnum');
  this.invdate  = localStorage.getItem('invdate');
   
    
   }

  
   
  
    ngOnInit(): void {
    
      this.loading_1 = true;
    this.data = getParamConfig_data();
   // this.view = this.service.products();
    this.view = getParamConfig_data();
    console.log("THISDATAAAAAA",this.data[0]);
    this.billmob = this.data[0].SUB_NO;
  //  console.log("Before load_continfo");
    this.load_continfo();
   
   
  //  console.log("Display view",this.view);
    this.renderer.listen(
        "document",
        "click",
        ({ target }) => {
            if (!isChildOf(target, "k-grid")) {
                this.saveClick();
            }
        });

   
  }
  public addHandler({ sender }: AddEvent): void {
    this.closeEditor(sender);

    this.formGroup = formGroup({
        'Discontinued': false,
        'SUB_NO': "",
        'IV_NO': "0",
        'AMOUNT': "0"
    });

    this.isNew = true;
    sender.addRow(this.formGroup);
}

public editHandler({ sender, columnIndex, rowIndex, dataItem }: CellClickEvent): void {
  this.billmob = dataItem.SUB_NO;

  console.log("DataItem,Rowindx",dataItem,columnIndex,this.billmob );
  // this.clickMethod(this.billmob);
  // this.openConfirmationDialog();

  this.opened = true;
  
    if (this.formGroup && !this.formGroup.valid) {
        return;
    }

  //  this.saveRow();
  //  this.formGroup = formGroup(dataItem);
  //  this.editedRowIndex = rowIndex;

   // sender.editRow(rowIndex, this.formGroup, { columnIndex });
}

public cancelHandler(): void {
    this.closeEditor(this.grid, this.editedRowIndex);
}

public saveClick(): void {
    if (this.formGroup && !this.formGroup.valid) {
        return;
    }

    this.saveRow();
}

private closeEditor(grid: GridComponent, rowIndex: number = this.editedRowIndex): void {
    this.isNew = false;
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
}

private saveRow(): void {
    if (this.isInEditingMode) {
        this.service.save(this.formGroup.value, this.isNew);
    }

    this.closeEditor(this.grid);
}



  public submitForm(): void {
    this.form.markAllAsTouched();
}


public clearForm(): void {
    this.form.reset();
}

onSubmit(mobilenum)
{


  if(mobilenum != "") 
  {
  this.authenticationService.invsummary(mobilenum, this.invdate)
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
     localStorage.setItem('mobile', mobilenum);
     localStorage.setItem('chartflag', 'N');
     localStorage.setItem('servicef', 'N');
     localStorage.setItem('voicef', 'N');
     localStorage.setItem('dataf', 'N');
     
   this.router.navigate(['/account-form-grp']);
  
            },
   error => {
    
     var str = "Billing Date is  not valid for: " + mobilenum ;
       this.alertService.error(str);
       this.loading = false;
     
   });
  }
  else
  {
    this.alertService.error("Mobile Number should be entered"); 
  }


}
  
load_continfo()
{
  this.authenticationService.invcontrnoinfo(this.invdate,this.accountnum)
  .pipe(first())
.subscribe(
   data => {
   
    this.contrno = data.data[0].CONTRNO;
    this.BILLP = data.data[0].BILLING_PERIOD;
    var split_date = this.BILLP.split("|");
    this.from_date = split_date[0];
    this.to_date = split_date[1];   

    this.NAME =  data.data[0].NAME;
    var nnn = this.NAME;

    var n = nnn.search("~");

if (n == 0)	{
var array = nnn.split("~");
this.NAME = array[1];

}

   
    this.STATMN = data.data[0].INVOICE_NO;
    this.INVDATE = data.data[0].INVOICE_DATE;
    this.DUEDATE = data.data[0].DUEDATE;
    this.PREV_BAL = data.data[0].PREV_BAL;
    this.TOT_SUB_BAL = data.data[0].TOT_SUB_BAL;
    this.TOT_NET_BAL = data.data[0].TOT_NET_BAL;
    
    
     
  // this.router.navigate(['/account-srcreen']);
  
            },
   error => {
  
     var str = "Billing Date is  not valid for: " + this.accountnum ;
       this.alertService.error(str);
       this.loading = false;
     
   });


 
}
logout() {
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}

mobile_view()
{

  /*
  this.loading_1 = !this.loading_1;
  console.log(this.loading_1);
  */
console.log("MMMM",this.billmob);
  if(this.billmob == "")
  {
 
    this.alertService.error("Incorrect/empty Mobile number ");
  }
  else
  {

 this.onSubmit(this.billmob);
  }

}
public setSelectableSettings(): void {
  this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: 'single'
  };
}





clickMethod(name: string) {
  if(confirm("View Bill Info for Mobile:  "+name)) {
    console.log("Implement delete functionality here");
    this.onSubmit(name);
  }
}


close_no()
{
  this.opened = false;
}


close_yes()
{
  this.onSubmit(this.billmob);
  this.opened = false;

}
/*
public openConfirmationDialog() {
  this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
  .then((confirmed) => console.log('User confirmed:', confirmed))
  .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
}
*/

public close(status) {
  console.log(`Dialog result: ${status}`);
   this.opened = false;
}
}
