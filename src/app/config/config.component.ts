import { Component, OnInit } from '@angular/core';
import { Config, ConfigService } from './config.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ ConfigService ],
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  loginForm: NgForm;
  error: any;
  headers: string[];
  config: Config;
  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
  }
  showConfig() {
    this.configService.getConfig()
      .subscribe((data: Config) => this.config = {
        sqlservsUrl: (data as any).sqlservsUrl,
        textfile:  (data as any).textfile
      });
  }
  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
  
        // access the body directly, which is typed as `Config`.
        this.config = { ... resp.body };
      });
  }
   
}
