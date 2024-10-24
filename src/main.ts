import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

declare global {
  var LoginUserPrincipalName:string; 
  var LoginUserId:string; 
  var token:string; 
}
globalThis.Token = "default"
globalThis.CurrentLanguage = "nl"
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
