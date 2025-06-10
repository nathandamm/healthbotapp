import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard';
import TrialMatcher from './components/TrialMatcher';
import RadiologyInsights from './components/RadiologyInsights';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trial-matcher" element={<TrialMatcher />} />
            <Route path="/radiology-insights" element={<RadiologyInsights />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;