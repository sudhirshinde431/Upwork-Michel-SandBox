import { NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { chartDemoComponent } from './chart/chartDemo.component';
import { AppConfigService } from './Common/AppConfigService';
import { HttpClientModule, HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthInterceptor } from '../Services/AuthInterceptor';
import {  MsalInterceptorConfiguration, 
    MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import {  IPublicClientApplication } from '@azure/msal-browser';
import { MsalModule, MsalService, MsalGuard, MsalInterceptor, MsalBroadcastService } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;


export function initializeMsal(msalService: MsalService): () => Promise<void> {
  return () => msalService.instance.initialize();
}


@NgModule({
  declarations: [
    AppComponent,
    chartDemoComponent,
    SidebarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: '10db189e-8288-4ef1-875e-8a6fab5f82dd',
        authority: 'https://login.microsoftonline.com/6668e656-39be-40ba-8dcd-dfcde2cf7d0c',
        redirectUri: 'http://localhost:4200/Chart'
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE // set to true for IE 11
      }
    }), {
      interactionType: InteractionType.Redirect,
      authRequest: {
        //scopes: ['user.read']
        scopes: ['api://10db189e-8288-4ef1-875e-8a6fab5f82dd/.default']
      }
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        ['https://localhost:7131', ['api://10db189e-8288-4ef1-875e-8a6fab5f82dd/.default']]
      ])
    }),
    
    
  ],
  providers: [
   
    // {
    //   provide: APP_INITIALIZER,
    //   multi: true,
    //   deps: [AppConfigService],
    //   useFactory: (appConfigService: AppConfigService) => {
    //     return () => {
    //       return appConfigService.loadAppConfig();
    //     };
    //   }
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
