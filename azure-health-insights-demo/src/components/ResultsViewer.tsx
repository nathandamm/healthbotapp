import React from 'react';

const ResultsViewer: React.FC<{ results: any }> = ({ results }) => {
    return (
        <div className="results-viewer">
            <h2>Results Viewer</h2>
            {results ? (
                <pre>{JSON.stringify(results, null, 2)}</pre>
            ) : (
                <p>No results to display. Please enter your API endpoint and keys.</p>
            )}
        </div>
    );
};

export default ResultsViewer;