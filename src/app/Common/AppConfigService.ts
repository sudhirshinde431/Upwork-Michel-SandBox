import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    public appConfig: any;

    constructor(private http: HttpClient) { }

    public loadAppConfig() {

        return this.http.get('/assets/Config.json')
            .toPromise()
            .then(data => {
                this.appConfig = data;
                return data;
            });
    }


    get EndPointUrl() {
        return "https://localhost:7131/";
    }

}