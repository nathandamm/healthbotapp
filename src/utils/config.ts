import { Config } from '../types';

export const getConfig = (): Config => {
    const config = {
        apiEndpoint: process.env.REACT_APP_AZURE_API_ENDPOINT,
        apiKey: process.env.REACT_APP_AZURE_API_KEY
    };

    if (!config.apiEndpoint || !config.apiKey) {
        throw new Error('Azure API configuration is missing. Please check your .env file for REACT_APP_AZURE_API_ENDPOINT and REACT_APP_AZURE_API_KEY');
    }

    return config;
};