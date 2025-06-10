import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Snackbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { analyzeClinicalText } from '../services/healthInsightsApi';
import { ClinicalInsightResponse } from '../types';
import { Theme } from '@mui/material/styles';

const StyledCard = styled(Card)<{ theme?: Theme }>(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const ClinicalInsights: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<ClinicalInsightResponse['insights']>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const savedConfig = localStorage.getItem('healthInsightsConfig');
      if (!savedConfig) {
        throw new Error('API configuration not found. Please configure the API endpoint first.');
      }

      const config = JSON.parse(savedConfig);
      const response = await analyzeClinicalText(config, text);
      setInsights(response.insights);
    } catch (error: any) {
      console.error('Error analyzing clinical text:', error);
      setError(error.message || 'An error occurred while analyzing the text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Clinical Insights Analysis
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Extract meaningful clinical insights from medical documentation.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={5}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Clinical Documentation
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter clinical documentation to analyze..."
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleAnalyze}
              disabled={!text || loading}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              Analyze Documentation
            </Button>
          </StyledCard>
        </Grid>
        
        <Grid item xs={12} lg={7}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Clinical Insights
            </Typography>
            {insights.length > 0 ? (
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell>Finding</TableCell>
                      <TableCell>Confidence</TableCell>
                      <TableCell>Evidence</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {insights.map((insight, index) => (
                      <TableRow key={index}>
                        <TableCell>{insight.category}</TableCell>
                        <TableCell>{insight.finding}</TableCell>
                        <TableCell>{(insight.confidence * 100).toFixed(1)}%</TableCell>
                        <TableCell>{insight.evidence}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography color="text.secondary">
                Clinical insights will appear here
              </Typography>
            )}
          </StyledCard>
        </Grid>
      </Grid>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          variant="filled"
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClinicalInsights;
