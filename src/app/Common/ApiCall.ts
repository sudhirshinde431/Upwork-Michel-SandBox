// Angular Modules 
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from './AppConfigService';
import { Observable, throwError } from 'rxjs';
import { MsalService } from '@azure/msal-angular';

let headers: HttpHeaders;
@Injectable({
  providedIn: 'root'
})



export class ApiHttpService {
  public requestOptions: any;
  public Token: string;
  public  isIE =  window.navigator.userAgent.indexOf('MSIE ') > -1 ||   window.navigator.userAgent.indexOf('Trident/') > -1;
  constructor(private http: HttpClient, private appConfigService: AppConfigService,
    private authService: MsalService
  ) {






  }
  public get(url: string, options?: any) {

   

    url = this.appConfigService.EndPointUrl + url;

    return this.http
      .get<any[]>(url);
  }

  public post(url: string, data: any): Observable<any[]> {
    url = this.appConfigService.EndPointUrl + url; 

      return this.http.post<any[]>(url, data)
    ;

  }

}