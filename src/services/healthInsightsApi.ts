import axios from 'axios';
import { getConfig } from '../utils/config';
import { TrialMatcherRequest, RadiologyInsightsRequest, TrialMatcherResponse, RadiologyInsightsResponse } from '../types';

const getBaseUrl = () => {
    const config = getConfig();
    return config.apiEndpoint.endsWith('/')
        ? config.apiEndpoint.slice(0, -1)
        : config.apiEndpoint;
};

// Utility function to generate a random alphanumeric jobId up to 36 characters
const generateJobId = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 36; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export const submitTrialMatcherJob = async (request: TrialMatcherRequest): Promise<{ jobId: string }> => {
    try {
        const config = getConfig();
        const jobId = generateJobId();
        const response = await axios.put(
            `${getBaseUrl()}/health-insights/trial-matcher/jobs/${jobId}`,
            request,
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': config.apiKey,
                    'Content-Type': 'application/json',
                },
                params: {
                    'api-version': '2024-08-01-preview',
                },
            }
        );
        return { jobId: response.data.id };
    } catch (error) {
        console.error('Error submitting trial matcher job:', error);
        throw error;
    }
};

export const getTrialMatcherResults = async (jobId: string): Promise<TrialMatcherResponse> => {
    try {
        const config = getConfig();
        const response = await axios.get(
            `${getBaseUrl()}/health-insights/trial-matcher/jobs/${jobId}`,
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': config.apiKey,
                },
                params: {
                    'api-version': '2024-08-01-preview',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error getting trial matcher results:', error);
        throw error;
    }
};

export const submitRadiologyInsightsJob = async (request: RadiologyInsightsRequest): Promise<{ jobId: string }> => {
    try {
        const config = getConfig();
        const jobId = generateJobId();
        const response = await axios.put(
            `${getBaseUrl()}/health-insights/radiology-insights/jobs/${jobId}`,
            request,
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': config.apiKey,
                    'Content-Type': 'application/json',
                },
                params: {
                    'api-version': '2024-04-01',
                },
            }
        );
        return { jobId: response.data.id };
    } catch (error) {
        console.error('Error submitting radiology insights job:', error);
        throw error;
    }
};

export const getRadiologyInsightsResults = async (jobId: string): Promise<RadiologyInsightsResponse> => {
    try {
        const config = getConfig();
        const response = await axios.get(
            `${getBaseUrl()}/health-insights/radiology-insights/jobs/${jobId}`,
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': config.apiKey,
                },
                params: {
                    'api-version': '2024-04-01',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error getting radiology insights results:', error);
        throw error;
    }
};