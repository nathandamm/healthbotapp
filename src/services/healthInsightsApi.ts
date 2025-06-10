import axios from 'axios';
import { Config } from '../types';

const getBaseUrl = (config: Config) => {
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

export const analyzeText = async (
    config: Config,
    text: string
): Promise<TextAnalyticsResponse> => {
    try {
        const response = await axios.post(
            `${getBaseUrl(config)}/text/analyze`,
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

export const extractMedicalEntities = async (
    config: Config,
    text: string
): Promise<MedicalEntityResponse> => {
    try {
        const response = await axios.post(
            `${getBaseUrl(config)}/entities/medical`,
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

export const analyzeClinicalText = async (
    config: Config,
    text: string
): Promise<ClinicalInsightResponse> => {
    try {
        const response = await axios.post(
            `${getBaseUrl(config)}/clinical/analyze`,
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