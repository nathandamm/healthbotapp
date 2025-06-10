export interface Config {
    apiEndpoint: string;
    apiKey: string;
}

export interface Entity {
    text: string;
    category: string;
    confidence: number;
}

export interface HealthInsightResponse {
    id: string;
    insights: Array<{
        category: string;
        finding: string;
        confidence: number;
        evidence: string;
    }>;
    timestamp: string;
}

export interface TextAnalysisResponse {
    sentiment: {
        score: number;
        label: string;
    };
    keyPhrases: string[];
    entities: Entity[];
}

export interface MedicalEntityResponse {
    entities: Entity[];
}

export interface ClinicalInsightResponse {
    insights: Array<{
        category: string;
        finding: string;
        confidence: number;
        evidence: string;
    }>;
}