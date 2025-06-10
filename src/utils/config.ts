import { Config } from '../types';

// In Create React App, env variables are automatically loaded from .env files
export const getConfig = (): Config => {
    const apiEndpoint = process.env.REACT_APP_AZURE_API_ENDPOINT;
    const apiKey = process.env.REACT_APP_AZURE_API_KEY;

    if (!apiEndpoint || !apiKey) {
        throw new Error('Azure API configuration is missing. Please check config/.env file for REACT_APP_AZURE_API_ENDPOINT and REACT_APP_AZURE_API_KEY');
    }

    return {
        apiEndpoint,
        apiKey
    };
};