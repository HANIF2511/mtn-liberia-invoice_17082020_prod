import { Component } from '@angular/core';
import { Router } from '@angular/router';



import { AuthenticationService } from './_services';
import { User, inv, invsummary } from './_models';

declare function getParamConfig_mac ();


@Component({ selector: 'app', 
             templateUrl: 'app.component.html' ,
             styleUrls: ['./app.component.css']})
export class AppComponent {
 public  title: "mtn-liberia-invoice";
    public show:boolean = true;
  public buttonName:any = 'Show';
    currentUser: User;
    mobilenum: invsummary;
    mobile: string;
    macadr: string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
     // this.logout();
       
       
        // Fetch the computer's MAC address for a specific interface

       
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      
 
 

                     
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    onClickNo()
  {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  onClickYes()
  {
    console.log("Hello")
    this.router.navigate(['/login']);
  }

}