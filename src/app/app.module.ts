import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
    AuthHttpInterceptor,
    AuthModule,
    authHttpInterceptorFn,
  } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        AuthModule.forRoot({
            ...env.auth0,
            httpInterceptor: {
              allowedList: [
                {
                  uri: `${env.api.starwarsApiUrl}/api/movie/protected`
                },
                {
                  uri: `${env.api.starwarsApiUrl}/api/movie/secured`
                },
                {
                  uri: `${env.api.starwarsApiUrl}/api/movie`,
                  httpMethod: 'POST'
                },
                {
                  uri: `${env.api.starwarsApiUrl}/api/movie/*`,
                  httpMethod: 'DELETE'
                }
              ]
            }
        })
    ],
    providers: [
        provideHttpClient(), 
        provideAnimationsAsync(),
        AuthHttpInterceptor,
        provideHttpClient(withInterceptors([authHttpInterceptorFn]))
    ]
})
export class AppModule { }
