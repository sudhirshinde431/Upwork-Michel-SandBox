import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiHttpService } from '../Common/ApiCall';
import { DashboardService } from '../../Services/dashboard.service';
import { Input } from '@angular/core';
import { directReporting } from '../models/reporting';
import { Organizational_Vulnerability } from '../models/Organizational_Vulnerability';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions


} from "ng-apexcharts";
import { __awaiter } from 'tslib';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chartDemo.component.html',
  styleUrls: ['./chartDemo.component.css']
})


export class chartDemoComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @ViewChild("chart1") chart1: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  public LoginUserId: string = globalThis.LoginUserPrincipalName;
  public LoginUserPrincipalName: string = globalThis.LoginUserPrincipalName;
  loginusermodel: any = [];
  selectedusermodel: any = [];
  loginusermodelKey: string = globalThis.LoginUserPrincipalName;
  loginuserOrganizational_Vulnerability: any = [];



  public directReportingList: directReporting[] = [];




  constructor(private apiCall: ApiHttpService,
    private dashboardService: DashboardService,
    private authService: MsalService,
    private http: HttpClient
  ) {

    this.LoginUserPrincipalName = globalThis.LoginUserPrincipalName;
    this.GetOrgnisationdetailesById("", false, String(this.LoginUserPrincipalName))
  }


  clickuser(managerId: string) {
    this.GetOrgnisationdetailesById(String(managerId), true)

  }

  GetReportingTo(managerId: string) {
    this.dashboardService.GetReportingTo(Number(managerId))
      .subscribe(Response => {
        this.directReportingList = Response;
      });

  }

  GetOrganizational_Vulnerability(OrganizationalId: string) {
    this.dashboardService.Organizational_Vulnerability(Number(OrganizationalId))
      .subscribe(Response => {

        this.loginuserOrganizational_Vulnerability = Response[0];
      });

  }


  GetOrgnisationdetailesById(Id: string, isclickedUser: boolean = false, UserPrincipalName: string = "") {
    this.dashboardService.GetOrgnisationdetailesById(String(Id), String(UserPrincipalName))
      .subscribe(Response => {
        if (isclickedUser == false) {

          this.loginusermodel = Response;
          this.LoginUserId = this.loginusermodel.id;
          this.GetOrganizational_Vulnerability(String(this.LoginUserId))
        }
        this.selectedusermodel = Response;

        if (this.selectedusermodel != null) {
          if (this.selectedusermodel.id != "") {
            this.GetReportingTo(String(this.selectedusermodel.id));
            this.getChartDate(String(this.selectedusermodel.id))
          }
          else {
            this.GetReportingTo(String(this.LoginUserId));
            this.getChartDate(String(this.LoginUserId))
          }
        }
        else {
          this.GetReportingTo(String(this.LoginUserId));
          this.getChartDate(String(this.LoginUserId))
        }
      });

  }

  getChartDate(Id: string) {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

  }


  ngOnInit(): void {



  }





}