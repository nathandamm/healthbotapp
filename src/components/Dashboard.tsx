import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import {
  DocumentScanner,
  MedicalServices,
  Psychology,
  Assessment,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      title: 'Trial Matcher',
      description: 'Match patients with relevant clinical trials based on condition and location.',
      icon: <MedicalServices sx={{ fontSize: 40 }} />,
      path: '/trial-matcher',
      color: theme.palette.primary.main,
    },
    {
      title: 'Radiology Insights',
      description: 'Analyze radiology reports to detect discrepancies and extract key findings.',
      icon: <DocumentScanner sx={{ fontSize: 40 }} />,
      path: '/radiology-insights',
      color: theme.palette.secondary.main,
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Azure AI Health Insights
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Use Trial Matcher to find relevant clinical trials and Radiology Insights to analyze medical imaging reports.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} md={6} lg={3} key={feature.title}>
            <Card
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  color: 'white',
                  bgcolor: feature.color,
                }}
              >
                {feature.icon}
              </Box>
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, flexGrow: 1 }}
              >
                {feature.description}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => navigate(feature.path)}
                sx={{ alignSelf: 'flex-start' }}
              >
                Try Now
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;