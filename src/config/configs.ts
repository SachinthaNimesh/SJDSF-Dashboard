export const API_URL = 'https://87e89eab-95e5-4c0f-8192-7ee0196e1581-dev.e1-us-east-azure.choreoapis.dev/employee-mgmt-system/student-mgmt-server/v1.0';

declare global {
    interface Window {
        config: {
            VITE_AZURE_TENANT_ID: string;
            VITE_AZURE_CLIENT_ID: string;
            VITE_API_KEY: string;
        };
    }
}

console.log("Window Config:", window.config);

// Example of exporting the config if needed
export const appConfig = window.config;