import axios from 'axios';
import { getConfig } from '../utils/config';
import { TrialMatcherRequest, RadiologyInsightsRequest, TrialMatcherResponse, RadiologyInsightsResponse } from '../types';

const getBaseUrl = () => {
    const config = getConfig();
    return config.apiEndpoint.endsWith('/')
        ? config.apiEndpoint.slice(0, -1)
        : config.apiEndpoint;
};

export const submitTrialMatcherJob = async (request: TrialMatcherRequest): Promise<{ jobId: string }> => {
    try {
        const config = getConfig();
        const response = await axios.post(
            `${getBaseUrl()}/trialmatcher/jobs`,
            request,
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': config.apiKey,
                    'Content-Type': 'application/json',
                },
            }
        );
        return { jobId: response.data.jobId };
    } catch (error) {
        console.error('Error submitting trial matcher job:', error);
        throw error;
    }
};

export const getTrialMatcherResults = async (jobId: string): Promise<TrialMatcherResponse> => {
    try {
        const config = getConfig();
        const response = await axios.get(
            `${getBaseUrl()}/trialmatcher/jobs/${jobId}`,
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': config.apiKey,
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
        const response = await axios.post(
            `${getBaseUrl()}/radiologyinsights/jobs`,
            request,
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': config.apiKey,
                    'Content-Type': 'application/json',
                },
            }
        );
        return { jobId: response.data.jobId };
    } catch (error) {
        console.error('Error submitting radiology insights job:', error);
        throw error;
    }
};

export const getRadiologyInsightsResults = async (jobId: string): Promise<RadiologyInsightsResponse> => {
    try {
        const config = getConfig();
        const response = await axios.get(
            `${getBaseUrl()}/radiologyinsights/jobs/${jobId}`,
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': config.apiKey,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error getting radiology insights results:', error);
        throw error;
    }
};