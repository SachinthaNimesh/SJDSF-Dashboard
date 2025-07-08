export const API_URL =
  "https://a01f05ac-d5db-4f40-967f-6a0f97a713d2-dev.e1-us-east-azure.preview-dv.choreoapis.dev/sjdsf/server/v1.0";
// ("/choreo-apis/employee-mgmt-system/student-mgmt-server/v1");
// https://e4fabb2f-4692-4208-91a3-f373545b57ff-dev.e1-us-east-azure.st.choreoapis.dev/sjdsf/server/v1.0
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
