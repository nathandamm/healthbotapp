import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EndpointConfig from './components/EndpointConfig';
import ResultsViewer from './components/ResultsViewer';
import Header from './components/Header';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/config" component={EndpointConfig} />
                    <Route path="/results" component={ResultsViewer} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;