import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EndpointConfig from './components/EndpointConfig';
import ResultsViewer from './components/ResultsViewer';
import Header from './components/Header';

const App: React.FC = () => {
    const [results, setResults] = useState<any>(null);

    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/config" element={<EndpointConfig />} />
                    <Route path="/results" element={<ResultsViewer results={results} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;