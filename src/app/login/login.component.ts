import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { first } from 'rxjs/operators';



import { AlertService, AuthenticationService } from '../_services';
import { User, CurrUser } from '../_models';


@Component({
    selector: '',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    userinfo: string;
    usr: User;
    curru: CurrUser;
    pass: string;
   
    flgmob: boolean;
    public phoneNumberValue: string = '';
    public phoneNumberMask: string = '(999) 000-00-00-00';

    public form: FormGroup;

    public data: any = {
        contrno:  '',
        mobile:  '',
        password: '',
        phoneNumber: this.phoneNumberValue,
        arrivalDate: null,
        numberOfNights: null,
        numberOfGuests: null,
        terms: false,
        comments: ''
    };



    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
       
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
            this.loginForm.reset();
        }
        this.form = new FormGroup({
            contrno: new FormControl(this.data.contrno, [Validators.nullValidator]),
            mobile: new FormControl(this.data.mobile, [Validators.nullValidator]),
            password: new FormControl(this.data.password, [Validators.required]),
            phoneNumber: new FormControl(this.data.phoneNumber, [Validators.required]),
            arrivalDate: new FormControl(this.data.arrivalDate, [Validators.required]),
            numberOfNights: new FormControl(this.data.numberOfNights, [Validators.required]),
            numberOfGuests: new FormControl(this.data.numberOfGuests, [Validators.required, Validators.max(5)]),
            terms: new FormControl(this.data.terms, [Validators.requiredTrue]),
            comments: new FormControl(this.data.comments)
        });

    }

    public submitForm(): void {
        this.form.markAllAsTouched();
    }


    public clearForm(): void {
        this.form.reset();
    }

    public sign_up(): void {
        this.router.navigate(['/register']);
    }


    get f() { return this.form.controls; }

    get h() { return this.curru; }

   
   

    ngOnInit() {
        
        // get return url from route parameters or default to '/'
        localStorage.removeItem('currentUser');
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        localStorage.setItem('stat_mn','N'); 

      this.flgmob = true;
    }

    // convenience getter for easy access to form fields
   

    

    

    onSubmit(contrno: number,usernam: number,password: string) {
        this.submitted = false;
       // this.form.markAllAsTouched();
        // stop here if form is invalid

        var username = usernam.toString();
        var contr = contrno.toString();

        if( username === "" || contr === ""  )
        {
                if(username !="")
                {
                this.submitted = true;
                }
                else
                {
                if(contr !="")
                this.submitted = true;
                }
        }

        if( username != "" && contr != ""  )
        this.submitted = false;

        if( this.submitted == false || password === ""  )
        {
          window.alert("Account/Mobile Number (not both) / password must be entered");
        }
        else
        {
        this.loading = true;
        localStorage.setItem('uname', username);
       
        localStorage.setItem('mobilenum', username);
        localStorage.setItem('acountnum', contr);


        if(contr !="")
        {
        this.authenticationService.login(contr, password)
            .pipe(first())
            .subscribe(
                data => {
                
                 console.log("Inside account");
                  this.router.navigate(['/select-account']);
                         },
                error => {
                    this.alertService.error("Incorrect Account/Mobile No. / password");
                    this.loading = false;
                });

        }

        if(username !="")
        {
        this.authenticationService.login(username, password)
            .pipe(first())
            .subscribe(
                data => {
                
                 
                  this.router.navigate(['/select-invoice']);
                         },
                error => {
                    this.alertService.error("Incorrect Account/Mobile No. / password");
                    this.loading = false;
                });

        }


        }      
                
    }

  
    onSubmit_forgot(usernam: number) {
        var username = usernam.toString();
        console.log(username);
        if( username === "" )
        {
          window.alert("Please enter Mobile Number");
        }
        else
        {
        this.authenticationService.check_mobile(username)
        .pipe(first())
        .subscribe(
            data => {
               // window.alert("Will send SMS with a code to this mobile:" + username  );
               localStorage.setItem('mobilenum', username);
                this.router.navigate(['/forgot-p']);
                
                     },
            error => {
               // this.alertService.error("You are not permitted to regiter");
                window.alert("Mobile Number is incorrect " );
                
                this.loading = false;
            });
       
        }
    }
   
}
