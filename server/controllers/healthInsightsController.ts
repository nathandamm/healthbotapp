export const getHealthInsights = async (req, res) => {
    const { endpoint, apiKey } = req.body;

    if (!endpoint || !apiKey) {
        return res.status(400).json({ error: 'Endpoint and API key are required.' });
    }

    try {
        const response = await fetch(endpoint, {
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
        res.status(500).json({ error: error.message });
    }
};