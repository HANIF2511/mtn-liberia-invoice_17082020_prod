import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';
import { KendoChartsComponent } from './kendo-charts/kendo-charts.component';
import { KendoVoiceComponent } from './kendo-voice/kendo-voice.component';
import { ExcelExportComponent } from './excel-export/excel-export.component';
import {ExcelVoiceComponent} from './excel-voice/excel-voice.component';
import {SelectInvoiceComponent} from './select-invoice/select-invoice.component';
import { FormGroupComponent } from './form-group/form-group.component';
import {ForgotPassComponent} from './forgot-pass/forgot-pass.component';
import {EnterCodeComponent} from './enter-code/enter-code.component';
import {ForgotPComponent} from './forgot-p/forgot-p.component';
import {EnterCodePComponent} from './enter-code-p/enter-code-p.component';
import {PdfCompComponent} from './pdf-comp/pdf-comp.component';
import {AccountSrcreenComponent} from './account-srcreen/account-srcreen.component';
import { EventLogComponent } from './event-log/event-log.component';
import {SelectAccountComponent} from './select-account/select-account.component'
import {AccountFormGrpComponent} from './account-form-grp/account-form-grp.component'

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';



const routes: Routes = [
    { path: '', component: HomeComponent , canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-pass', component: ForgotPassComponent },
    { path: 'account-srcreen', component: AccountSrcreenComponent },
    { path: 'select-account', component: SelectAccountComponent },
    { path: 'account-form-grp', component: AccountFormGrpComponent },
    { path: 'event-log', component: EventLogComponent },
    { path: 'forgot-p', component: ForgotPComponent },
    { path: 'enter-code', component: EnterCodeComponent },
    { path: 'enter-code-p', component: EnterCodePComponent },
    { path: 'select-invoice', component: SelectInvoiceComponent }, 
    { path: 'app-pdf-comp', component: PdfCompComponent },
    { path: 'kendo-voice', component: KendoVoiceComponent }, 
    { path: 'kendo-charts', component: KendoChartsComponent }, 
    { path: 'excel-export', component: ExcelExportComponent}, 
    { path: 'excel-voice', component: ExcelVoiceComponent},
    { path: 'form-group', component: FormGroupComponent},
    { path: 'about', component: AboutComponent},

    
  
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }