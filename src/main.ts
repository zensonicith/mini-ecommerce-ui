/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import {App} from './app/app';
import routeConfig from './app/route'
import { provideRouter } from '@angular/router';

bootstrapApplication(App, 
  {
    providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)]
  })
.catch((err) =>
  console.error(err),
);
