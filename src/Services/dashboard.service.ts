import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from 'src/app/Common/ApiCall';

@Injectable({
  providedIn: 'root'
})
export class DashboardService { 

  constructor(private httpApiService: ApiHttpService) 
  {       
  }
   
  OrganizationChart(): Observable<any[]>{    
    return this.httpApiService.post('api/OrganizationChart?searchTerm=&sortColumn=&sortOrder=&page=1&pageSize=50',null);
  }

  GetReportingTo(ManagerId:number): Observable<any[]>{ 
    let param:any={ "ManagerId":ManagerId};   
    return this.httpApiService.post('api/OrganizationChart/GetReportingTo?ManagerId='+ManagerId,param);
  }
  GetOrgnisationdetailesById(Id:string,UserPrincipalName:string): Observable<any[]>{ 
    
    let param:any={ "Id":Id};   
    return this.httpApiService.post('api/OrganizationChart/GetOrgnisationdetailesById?Id='+Id+"&UserPrincipalName="+UserPrincipalName,param);
  }
  
  Organizational_Vulnerability(OrganizationalId:number): Observable<any[]>{ 
    let param:any={ "OrganizationalId":OrganizationalId};   
    return this.httpApiService.post('api/OrganizationChart/Organizational_Vulnerability?OrganizationalId='+OrganizationalId,param);
  }
}
