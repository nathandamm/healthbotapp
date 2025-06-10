import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const TextAnalytics: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      // TODO: Implement API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResults({
        sentiment: 'positive',
        confidence: 0.92,
        entities: ['medication', 'condition'],
      });
    } catch (error) {
      console.error('Error analyzing text:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Health Text Analytics
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Analyze medical text to extract insights, entities, and sentiment.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Input Text
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter medical text to analyze..."
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleAnalyze}
              disabled={!input || loading}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              Analyze Text
            </Button>
          </StyledCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Analysis Results
            </Typography>
            {results ? (
              <Box>
                <Typography variant="body1">
                  Sentiment: {results.sentiment}
                </Typography>
                <Typography variant="body1">
                  Confidence: {results.confidence}
                </Typography>
                <Typography variant="body1">
                  Entities: {results.entities.join(', ')}
                </Typography>
              </Box>
            ) : (
              <Typography color="text.secondary">
                Results will appear here after analysis
              </Typography>
            )}
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TextAnalytics;
