import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { chartDemoComponent } from './chart/chartDemo.component'
import { MsalGuard } from '@azure/msal-angular';
import { HeroDetailComponent } from './hero-detail/hero-detail.component'

import { UserNotExsistComponent } from './user-not-exsist/user-not-exsist.component'
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '',canActivate: [MsalGuard] },  
  { path: "Chart", component: chartDemoComponent,canActivate: [MsalGuard] },
  { path: "UserNotExsist", component: UserNotExsistComponent,canActivate: [MsalGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
