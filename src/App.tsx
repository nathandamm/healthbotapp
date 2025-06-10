import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard';
import TextAnalytics from './components/TextAnalytics';
import MedicalEntity from './components/MedicalEntity';
import ClinicalInsights from './components/ClinicalInsights';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/text-analytics" element={<TextAnalytics />} />
            <Route path="/medical-entity" element={<MedicalEntity />} />
            <Route path="/clinical-insights" element={<ClinicalInsights />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;