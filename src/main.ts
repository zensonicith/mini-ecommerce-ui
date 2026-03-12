/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import {App} from './app/app';
import routeConfig from './app/route'
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './app/interceptor/base-url.interceptor';
import { jwtInterceptor } from './app/interceptor/jwt.interceptor';
import { errorInterceptor } from './app/interceptor/error.interceptor';

bootstrapApplication(App, 
  {
    providers: [
      provideProtractorTestingSupport(),
      provideRouter(routeConfig),
      provideHttpClient(withFetch(), withInterceptors([baseUrlInterceptor, jwtInterceptor, errorInterceptor])),
    ]
  })
.catch((err) =>
  console.error(err),
);
