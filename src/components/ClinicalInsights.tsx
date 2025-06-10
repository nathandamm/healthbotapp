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
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const ClinicalInsights: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<any[]>([]);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setInsights([
        {
          category: 'Diagnosis',
          finding: 'Type 2 Diabetes Mellitus',
          confidence: 0.95,
          evidence: 'Patient presents with elevated blood glucose levels',
        },
        {
          category: 'Treatment',
          finding: 'Metformin 500mg twice daily',
          confidence: 0.98,
          evidence: 'Current medication regimen includes Metformin',
        },
        {
          category: 'Lab Result',
          finding: 'HbA1c elevated',
          confidence: 0.92,
          evidence: 'Recent lab results show HbA1c at 7.8%',
        },
      ]);
    } catch (error) {
      console.error('Error analyzing clinical text:', error);
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
    </Box>
  );
};

export default ClinicalInsights;
