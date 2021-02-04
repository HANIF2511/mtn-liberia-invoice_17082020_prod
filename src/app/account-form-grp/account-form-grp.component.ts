import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-account-form-grp',
  templateUrl: './account-form-grp.component.html',
  styleUrls: ['./account-form-grp.component.css']
})
export class AccountFormGrpComponent implements OnInit {

  public mobile: string;
  public invdate: string;
  public iv_no: string;
  public series: any[];
  load2: boolean;
  public dis_v: string;
  public load_voice: boolean;

  public onTabSelect(e: any) {
    console.log(e);
  }

  constructor(private authenticationService: AuthenticationService, private router: Router,
              private alertService: AlertService) { 
                this.load_voice = false;
           
  }

  ngOnInit(): void {
    this.load2 = false;
  
    this.load_voice = false;
    
    this.mobile = localStorage.getItem('mobile');
    this.invdate = localStorage.getItem('invdate');
    this.iv_no = localStorage.getItem('iv_no');
    /*

    this.authenticationService.check_voice(this.iv_no, this.invdate)
    .pipe(first())
    .subscribe(
        det => {
            console.log("there are voice calls");
            
        },
        error => {
          
                      
          this.load_voice = true;

        })
    
     */           
     
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

}
