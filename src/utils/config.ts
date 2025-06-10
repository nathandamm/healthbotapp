import { Config } from '../types';

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from config/.env
config({ path: resolve(__dirname, '../../config/.env') });

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