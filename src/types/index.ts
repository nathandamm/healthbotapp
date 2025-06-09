export interface HealthInsightResponse {
    id: string;
    insights: string[];
    timestamp: string;
}

export interface Config {
    apiEndpoint: string;
    apiKey: string;
}