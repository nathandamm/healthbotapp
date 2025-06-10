import axios from 'axios';
import { Config } from '../types';

import { getConfig } from '../utils/config';

const getBaseUrl = () => {
    const config = getConfig();
    return config.apiEndpoint.endsWith('/')
        ? config.apiEndpoint.slice(0, -1)
        : config.apiEndpoint;
};

export interface TextAnalyticsResponse {
    sentiment: {
        score: number;
        label: string;
    };
    keyPhrases: string[];
    entities: Array<{
        text: string;
        category: string;
        confidence: number;
    }>;
}

export interface MedicalEntityResponse {
    entities: Array<{
        text: string;
        category: string;
        confidence: number;
    }>;
}

export interface ClinicalInsightResponse {
    insights: Array<{
        category: string;
        finding: string;
        confidence: number;
        evidence: string;
    }>;
}

export const analyzeText = async (text: string): Promise<TextAnalyticsResponse> => {
    try {
        const config = getConfig();
        const response = await axios.post(
            `${getBaseUrl()}/text/analyze`,
            { text },
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': config.apiKey,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error analyzing text:', error);
        throw error;
    }
};

export const extractMedicalEntities = async (text: string): Promise<MedicalEntityResponse> => {
    try {
        const config = getConfig();
        const response = await axios.post(
            `${getBaseUrl()}/entities/medical`,
            { text },
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': config.apiKey,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error extracting medical entities:', error);
        throw error;
    }
};

export const analyzeClinicalText = async (text: string): Promise<ClinicalInsightResponse> => {
    try {
        const config = getConfig();
        const response = await axios.post(
            `${getBaseUrl()}/clinical/analyze`,
            { text },
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': config.apiKey,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error analyzing clinical text:', error);
        throw error;
    }
};