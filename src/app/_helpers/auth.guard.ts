import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';


import { AuthenticationService , AlertService} from '../_services';
declare function getParamConfig_mac ();


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
      
        
    }

      
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const currentUser = this.authenticationService.currentUserValue;
       
 
            if (currentUser) {
                // authorised so return true
                return true;
            }
    
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
       
       
       
    }

  

        canActivate_license(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

            const currentUser = this.authenticationService.currentUserValue;
           
     
                if (currentUser) {
                   return true;
               
                }
              
                this.authenticationService.check_license()
        .pipe(first())
        .subscribe(
            data => {
               
               
            if(data.data != "1W1Y4-C017D-VXGYV-4E2DE-A11FE-A2107")
            {
                window.alert("'License not valid" );
                return true;    
               
            }
            else
            {
                 // not logged in so redirect to login page with the return url
               
                 this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                 return false;     
            }
                     
                     },
            error => {
               
                window.alert("Illegal access due to license" );
                return true;
               
            });
                   
           
           
        }

        canActivate_mac(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

            const currentUser = this.authenticationService.currentUserValue;
           
     
                if (currentUser) {
                   return true;
               
                }
              
                this.authenticationService.check_macaddress()
        .pipe(first())
        .subscribe(
            data => {
                var macadr =   getParamConfig_mac();
               
            if(data.data != macadr)
            {
                window.alert("Illegal access" );
                return true;    
               
            }
            else
            {
                 // not logged in so redirect to login page with the return url
               
                 this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                 return false;     
            }
                     
                     },
            error => {
               
                window.alert("Illegal access" );
                return true;
               
            });
                   
           
           
        }

    
}