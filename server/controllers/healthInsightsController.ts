import { Request, Response } from 'express';

export const getHealthInsights = async (req: Request, res: Response) => {
    const apiEndpoint = process.env.REACT_APP_AZURE_API_ENDPOINT;
    const apiKey = process.env.REACT_APP_AZURE_API_KEY;

    if (!apiEndpoint || !apiKey) {
        return res.status(500).json({ error: 'Azure API configuration is missing in environment variables.' });
    }

    try {
        const response = await fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};