import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '../_services';


@Component({
  selector: 'app-enter-code-p',
  templateUrl: './enter-code-p.component.html',
  styleUrls: ['./enter-code-p.component.css']
})
export class EnterCodePComponent implements OnInit {

  submitted: boolean;
loading: boolean;
cnt: number=0;
firstname: string;
lastname: string;
username: string;
password: string;
mess: string;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(rcode: any) {
    this.submitted = true;


    if(rcode == "")
    {
    window.alert("Code must be entered");
    }
    else
    {
    if( rcode != "123456" )
    {
        
      this.cnt++;
      if(this.cnt != 3)
      window.alert("Wrong code ,Please try again");

     
      if(this.cnt == 3)
      {

        window.alert("Will go back and send code again");
        this.router.navigate(['/forgot-pass']);

      }
    
    }
    else
    {

      this.username = localStorage.getItem('mobilenum');
      
        
    this.loading = true;
   // this.password = this.firstname + "." + this.lastname + "@123";
    this.authenticationService.login(this.firstname,this.password)
    .pipe(first())
    .subscribe(
        data => {
            
         
         
            window.alert("Password has been changed");
            this.router.navigate(['/select-invoice']);
                 },
        error => {
          window.alert("Failed to change password, back to login page");
          this.router.navigate(['/login']);
            this.loading = false;
        });

       

    }
  }
}

}
