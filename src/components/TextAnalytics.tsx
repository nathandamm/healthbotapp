import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const TextAnalytics: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalysis({
        sentiment: {
          score: 0.85,
          label: 'Positive',
        },
        keyPhrases: [
          'patient recovery',
          'blood pressure',
          'normal range',
          'medication response',
        ],
        entities: [
          {
            text: 'Aspirin',
            category: 'Medication',
            confidence: 0.95,
          },
          {
            text: 'blood pressure',
            category: 'Vital Sign',
            confidence: 0.92,
          },
        ],
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
        Medical Text Analytics
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Analyze medical text to extract sentiment, key phrases, and entities.
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
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter medical text to analyze..."
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleAnalyze}
              disabled={!text || loading}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              Analyze Text
            </Button>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          {analysis && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StyledCard>
                  <Typography variant="h6" gutterBottom>
                    Sentiment Analysis
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h4" color="primary">
                      {(analysis.sentiment.score * 100).toFixed(0)}%
                    </Typography>
                    <Chip
                      label={analysis.sentiment.label}
                      color={analysis.sentiment.score > 0.6 ? 'success' : 'warning'}
                    />
                  </Box>
                </StyledCard>
              </Grid>

              <Grid item xs={12}>
                <StyledCard>
                  <Typography variant="h6" gutterBottom>
                    Key Phrases
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {analysis.keyPhrases.map((phrase: string) => (
                      <Chip
                        key={phrase}
                        label={phrase}
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Box>
                </StyledCard>
              </Grid>

              <Grid item xs={12}>
                <StyledCard>
                  <Typography variant="h6" gutterBottom>
                    Identified Entities
                  </Typography>
                  <List>
                    {analysis.entities.map((entity: any, index: number) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemText
                            primary={entity.text}
                            secondary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Chip
                                  label={entity.category}
                                  size="small"
                                  color="primary"
                                />
                                <Typography variant="body2" color="text.secondary">
                                  Confidence: {(entity.confidence * 100).toFixed(1)}%
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < analysis.entities.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </StyledCard>
              </Grid>
            </Grid>
          )}
          {!analysis && (
            <StyledCard>
              <Typography color="text.secondary" align="center">
                Analysis results will appear here
              </Typography>
            </StyledCard>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TextAnalytics;
