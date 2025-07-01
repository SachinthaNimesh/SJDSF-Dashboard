export const API_URL =
  "/choreo-apis/employee-mgmt-system/student-mgmt-server/v1";

declare global {
  interface Window {
    config: {
      VITE_API_KEY: string;
      VITE_AZURE_CLIENT_ID: string;
      VITE_AZURE_TENANT_ID: string;
      apiUrl: string;
    };
  }
}

// Example of exporting the config if needed
export const appConfig = window.config;
