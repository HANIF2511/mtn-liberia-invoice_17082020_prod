import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-forgot-p',
  templateUrl: './forgot-p.component.html',
  styleUrls: ['./forgot-p.component.css']
})
export class ForgotPComponent implements OnInit {
  submitted: boolean;
  cnt: number;
  mess: string;
  username: string;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('mobilenum');
  }


  onSubmit(mobile: number,rcode: any) {
    this.submitted = true;
    var username = mobile.toString();

    if( username  == "" || rcode == "")
    {
    window.alert("Mobile / Code should  be entered");
    }
    else
    {
      this.authenticationService.check_mobile(username)
            .pipe(first())
            .subscribe(
                data => {
                
                 
                  this.router.navigate(['/select-invoice']);
                         },
                error => {
                    this.alertService.error("Incorrect Mobile No. / password");
                    
                });
    }

    
}

close_no()
{
  this.router.navigate(['/login']);

}

close_yes()
{
  this.router.navigate(['/enter-code-p']);

}

public close(status) {
  console.log(`Dialog result: ${status}`);
  this.router.navigate(['/login']);
}

}
