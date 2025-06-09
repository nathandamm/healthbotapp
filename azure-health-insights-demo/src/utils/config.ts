export const loadConfig = () => {
    return {
        apiEndpoint: process.env.AZURE_API_ENDPOINT || '',
        apiKey: process.env.AZURE_API_KEY || ''
    };
};