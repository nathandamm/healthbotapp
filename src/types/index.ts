export interface Config {
    apiEndpoint: string;
    apiKey: string;
}

export interface TrialMatcherRequest {
    jobData: {
        Configuration: {
            ClinicalTrials: {
                RegistryFilters: Array<{
                    Sources: string[];
                    Conditions: string[];
                    facilityLocations?: Array<{
                        State: string;
                        City: string;
                        countryOrRegion: string;
                    }>;
                }>;
            };
            IncludeEvidence: boolean;
            Verbose: boolean;
        };
        Patients: Array<{
            details: {
                sex?: string;
                birthDate?: string;
                ClinicalInfo: any[];
            };
            id: string;
        }>;
    };
}

export interface TrialMatcherResponse {
    result: {
        patientResults: Array<{
            patientId: string;
            inferences: Array<{
                type: string;
                clinicalTrialId: string;
                source: string;
                value: string;
                confidenceScore: number;
            }>;
        }>;
        knowledgeGraphLastUpdateDate?: string;
    };
}

export interface RadiologyInsightsRequest {
    jobData: {
        configuration: {
            inferenceOptions: {
                followupRecommendationOptions: {
                    includeRecommendationsWithNoSpecifiedModality: boolean;
                    includeRecommendationsInReferences: boolean;
                    provideFocusedSentenceEvidence: boolean;
                };
                findingOptions: {
                    provideFocusedSentenceEvidence: boolean;
                };
            };
            inferenceTypes: string[];
            locale: string;
            verbose: boolean;
            includeEvidence: boolean;
        };
        patients: Array<{
            id: string;
            details?: {
                sex?: string;
                birthDate?: string;
                clinicalInfo?: any[];
            };
            encounters: Array<{
                id: string;
                period: {
                    start: string;
                    end: string;
                };
                class: string;
            }>;
            patientDocuments: Array<{
                type: string;
                clinicalType: string;
                id: string;
                language: string;
                authors: Array<{
                    id: string;
                    fullName: string;
                }>;
                specialtyType: string;
                createdAt: string;
                administrativeMetadata: {
                    orderedProcedures: Array<{
                        code: {
                            coding: Array<{
                                system: string;
                                code: string;
                                display: string;
                            }>;
                        };
                        description: string;
                    }>;
                    encounterId: string;
                };
                content: {
                    sourceType: string;
                    value: string;
                };
            }>;
        }>;
    };
}

export interface RadiologyInsightsResponse {
    result: {
        patientResults: Array<{
            patientId: string;
            inferences: Array<{
                kind: string;
                lateralityIndication?: {
                    coding: Array<{
                        system: string;
                        code: string;
                        display: string;
                    }>;
                };
                discrepancyType?: string;
            }>;
        }>;
    };
    id: string;
    createdDateTime: string;
    expirationDateTime: string;
    lastUpdateDateTime: string;
    status: string;
}