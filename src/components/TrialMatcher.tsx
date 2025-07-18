import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';
import { TrialMatcherRequest, TrialMatcherResponse } from '../types';
import { submitTrialMatcherJob, getTrialMatcherResults } from '../services/healthInsightsApi';

const StyledCard = styled(Card)<{ theme?: Theme }>(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const TrialMatcher: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [results, setResults] = useState<TrialMatcherResponse | null>(null);
  
  // Form state
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState({
    city: '',
    state: '',
    country: 'United States'
  });
  const [patientInfo, setPatientInfo] = useState({
    sex: '',
    birthDate: '',
    id: Date.now().toString()
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const request: TrialMatcherRequest = {
        jobData:{Configuration: {
          ClinicalTrials: {
            RegistryFilters: [{
              Sources: ['Clinicaltrials_gov'],
              Conditions: [condition],
              facilityLocations: [{
                City: location.city,
                State: location.state,
                countryOrRegion: location.country
              }]
            }]
          },
          IncludeEvidence: false,
          Verbose: false
        },
        Patients: [{
          details: {
            sex: patientInfo.sex || undefined,
            birthDate: patientInfo.birthDate || undefined,
            ClinicalInfo: []
          },
          id: patientInfo.id
        }]}
      };

      const newJobId = await submitTrialMatcherJob(request);
      setJobId(newJobId.jobId);
      
      // Poll for results
      const checkResults = async () => {
        try {
          const response = await getTrialMatcherResults(newJobId.jobId);
          // Check if results are available by presence of patientResults array
          if (response.result && Array.isArray(response.result.patientResults) && response.result.patientResults.length > 0 && Array.isArray(response.result.patientResults[0].inferences)) {
            setResults(response);
            setLoading(false);
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
      setError(error.message || 'Failed to submit trial matching request');
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Clinical Trial Matcher
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Match patients with relevant clinical trials based on their condition and location.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Search Criteria
            </Typography>
            
            <TextField
              fullWidth
              label="Condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="e.g., lung cancer"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="City"
              value={location.city}
              onChange={(e) => setLocation({ ...location, city: e.target.value })}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="State"
              value={location.state}
              onChange={(e) => setLocation({ ...location, state: e.target.value })}
              sx={{ mb: 2 }}
            />

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Patient Information
            </Typography>

            <FormControl sx={{ width: '50%', mb: 2 }}>
              <InputLabel id="trial-sex-label">Sex</InputLabel>
              <Select
                labelId="trial-sex-label"
                label="Sex"
                size="small"
                sx={{ '& .MuiSelect-select': { display: 'flex', alignItems: 'center' } }}
                value={patientInfo.sex}
                onChange={(e) => setPatientInfo({ ...patientInfo, sex: e.target.value })}
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
              disabled={loading || !condition || !location.city || !location.state}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Find Clinical Trials'}
            </Button>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={7}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Matching Trials
            </Typography>
            {results?.result?.patientResults?.length && results.result.patientResults[0]?.inferences?.length ? (
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Trial ID</TableCell>
                      <TableCell>Source</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Confidence</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.result.patientResults[0].inferences.map((inference, idx) => (
                      <TableRow key={inference.clinicalTrialId || idx}>
                        <TableCell>{inference.clinicalTrialId || '-'}</TableCell>
                        <TableCell>{inference.source || '-'}</TableCell>
                        <TableCell>{inference.value || '-'}</TableCell>
                        <TableCell>{inference.confidenceScore != null ? inference.confidenceScore : '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography color="text.secondary">
                No trial matches found yet. Enter search criteria and click "Find Clinical Trials".
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

export default TrialMatcher;
