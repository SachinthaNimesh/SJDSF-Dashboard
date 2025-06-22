import { Configuration, RedirectRequest } from "@azure/msal-browser";
import { appConfig } from "./config/configs";

// --- Microsoft Sign-In Configuration ---
// Log appConfig for debugging
console.log("[MSAL] Loaded appConfig:", appConfig);

// Check for required Microsoft App registration values
if (!appConfig.VITE_AZURE_CLIENT_ID) {
  console.error("[MSAL] Missing VITE_AZURE_CLIENT_ID in appConfig. Microsoft sign-in will not work.");
}
if (!appConfig.VITE_AZURE_TENANT_ID) {
  console.error("[MSAL] Missing VITE_AZURE_TENANT_ID in appConfig. Microsoft sign-in will not work.");
}

// MSAL configuration for Microsoft Account sign-in
export const msalConfig: Configuration = {
  auth: {
    clientId: appConfig.VITE_AZURE_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${appConfig.VITE_AZURE_TENANT_ID}`,
    redirectUri: window.location.origin,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "sessionStorage", // Use sessionStorage for security
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case 0: console.error("[MSAL]", message); return;
          case 1: console.warn("[MSAL]", message); return;
          case 2: console.info("[MSAL]", message); return;
          case 3: console.debug("[MSAL]", message); return;
          default: return;
        }
      },
      piiLoggingEnabled: false,
      logLevel: 3,
    },
  },
};

// Scopes for Microsoft Identity Platform endpoints (Microsoft Graph)
export const loginRequest: RedirectRequest = {
  scopes: ["User.Read", "profile", "email", "openid"],
};

// Microsoft Graph API endpoints
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
