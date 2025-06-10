import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Config } from '../types';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 600,
  margin: '0 auto',
}));

const EndpointConfig: React.FC = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<Config>({
    apiEndpoint: '',
    apiKey: '',
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    // Load saved configuration from localStorage
    const savedConfig = localStorage.getItem('healthInsightsConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Validate the endpoint URL
      new URL(config.apiEndpoint);
      
      // Save configuration to localStorage
      localStorage.setItem('healthInsightsConfig', JSON.stringify(config));
      
      setSnackbar({
        open: true,
        message: 'Configuration saved successfully',
        severity: 'success',
      });

      // Navigate to dashboard after successful save
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid API endpoint URL',
        severity: 'error',
      });
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        API Configuration
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Configure your Azure AI Health Insights API endpoint and key.
      </Typography>

      <StyledCard>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="API Endpoint"
            variant="outlined"
            value={config.apiEndpoint}
            onChange={(e) => setConfig({ ...config, apiEndpoint: e.target.value })}
            placeholder="https://your-endpoint.cognitiveservices.azure.com/"
            required
            sx={{ mb: 3 }}
          />
          
          <TextField
            fullWidth
            label="API Key"
            variant="outlined"
            type={showApiKey ? 'text' : 'password'}
            value={config.apiKey}
            onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowApiKey(!showApiKey)}
                    edge="end"
                  >
                    {showApiKey ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
          >
            Save Configuration
          </Button>
        </form>
      </StyledCard>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EndpointConfig;