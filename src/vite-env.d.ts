/// <reference types="vite/client" />
// Add your custom window._env_ type definition
interface Window {
    _env_: {
        API_HOST: string;
        API_PORT: string;
        API_PATH: string;
        API_VERSION: string;
        [key: string]: string;
    };
}