import React, { useState } from 'react';

const EndpointConfig: React.FC = () => {
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [apiKey, setApiKey] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle the submission of the API endpoint and key
        console.log('API Endpoint:', apiEndpoint);
        console.log('API Key:', apiKey);
        // Here you would typically send this data to your backend or save it in context
    };

    return (
        <div className="endpoint-config">
            <h2>Configure API Endpoint</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="apiEndpoint">API Endpoint:</label>
                    <input
                        type="text"
                        id="apiEndpoint"
                        value={apiEndpoint}
                        onChange={(e) => setApiEndpoint(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="apiKey">API Key:</label>
                    <input
                        type="text"
                        id="apiKey"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Save Configuration</button>
            </form>
        </div>
    );
};

export default EndpointConfig;