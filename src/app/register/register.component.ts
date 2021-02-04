import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, UserService, AuthenticationService } from '../_services';


import { User, CurrUser } from '../_models';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    encapsulation: ViewEncapsulation.None
})


export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = true;
    public data: any = {
        contrno:  '',
        mobile:  '',
        password: '',
        arrivalDate: null,
        numberOfNights: null,
        numberOfGuests: null,
        terms: false,
        comments: ''
    };

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        
        if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
        }
        this.form = new FormGroup({
            firstname: new FormControl(this.data.firstname, [Validators.required]),
            lastname: new FormControl(this.data.lastname, [Validators.required]),
            username: new FormControl(this.data.username, [Validators.required])
           
        });
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required]
        });
      
    }

   
    onSubmit_cancel()
    {
        this.router.navigate(['/login']); 
    }
  

    onSubmit(firstname: any,lastname: any ,username: any) {
       


        if( firstname === "" || lastname === "" ||  username === "" )
        {
            
          window.alert("All Fields must be filled out");
        }
        else
        {

            if(firstname.length <3 ||lastname.length <3 || username.length <3 )
            {
                window.alert("some fields less than three characters or password is short"); 
            }
           else
           {

        
        localStorage.setItem('uname', username);
        localStorage.setItem('mobilenum', username);
        localStorage.setItem('firstname', firstname);
        localStorage.setItem('lastname', lastname);
       
       
      
        this.authenticationService.check_login(username)
        .pipe(first())
        .subscribe(
            data => {
                
                window.alert(username + ":" + " " + "Already have a login account" );
                this.loading = false;
                
                     },
            error => {
               // this.router.navigate(['/forgot-pass']);
               this.authenticationService.check_mobile(username)
        .pipe(first())
        .subscribe(
            data => {
               // window.alert("Will send SMS with a code to this mobile:" + username  );
                this.router.navigate(['/forgot-pass']);
                
                     },
            error => {
               // this.alertService.error("You are not permitted to regiter");
                window.alert("You are not permitted to register" );
                
                this.loading = false;
            });
                
            });


          
            }




        }
    }
}
