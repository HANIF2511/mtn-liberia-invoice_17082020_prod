import { Component, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { AlertService, AuthenticationService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'kendo-pages',
  template: `
      <kendo-grid
          [data]="gridView"
          [resizable]="true"
          [pageSize]="pageSize"
          [skip]="skip"
          [pageable]="true"
          [height]="500"
          (pageChange)="pageChange($event)"
        >
        
        <kendo-grid-column field="BSUBNO" title="B-Num" [width]="120">
        </kendo-grid-column>
        <kendo-grid-column field="DESCRIPTION" title="Event" [width]="80">
        </kendo-grid-column>
        <kendo-grid-column field="CALLTYPE" title="CallType" [width]="90">
        </kendo-grid-column>
        <kendo-grid-column field="DATE" title="Date" [width]="80">
        </kendo-grid-column>
        <kendo-grid-column field="TIME" title="Time" [width]="80">
        </kendo-grid-column>
        <kendo-grid-column field="DURATION" title="Duration" [width]="80">
        </kendo-grid-column>
        <kendo-grid-column field="AMOUNT" title="Amount" [width]="100">
        </kendo-grid-column>
      </kendo-grid>
  `
})

export class KendoVoiceComponent implements OnInit {
  public gridView: GridDataResult;
  public pageSize = 20;
  public skip = 0;
  public items: any[] ;
  loading = false;
  submitted = false;  
  mobile: string;
  invdate: string;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { 
    this.loadItems();
  }


  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
}

private loadItems(): void {
  this.submitted = true;
       
     this.loading = true;
    this.mobile = localStorage.getItem('mobile');
    this.invdate = localStorage.getItem('invdate');
      console.log(this.mobile,this.invdate);
      this.authenticationService.invdetvoice(this.mobile, this.invdate)
            .pipe(first())
         .subscribe(
             det => {
              //   this.alertService.success(this.f.username.value);
         
              // this.userinfo = localStorage.getItem('currentUser');
              this.items = det.data;    
              console.log ("Inside loadItems=====",this.items);
              this.gridView = {
                data: this.items.slice(this.skip, this.skip + this.pageSize),
                total: this.items.length
            };
            //  console.log(this.items)  ;       
          //  this.router.navigate(['/service-page']);
                      },
             error => {
                 this.alertService.error(" Required Data is not found ");
                 this.loading = false;
             })
             console.log ("Inside loadItems22=====",this.items);
  
   }
  ngOnInit(): void {
    
  }

}
