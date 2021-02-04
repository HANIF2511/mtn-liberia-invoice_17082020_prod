import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DocumentEditorAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { GridModule , ExcelModule } from '@progress/kendo-angular-grid';
import {ChartsModule} from '@progress/kendo-angular-charts'



import 'hammerjs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { Printer } from './print.directive';
import { PDFModule } from '@progress/kendo-angular-grid';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ProductsService } from './account-srcreen/products.service';




// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';
import { ConfigComponent } from './config/config.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { KendoChartsComponent } from './kendo-charts/kendo-charts.component';
import { KendoVoiceComponent } from './kendo-voice/kendo-voice.component';
import { ExcelExportComponent } from './excel-export/excel-export.component';
import { ExcelVoiceComponent } from './excel-voice/excel-voice.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { SelectInvoiceComponent } from './select-invoice/select-invoice.component';
import { PdfCompComponent } from './pdf-comp/pdf-comp.component';
import { StatAccountComponent } from './stat-account/stat-account.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { EnterCodeComponent } from './enter-code/enter-code.component';
import { ForgotPComponent } from './forgot-p/forgot-p.component';
import { EnterCodePComponent } from './enter-code-p/enter-code-p.component';
import { PdfInvoiceComponent } from './pdf-invoice/pdf-invoice.component';
import { StatPdfAccountComponent } from './stat-pdf-account/stat-pdf-account.component';
import { PdfVoiceComponent } from './pdf-voice/pdf-voice.component';
import { PdfVoiceCallsComponent } from './pdf-voice-calls/pdf-voice-calls.component';
import { AboutComponent } from './about/about.component';
import { AccountSrcreenComponent } from './account-srcreen/account-srcreen.component';
import { EventLogComponent } from './event-log/event-log.component';
import { SelectAccountComponent } from './select-account/select-account.component';
import { AccountFormGrpComponent } from './account-form-grp/account-form-grp.component';
import { AccountNumberComponent } from './account-number/account-number.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';










@NgModule({
    imports: [
        BrowserModule,
        ButtonModule,
        DocumentEditorAllModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        InputsModule,
        BrowserAnimationsModule,
        LabelModule,
        DateInputsModule,
        GridModule,
        ChartsModule,
        ExcelModule,
        LayoutModule,
        CommonModule,
        PDFExportModule,
        PDFModule,
        DropDownsModule,
        DialogsModule
        
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        ConfigComponent,
        KendoChartsComponent,
        KendoVoiceComponent,
        ExcelExportComponent,
        ExcelVoiceComponent,
        FormGroupComponent,
        SelectInvoiceComponent,
        PdfCompComponent,
        StatAccountComponent,
        ForgotPassComponent,
        EnterCodeComponent,
        ForgotPComponent,
        EnterCodePComponent,
        PdfInvoiceComponent,
        Printer,
        StatPdfAccountComponent,
        PdfVoiceComponent,
        PdfVoiceCallsComponent,
        AboutComponent,
        AccountSrcreenComponent,
        EventLogComponent,
        SelectAccountComponent,
        AccountFormGrpComponent,
        AccountNumberComponent,
        ConfirmationDialogComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        

        // provider used to create fake backend
        fakeBackendProvider,
        ProductsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };