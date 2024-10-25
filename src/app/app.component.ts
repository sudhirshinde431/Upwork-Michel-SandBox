import { Component, VERSION, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AuthenticationResult } from '@azure/msal-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/Authentication.service';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import {
  UserAgentApplication,
  AuthenticationParameters,
  Configuration,
} from "@azure/msal";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent implements OnInit {
  sidebarExpanded = true;
  apiResponse: string;
  @ViewChild('myDiv') myDiv: ElementRef<HTMLElement>;

  config: Configuration = {
    auth: {
      clientId: '10db189e-8288-4ef1-875e-8a6fab5f82dd',
      authority: 'https://login.microsoftonline.com/6668e656-39be-40ba-8dcd-dfcde2cf7d0c',
      redirectUri: 'http://localhost:4200/Chart'
    },
  };

  params: AuthenticationParameters = {
    authority: 'https://login.microsoftonline.com/6668e656-39be-40ba-8dcd-dfcde2cf7d0c',
    scopes: [
      'https://management.azure.com/user_impersonation'
    ]

  };

  myMSAL = new UserAgentApplication(this.config);

  LoginUserData:any=null;



  constructor(private authService: MsalService,
     private http: HttpClient, private router: Router,
     private authenticationService: AuthenticationService,
     private msalService: MsalService,
     private msalBroadcastService: MsalBroadcastService
     ) {


   // this.Validateuser();

  }
   isLoggedIn() {  
    if(globalThis.LoginUserPrincipalName==undefined || globalThis.LoginUserPrincipalName==null)
    {
      return false;
    }
    else{
      return true;
    }
  }

  async Validateuser() {
    try {

      
      const login = await this.myMSAL.acquireTokenSilent({
        scopes: ['api://10db189e-8288-4ef1-875e-8a6fab5f82dd/.default'] // For your custom API
      })
      var Account = await this.myMSAL.getAccount();   
      // console.log(Account);
      // console.log(login);
      // console.log("Validateuser1");
     
      globalThis.LoginUserPrincipalName=Account.userName;
      globalThis.token = login.accessToken;
      await this.ValidateUser(globalThis.LoginUserPrincipalName);       
    } catch (error) {

      await this.myMSAL.loginPopup(this.params);
      const login = await this.myMSAL.acquireTokenSilent({
        scopes: ['api://10db189e-8288-4ef1-875e-8a6fab5f82dd/.default'] // For your custom API
      });
      globalThis.token = login.accessToken;
      var Account = await this.myMSAL.getAccount();
      globalThis.LoginUserPrincipalName=Account.userName;
      await this.ValidateUser(globalThis.LoginUserPrincipalName);     
      
    }


  }
  async ngOnInit(): Promise<any>  {

   
  // await this.msalService.instance.initialize();
    // if(this.isLoggedIn()!=false)
    // {
    //      var LogedInData:any=this.authService.instance.getActiveAccount(); 
    //      globalThis.LoginUserPrincipalName=LogedInData.username;
    //      globalThis.token=LogedInData.idToken;
    //    //  this.sayHello1();
    //     // console.log(this.sayHello1());

    // }else{


    // }






  }


   async ValidateUser(LoginUserPrincipalName: string) {
  await this.authenticationService.ValidateUser(LoginUserPrincipalName)
      .subscribe(Response => {
        if(Response!=null)
        {
          this.LoginUserData=Response;
          globalThis.LoginUserId=this.LoginUserData.id;
          this.router.navigate(['/Chart']);
        }
        else{
          this.router.navigate(['/UserNotExsist']);
        }
      
      });

  }








}
