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
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';
import { RadiologyInsightsRequest, RadiologyInsightsResponse } from '../types';
import { submitRadiologyInsightsJob, getRadiologyInsightsResults } from '../services/healthInsightsApi';

const StyledCard = styled(Card)<{ theme?: Theme }>(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const ChipsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const RadiologyInsights: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [results, setResults] = useState<RadiologyInsightsResponse | null>(null);
  
  // Form state
  const [reportText, setReportText] = useState('');
  const [selectedInferences, setSelectedInferences] = useState<string[]>(['lateralityDiscrepancy']);
  const [patientInfo, setPatientInfo] = useState({
    id: Date.now().toString(),
    sex: '',
    birthDate: '',
  });
  const [procedureInfo, setProcedureInfo] = useState({
    code: '26688-1',
    display: 'US BREAST - LEFT LIMITED',
    description: 'US BREAST - LEFT LIMITED',
  });

  const inferenceTypes = [
    { value: 'lateralityDiscrepancy', label: 'Laterality Discrepancy' },
    { value: 'criticalFindings', label: 'Critical Findings' },
    { value: 'followupRecommendations', label: 'Followup Recommendations' },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const request: RadiologyInsightsRequest = {
        jobData: {
          configuration: {
            inferenceOptions: {
              followupRecommendationOptions: {
                includeRecommendationsWithNoSpecifiedModality: false,
                includeRecommendationsInReferences: false,
                provideFocusedSentenceEvidence: false,
              },
              findingOptions: {
                provideFocusedSentenceEvidence: false,
              },
            },
            inferenceTypes: selectedInferences,
            locale: 'en-US',
            verbose: false,
            includeEvidence: false,
          },
          patients: [{
            id: patientInfo.id,
            details: {
              sex: patientInfo.sex || undefined,
              birthDate: patientInfo.birthDate || undefined,
            },
            encounters: [{
              id: 'encounter1',
              period: {
                start: new Date().toISOString(),
                end: new Date().toISOString(),
              },
              class: 'outpatient',
            }],
            patientDocuments: [{
              type: 'note',
              clinicalType: 'radiologyReport',
              id: 'doc1',
              language: 'en',
              authors: [{
                id: 'author1',
                fullName: 'Radiologist',
              }],
              specialtyType: 'radiology',
              createdAt: new Date().toISOString(),
              administrativeMetadata: {
                orderedProcedures: [{
                  code: {
                    coding: [{
                      system: 'https://loinc.org',
                      code: procedureInfo.code,
                      display: procedureInfo.display,
                    }],
                  },
                  description: procedureInfo.description,
                }],
                encounterId: 'encounter1',
              },
              content: {
                sourceType: 'inline',
                value: reportText,
              },
            }],
          }],
        },
      };

      const newJobId = await submitRadiologyInsightsJob(request);
      setJobId(newJobId);
      
      // Poll for results
      const checkResults = async () => {
        try {
          const response = await getRadiologyInsightsResults(newJobId);
          if (response.status === 'succeeded') {
            setResults(response);
            setLoading(false);
          } else if (response.status === 'failed') {
            throw new Error('Job processing failed');
          } else {
            setTimeout(checkResults, 2000); // Poll every 2 seconds
          }
        } catch (error: any) {
          setError(error.message || 'Failed to fetch results');
          setLoading(false);
        }
      };

      checkResults();
    } catch (error: any) {
      setError(error.message || 'Failed to submit radiology report');
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Radiology Insights
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Analyze radiology reports to detect discrepancies and extract key insights.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Report Information
            </Typography>

            <FormControl sx={{ width: '90%', mb: 3, mt: 2 }}>
              <InputLabel>Inference Types</InputLabel>
              <Select
                multiple
                size="small"
                value={selectedInferences}
                onChange={(e) => setSelectedInferences(typeof e.target.value === 'string' ? [e.target.value] : e.target.value)}
                renderValue={(selected) => (
                  <ChipsContainer>
                    {selected.map((value) => (
                      <Chip
                        size="small"
                        key={value}
                        label={inferenceTypes.find(t => t.value === value)?.label || value}
                      />
                    ))}
                  </ChipsContainer>
                )}
              >
                {inferenceTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={8}
              label="Radiology Report"
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Patient Information
            </Typography>

            <FormControl sx={{ width: '50%', mb: 2 }}>
              <InputLabel id="sex-label">Sex</InputLabel>
              <Select
                labelId="sex-label"
                size="small"
                value={patientInfo.sex}
                onChange={(e) => setPatientInfo({ ...patientInfo, sex: e.target.value })}
                label="Sex"
              >
                <MenuItem value="">Select...</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Birth Date"
              type="date"
              value={patientInfo.birthDate}
              onChange={(e) => setPatientInfo({ ...patientInfo, birthDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
            />

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || !reportText}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Analyze Report'}
            </Button>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Analysis Results
            </Typography>
            
            {results?.result?.patientResults[0]?.inferences ? (
              <List>
                {results.result.patientResults[0].inferences.map((inference, index) => (
                  <ListItem key={index} divider>
                    <ListItemText
                      primary={inference.kind}
                      secondary={
                        inference.lateralityIndication ? (
                          <Typography variant="body2" color="text.secondary">
                            Laterality: {inference.lateralityIndication.coding[0].display}
                            {inference.discrepancyType && (
                              <>
                                <br />
                                Discrepancy: {inference.discrepancyType}
                              </>
                            )}
                          </Typography>
                        ) : null
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary">
                No analysis results yet. Enter a radiology report and click "Analyze Report".
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

export default RadiologyInsights;
