import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { switchMap } from 'rxjs/operators';
import {
  UserAgentApplication,
  AuthenticationParameters,
  Configuration,
} from "@azure/msal";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private msalService: MsalService) {}

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
      'https://management.azure.com/user_impersonation',
      'api://10db189e-8288-4ef1-875e-8a6fab5f82dd/.default'
    ]

  };

  myMSAL = new UserAgentApplication(this.config);


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
   // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyIsImtpZCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyJ9.eyJhdWQiOiJhcGk6Ly8xMGRiMTg5ZS04Mjg4LTRlZjEtODc1ZS04YTZmYWI1ZjgyZGQiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC82NjY4ZTY1Ni0zOWJlLTQwYmEtOGRjZC1kZmNkZTJjZjdkMGMvIiwiaWF0IjoxNzI3MTgzMTE0LCJuYmYiOjE3MjcxODMxMTQsImV4cCI6MTcyNzE4NzAxNCwiYWlvIjoiRTJkZ1lCQVNOV3o5ZGNCRTd2RGlwNWQyNWZWT0F3QT0iLCJhcHBpZCI6IjEwZGIxODllLTgyODgtNGVmMS04NzVlLThhNmZhYjVmODJkZCIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzY2NjhlNjU2LTM5YmUtNDBiYS04ZGNkLWRmY2RlMmNmN2QwYy8iLCJvaWQiOiI4MjA5N2VhNC1mNmI4LTRlYjEtOGU0Ni01NDI5YzhhNTg1NmUiLCJyaCI6IjAuQWNZQVZ1Wm9acjQ1dWtDTnpkX040czk5REo0WTJ4Q0lndkZPaDE2S2I2dGZndDNHQUFBLiIsInN1YiI6IjgyMDk3ZWE0LWY2YjgtNGViMS04ZTQ2LTU0MjljOGE1ODU2ZSIsInRpZCI6IjY2NjhlNjU2LTM5YmUtNDBiYS04ZGNkLWRmY2RlMmNmN2QwYyIsInV0aSI6InFYZTJSbmU2U1VXeF9OZmpwdUI4QUEiLCJ2ZXIiOiIxLjAifQ.b1Y1QI7kAG6ssijkd1GxaUn1MzLCJ1JWQwvf9lf5EPXg5evmWlat5PC7qnkPXkCbzZCkE8fEmuTG-_WyYRN7bZ1j4Q2h5lEXDBFzrrBxv1EWg968PE9xQawQjDROt5FHbI10_XTZ7td_lz7IV1HkdTh7RoKEq3igmUZnil298rKxNZVEzYh31uspTeSUP8ndAlcxY2vYZYsj3JFwqbVNlFsx-3-baFWCLjzxxeoSEnk5GmqTUgyxBDF4k2405_OJyvyU9xCBtrFpaChanhpgdBv0gitYw3x-LWozwkBy9VIrc6lIWnQeGRe4H4PCBGd1DL5xLqZlgVG_laePgf4-aw"
    const token = globalThis.token;
    
   
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
      .set('Access-Control-Allow-Origin', 'http://localhost:4200/')
      .set('Access-Control-Allow-Headers', 'Authorization')
    });
    return next.handle(cloned);
  }
}
