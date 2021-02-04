import { enableProdMode ,NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { AppModule } from './app/app.module';
enableProdMode();
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  const platform = platformBrowserDynamic();
  platform.bootstrapModule(AppModule);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
