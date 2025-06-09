import axios from 'axios';

const BASE_URL = 'https://your-azure-ai-health-insights-endpoint.com'; // Replace with your endpoint

export const fetchHealthInsights = async (apiKey: string, endpoint: string): Promise<any> => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`, {
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching health insights:', error);
        throw error;
    }
};

export const postHealthInsights = async (apiKey: string, endpoint: string, data: any): Promise<any> => {
    try {
        const response = await axios.post(`${BASE_URL}/${endpoint}`, data, {
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error posting health insights:', error);
        throw error;
    }
};