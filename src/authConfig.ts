import { Configuration, RedirectRequest } from "@azure/msal-browser";
import { appConfig } from "./config/configs";

// Debug logs to check appConfig values
console.log("appConfig:", appConfig);
console.log("VITE_AZURE_CLIENT_ID:", appConfig.VITE_AZURE_CLIENT_ID);
console.log("VITE_AZURE_TENANT_ID:", appConfig.VITE_AZURE_TENANT_ID);

// MSAL configuration

export const msalConfig: Configuration = {
  auth: {
    clientId: appConfig.VITE_AZURE_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${appConfig.VITE_AZURE_TENANT_ID}`,
    redirectUri: window.location.origin,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case 0:
            console.error(message);
            return;
          case 1:
            console.warn(message);
            return;
          case 2:
            console.info(message);
            return;
          case 3:
            console.debug(message);
            return;
          default:
            return;
        }
      },
      piiLoggingEnabled: false,
      logLevel: 3,
    },
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: RedirectRequest = {
  scopes: ["User.Read", "profile", "email", "openid"],
};

// Add here the endpoints for MS Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
