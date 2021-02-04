import { Injectable, ɵɵresolveBody, ɵɵi18nAttributes } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { map ,tap, delay} from 'rxjs/operators';
import {Md5} from 'ts-md5/dist/md5';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { NgxXml2jsonService } from 'ngx-xml2json';
import * as converter from 'xml-js';
import * as firebase from 'firebase';


import { User,CurrUser,inv,invsummary} from '../_models';
import { stringify } from 'querystring';
import { dateFieldName } from '@progress/kendo-angular-intl';

var headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/json');
headers_object.append("Authorization", "Basic " + btoa("username:password"));

const httpOptions = {
  headers: headers_object
};


var header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Basic ${btoa("ADMIN:test123")}`)
  }
  


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    private invSubject: BehaviorSubject<invsummary>;
    public currentUser: Observable<User>;
    public mobile: Observable<invsummary>;
    public Uname: CurrUser
    public fullurl: string;
    public item: string;
    public str: string;
    public url_all: string;
    //public url_server = "http://localhost:8091";
 //   public url_server = "http://192.168.43.167:8091";
     public url_server = "http://gmashro.com:8091";
   //  public url_server = "http://localhost:8091";
    public Username: string;
     public objs: any = {};
     public last_objs: any = {};
    public jsonbasex: any = {};

    constructor(private http: HttpClient,private ngxXml2jsonService: NgxXml2jsonService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.invSubject = new BehaviorSubject<invsummary>(JSON.parse(localStorage.getItem('mobileinv')));
        this.mobile = this.invSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get mobileValue(): invsummary {
        return this.invSubject.value;
    }

/* makeLogin(login: string, pass: string)  {
    const body = {user: login, password: pass};

    this.http.post(this.loginUrl, body)
    .subscribe(data => {...},
    err => {
      console.log('Error: ' + err.error);
      console.log('Name: ' + err.name);
      console.log('Message: ' + err.message);
      console.log('Status: ' + err.status);
    });
    */
   // http://localhost:8000/api/login?format=json&query=GET_usersauth&NAME='fuad'&PASSWORD='test12345'

     
 /*
let myObj = { name: 'Skip', breed: 'Labrador' };
localStorage.setItem(key, JSON.stringify(myObj));

// Read item:
let item = JSON.parse(localStorage.getItem(key));

*/

resetPassword(email: string) {
  var auth = firebase.auth();
  try {
         auth.sendPasswordResetEmail(email);
        return console.log("email sent");
    }
    catch (error) {
        return console.log(error);
    }
}

   
    login(username: string, password: string) {
        const md5 = new Md5();
        
            this.url_all = this.url_server + "/api?_format=json&_query=GET_usersauth&NAME=" + "'" + username + "'" + "&PASSWORD=" +"'" + md5.appendStr(password).end() +"'";

            const body = { title: 'Angular POST Request Example' }    
            const headers = { 'Authorization': "Basic " + btoa("ADMIN:test123") } ;
       console.log("URL===",this.url_all)
     
       return this.http.post<any>(this.url_all, body ,{ headers} )
           .pipe(map(hani => {
                // login successful if there's a jwt token in the response
                this.fullurl = JSON.stringify(hani.data);
              //  console.log("JSONDATE",this.fullurl);
                           
                if (hani ) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                   localStorage.setItem('currentUser', JSON.stringify(hani.data));

                   localStorage.setItem('username', username);
               

                    
                     this.currentUserSubject.next(hani);
                }
                
                return hani;
            }));
           

           
    }

    

    register(firstname: string,lastname: string,username: string, password: string) {
      const md5 = new Md5();
      
          this.url_all = this.url_server + "/api?_format=json&_query=register_users&FIRSTNAME=" + "'" + firstname + "'" + "&LASTNAME=" + "'" + lastname + "'"  + "&NAME=" + "'" + username + "'" +"&PASSWORD=" +"'" + md5.appendStr(password).end() +"'";

          const body = { title: 'Angular POST Request Example' }    
          const headers = { 'Authorization': "Basic " + btoa("ADMIN:test123") } ;
     console.log("URL===",this.url_all)
   
     return this.http.post<any>(this.url_all, body ,{ headers} )
         .pipe(map(hani => {
              // login successful if there's a jwt token in the response
              this.fullurl = JSON.stringify(hani.data);
            //  console.log("JSONDATE",this.fullurl);
                         
              if (hani ) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                 localStorage.setItem('currentUser', JSON.stringify(hani.data));

                 localStorage.setItem('username', username);
             

                  
                   this.currentUserSubject.next(hani);
              }
              
              return hani;
          }));
         

         
  }
 

  check_login(mobilenum: string) {
       
        
    this.url_all = this.url_server + "/api?_FORMAT=json&_query=check_login&NAME=" + mobilenum ;
    


    const body = { title: 'Angular POST Request Example' }    
    const headers = { 'Authorization': "Basic " + btoa("ADMIN:test123") } ;

console.log("URL_CHECK_LOGIN",this.url_all);

//    console.log("URL====:",this.url_all);
return this.http.get<any>(this.url_all )
   .pipe(map(data => {
        // login successful if there's a jwt token in the response
      //  this.fullurl = JSON.stringify(data);
      //  console.log("JSONDATE",this.fullurl);
              
      //  console.log("DATA of CHECK_LOIGN",data)
        
        return data;
    }));
   

   
}


check_macaddress() {
       
       
  this.url_all = this.url_server + "/api/macaddress?" ;
  



return this.http.get<any>(this.url_all )
 .pipe(map(data => {
           
      return data;
  }));
 

 
}

check_license() {
       
       
  this.url_all = this.url_server + "/api/license?" ;
  



return this.http.get<any>(this.url_all )
 .pipe(map(data => {
           
      return data;
  }));
 

 
}
  
  check_mobile(mobilenum: string) {
       
        
    this.url_all = this.url_server + "/api/presssubno?SUBNO=" + mobilenum  ;
    


    const body = { title: 'Angular POST Request Example' }    
    const headers = { 'Authorization': "Basic " + btoa("ADMIN:test123") } ;

    console.log("URL====:",this.url_all);
return this.http.get<any>(this.url_all )
   .pipe(map(data => {
        // login successful if there's a jwt token in the response
      //  this.fullurl = JSON.stringify(data);
      //  console.log("JSONDATE",this.fullurl);
        
        return data;
    }));
   

   
}

check_voice(mobilenum: string , inv_date: string) {
       
        
  this.url_all = this.url_server + "/api/presscheckvoice?SUBNO=" + mobilenum  + "&INVDATE=" + inv_date;
  


  const body = { title: 'Angular POST Request Example' }    
  const headers = { 'Authorization': "Basic " + btoa("ADMIN:test123") } ;

  console.log("URL====:",this.url_all);
return this.http.get<any>(this.url_all )
 .pipe(map(data => {
      // login successful if there's a jwt token in the response
    //  this.fullurl = JSON.stringify(data);
    //  console.log("JSONDATE",this.fullurl);
      
      return data;
  }));
 

 
}



    invsummary(mobilenum: string, invdate: string) {
       
        
            this.url_all = this.url_server + "/api/pressmain?SUBNO=" + mobilenum + "&INVDATE=" + invdate;
            


            const body = { title: 'Angular POST Request Example' }    
            const headers = { 'Authorization': "Basic " + btoa("ADMIN:test123") } ;
       
          console.log("URL====:",this.url_all);
       return this.http.get<any>(this.url_all )
           .pipe(map(data => {
                // login successful if there's a jwt token in the response
              //  this.fullurl = JSON.stringify(data);
              //  console.log("JSONDATE",this.fullurl);
                      
                
                
                return data;
            }));
           

           
    }

    invcontrno(mobilenum: string, invdate: string) {
       
        
      this.url_all = this.url_server + "/api/presscontrno?SUBNO=" + mobilenum + "&INVDATE=" + invdate;
      
     

      const body = { title: 'Angular POST Request Example' }    
      const headers = { 'Authorization': "Basic " + btoa("ADMIN:test123") } ;
 
    console.log("URL====:",this.url_all);
    return this.http.get<any>(this.url_all )
     .pipe(map(data => {
      var  queryrows2;
      var allRows2 = [];    

     // console.log(data.data,data.data.length);
      for(var i=0;i<data.data.length;i++)
        {
         
                 var result1 = JSON.parse(converter.xml2json(data.data[i], {compact: true, spaces: 2}));
             // console.log("contro_before",result1);
        queryrows2 = 
        {
        "ID":   i,
        "SUB_NO": result1.SUB_INFO._attributes.SUB_NO,
        "IV_NO": result1.SUB_INFO._attributes.IV_NO,
        "AMOUNT": result1.SUB_INFO._attributes.AMOUNT,
        "Discontinued": false
                                          
        }
      allRows2.push(queryrows2);
               
                 }
            
                 data.data = allRows2;

          return data;
      }));
     

     
}


invsubno(mobilenum: string) {
       
        
  this.url_all = this.url_server + "/api/press_subno?SUBNO=" + mobilenum ;
  
 

  const body = { title: 'Angular POST Request Example' }    
  const headers = { 'Authorization': "Basic " + btoa("ADMIN:test123") } ;

console.log("URL====:",this.url_all);
return this.http.get<any>(this.url_all )
 .pipe(map(data => {
  var  queryrows2;
  var allRows2 = [];    

  console.log("DATA for subno HF Please",data.data);
 // console.log(data.data,data.data.length);
  for(var i=0;i<data.data.length;i++)
    {
     
             var result1 = JSON.parse(converter.xml2json(data.data[i], {compact: true, spaces: 2}));
                      console.log("DATA inside result1 HF Please",result1);
    queryrows2 = 
    {
   
    "INVDATE": result1.INVOICE_DATE._text
                                         
    }
  allRows2.push(queryrows2);
           
     }
        
             data.data = allRows2;
             console.log("Data Before exit HF Please",data.data)

      return data.data;
  }));
 

 
}

inv4contrno(mobilenum: string) {
       
        
  this.url_all = this.url_server + "/api/press_contrno?SUBNO=" + mobilenum ;
  
 

  const body = { title: 'Angular POST Request Example' }    
  const headers = { 'Authorization': "Basic " + btoa("ADMIN:test123") } ;

console.log("URL====:",this.url_all);
return this.http.get<any>(this.url_all )
 .pipe(map(data => {
  var  queryrows2;
  var allRows2 = [];    

  console.log("DATA for subno HF Please",data.data);
 // console.log(data.data,data.data.length);
  for(var i=0;i<data.data.length;i++)
    {
     
             var result1 = JSON.parse(converter.xml2json(data.data[i], {compact: true, spaces: 2}));
                      console.log("DATA inside result1 HF Please",result1);
    queryrows2 = 
    {
   
    "INVDATE": result1.INVOICE_DATE._text
                                         
    }
  allRows2.push(queryrows2);
           
     }
        
             data.data = allRows2;
             console.log("Data Before exit HF Please",data.data)

      return data.data;
  }));
 

 
}



invcontrnoinfo( invdate: string,mobilenum: string) {
       
        
  this.url_all = this.url_server + "/api/presscontrinfo?INVDATE=" + invdate + "&SUBNO=" + mobilenum;
  
 
  console.log("URLCONTRINFO:",this.url_all);
  return this.http.get<any>(this.url_all )
      .pipe(map(data => {
        var  queryrows2;
        var allRows2 = [];    
  
        console.log(data.data,data.data.length);
        for(var i=0;i<data.data.length;i++)
        {
        

                 var result1 = JSON.parse(converter.xml2json(data.data[i], {compact: true, spaces: 2}));
            console.log("CON_RESULTS",result1);
       
                 queryrows2 = 
                 {
                 "NAME": result1.ACC_INFO.NAME._text,
                 "CONTRNO": result1.ACC_INFO.ACC_NO._text,
                 "INVOICE_NO": result1.ACC_INFO.INVOICE_NO._text,
                 "BILLING_PERIOD": result1.ACC_INFO.BILLING_PERIOD._text,
                 "INVOICE_DATE": result1.ACC_INFO.INVOICE_DATE._text,
                 "DUEDATE": result1.ACC_INFO.DUE_DATE._text,
                 "PREV_BAL": result1.ACC_INFO.PREV_BAL._text,
                 "TOT_SUB_BAL": result1.ACC_INFO.TOT_SUB_INV._text,
                 "TOT_NET_BAL": result1.ACC_INFO.TOT_NET_PAID._text

                                                   
                 }
               allRows2.push(queryrows2);
                        
         }
                     
                          data.data = allRows2;
                          console.log("continfo",data.data)
                        
         
                   return data;
               }));

     
 
}


    // http://localhost:8090/api/press?_FORMAT=json&SUBNO=0880466210&INVDATE=31/10/2019 , here we can put post to XML to JSON

    invsumm(mobilenum: string, invdate: string) {
       
        
        this.url_all = this.url_server + "/api/presssum?SUBNO=" + mobilenum + "&INVDATE=" + invdate;
        


        const body = { title: 'Angular POST Request Example' }    
        const headers = { 'Authorization': "Basic " + btoa("ADMIN:test123") } ;
   

           var startdate = new Date();

    console.log("STARTDATE before invsumm",startdate);
    var  queryrows2: { service: any; amount: any; };
    var allRows2 = [];    
     
   return this.http.get<any>(this.url_all)
       .pipe(map(sum => {
       

        var startdate1 = new Date();

        console.log("STARTDATE after server",startdate1);

        for(var i=0;i<sum.data.length;i++)
        {
         
                 var result1 = JSON.parse(converter.xml2json(sum.data[i], {compact: true, spaces: 2}));
   
         
        queryrows2 = 
        {
        "service": result1.DETAILS._attributes.DESCRIPTION,
        "amount": result1.DETAILS._attributes.AMOUNT
                                          
        }
      allRows2.push(queryrows2);
      
        }
   
        sum.data = allRows2;
   
        var enddate = new Date();

        console.log("ENDDATE AFTER invsumm",enddate); 
            
            return sum;
        }));
       

       
}

invtax(mobilenum: string, invdate: string) {
       
        
  this.url_all = this.url_server + "/api/presstax?SUBNO=" + mobilenum ;
  


  const body = { title: 'Angular POST Request Example' }    
  const headers = { 'Authorization': "Basic " + btoa("ADMIN:test123") } ;


return this.http.get<any>(this.url_all)
 .pipe(map(sum => {
  var  queryrows2;
  var allRows2 = [];    

  
  for(var i=0;i<sum.data.length;i++)
  {
   
   
  var result1 = JSON.parse(converter.xml2json(sum.data[i], {compact: true, spaces: 2}));

   
  queryrows2 = 
  {
  "service": "Discount Amount",
  "amount": result1.SUB_DETAIL._attributes.SUB_DISC
  }
allRows2.push(queryrows2);

queryrows2 = 
  {
  "service": "GST %15",
  "amount": result1.SUB_DETAIL._attributes.SUB_TAX
  }
allRows2.push(queryrows2);


 
  }

  sum.data = allRows2;

      
      return sum;
  }));
 

 
}


invdetdata(mobilenum: string, invdate: string) {
       
  
    this.url_all = this.url_server + "/api/pressdetdata?SUBNO=" + mobilenum + "&INVDATE=" + invdate;
    


    const body = { title: 'Angular POST Request Example' }    
    const headers = { 'Authorization': "Basic " + btoa("ADMIN:test123") } ;

  //  console.log("URL====:",this.url_all);
return this.http.get<any>(this.url_all )
   .pipe(map(sumdata => {
        // login successful if there's a jwt token in the response
      //  this.fullurl = JSON.stringify(sumdata);
      // console.log("JSONDATESUM",this.fullurl);
     // console.log("SUMDATA===",sumdata.data[0]);

 //    var startdate = new Date();

   //  console.log("STARTDATE before loop",startdate);
    // console.log("LENGTH",sumdata.data.length);
    
var  queryrows2;
var allRows2 = [];
     for(var i=0;i<sumdata.data.length;i++)
     {
      
      
     var result1 = JSON.parse(converter.xml2json(sumdata.data[i], {compact: true, spaces: 2}));

    
     queryrows2 = 
     {
     "DATE": result1.DETAILS._attributes.DATE,
     "TIME": result1.DETAILS._attributes.TIME,
     "BSUBNO":  result1.DETAILS._attributes.NUMBER,
     "DESCRIPTION":  'Data',
     "CALLTYPE":  'Data Call',
      "DURATION":  result1.DETAILS._attributes.DURATION,
     "AMOUNT": result1.DETAILS._attributes.AMOUNT
                               
     }
   allRows2.push(queryrows2);

    
    // console.log(result1.DETAILS._attributes.AMOUNT);
     }

     sumdata.data = allRows2;

     var startdate = new Date();

     console.log("data: after looing ENDDATE",startdate);
    
   //  var enddate = new Date();

    // console.log("ENDDATE after loop",enddate);


/*
      const parser = new DOMParser();
      const xml = parser.parseFromString(sumdata.data[0], 'text/xml');
      const obj = this.ngxXml2jsonService.xmlToJson(xml);
      this.objs = obj;
      console.log("OBJ",this.objs.DETAILS);
    
      
    this.jsonbasex = JSON.stringify(this.last_objs, null, 4);
    this.jsonbasex = this.jsonbasex.replace("@attributes","VALUE");
      console.log("OBJSSSSSS",this.jsonbasex);
         
     */

     //   console.log(sumdata);

             
        return sumdata;
    }));
   

   
}

invdetvoice(mobilenum: string, invdate: string) {
       
        
    this.url_all = this.url_server + "/api/pressdetvoice?SUBNO=" + mobilenum + "&INVDATE=" + invdate;
    
    localStorage.setItem('disable_voice', 'N');

    const body = { title: 'Angular POST Request Example' }    
    const headers = { 'Authorization': "Basic " + btoa("ADMIN:test123") } ;

 //   console.log("URL====:",this.url_all);
return this.http.get<any>(this.url_all )
   .pipe(map(sum => {
       
   var  queryrows2;
   var allRows2 = [];


   
    for(var i=0;i<sum.data.length;i++)
    {
      //var result1 = JSON.parse(converter.xml2json(sum.data[i], {compact: true}));
      var result1 = JSON.parse(converter.xml2json(sum.data[i], {compact: true, spaces: 2}));

        var output5 = "Voice";
        var  output4 = "Voice";
        var output6 = result1.DETAILS._attributes.DURATION;
        if(result1.DETAILS._attributes.DURATION == '000000')
        {
          output5 = "SMS";
            output6 = "";
          output4 = "SMS";
        }
        queryrows2 = 
        {
          "DATE": result1.DETAILS._attributes.DATE,
          "TIME": result1.DETAILS._attributes.TIME,
          "BSUBNO":  result1.DETAILS._attributes.NUMBER,
          "DESCRIPTION":  output4,
          "CALLTYPE":  output5,
          "DURATION":  output6,
          "AMOUNT": result1.DETAILS._attributes.AMOUNT
        }
        allRows2.push(queryrows2);
     
    }
   
    sum.data = allRows2;
            return sum;
    }));
   

   
}

invchart(mobilenum: string, invdate: string) {
       
        
    this.url_all = this.url_server + "/api/pressinvstat?SUBNO=" + mobilenum + "&INVDATE=" + invdate;
    
var querychart;
var allRowschart = []; 

    const body = { title: 'Angular POST Request Example' }    
    const headers = { 'Authorization': "Basic " + btoa("ADMIN:test123") } ;

    // console.log("URL====:",this.url_all);
return this.http.get<any>(this.url_all )
   .pipe(map(sumchart => {
        
   // console.log("CHARTSSSSSSSS",sumchart.data)
        return sumchart.data;
    }));
   

   
}

invGet(mobilenum: string, invdate: string) {
  var resultJson = [];

  this.url_all = this.url_server + "/api/pressinvget?_FORMAT=json&SUBNO=" + mobilenum + "&INVDATE=" + invdate;
  const body = {
      title: 'Angular POST Request Example'
  }
  const headers = {
      'Authorization': "Basic " + btoa("ADMIN:test123")
  };
  // console.log("URL====:",this.url_all);
  return this.http.get < any > (this.url_all)
      .pipe(map(resultXML => {
        
        console.log("received resultXML.data.length:" + resultXML.data.length, new Date());
          for (var i = 0; i < resultXML.data.length; i++) {
              var resultRec = JSON.parse(converter.xml2json(resultXML.data[i], {
                  compact: true
              }));
              resultJson.push(resultRec)
          }
          console.log("converted to JSON resultXML.data.length:" + resultXML.data.length, new Date());
          return resultJson;
      }));
}

// http://localhost:8090/api/press?_FORMAT=json&SUBNO=0880466210&INVDATE=31/10/2019 , here we can put post to XML to JSON

invstatement(mobilenum: string, invdate: string) {
       
        
  this.url_all = this.url_server + "/api/pressstatement?SUBNO=" + mobilenum + "&INVDATE=" + invdate;
  


  const body = { title: 'Angular POST Request Example' }    
  const headers = { 'Authorization': "Basic " + btoa("ADMIN:test123") } ;

  console.log("Inside STATEMENT",this.url_all,mobilenum,invdate)

return this.http.get<any>(this.url_all )
 .pipe(map(sumdata => {
          
var  queryrows2;
var allRows2 = [];
   for(var i=0;i<sumdata.data.length;i++)
   {
    
     var result1 = JSON.parse(converter.xml2json(sumdata.data[i], {compact: true, spaces: 2}));

   queryrows2 = 
   {
   "SUB_NO": result1.SUB_INFO._attributes.SUB_NO + "  "+ "Invoice Number:" + "  " + result1.SUB_INFO._attributes.IV_NO,
   "AMOUNT":  result1.SUB_INFO._attributes.AMOUNT
                                
   }
 allRows2.push(queryrows2);
 

  
   }

  //  console.log("ALLROWSFORSTAT",allRows2);
   sumdata.data = allRows2;

           
      return sumdata;
  }));
 

 
}

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}