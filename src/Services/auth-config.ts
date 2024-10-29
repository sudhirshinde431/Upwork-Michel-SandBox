// src/app/auth-config.ts
import { Configuration, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '10db189e-8288-4ef1-875e-8a6fab5f82dd', // Replace with your client ID
    authority: 'https://login.microsoftonline.com/6668e656-39be-40ba-8dcd-dfcde2cf7d0c', // Replace with your tenant ID
    redirectUri: 'http://localhost:4200', // Replace with your redirect URI
    
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: isIE(), // Set this to true for IE 11 or older
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
        }
      },
    },
  },
};

function isIE(): boolean {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ') > -1;
  const trident = ua.indexOf('Trident/') > -1;
  return msie || trident;
}

export const loginRequest = {
  scopes: ['User.Read'],
};
