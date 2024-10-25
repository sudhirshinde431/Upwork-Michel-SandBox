import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from 'src/app/Common/ApiCall';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService { 

    constructor(private httpApiService: ApiHttpService) 
    {       
    }

    ValidateUser(userName:string): Observable<any[]>{ 
      let param:any={ "userName":userName};   
      return this.httpApiService.post('api/Authentication/ValidateUser?userName='+userName,param);
    }
   
}