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
      title: 'Text Analytics',
      description: 'Analyze medical text to extract insights and sentiment.',
      icon: <DocumentScanner sx={{ fontSize: 40 }} />,
      path: '/text-analytics',
      color: theme.palette.primary.main,
    },
    {
      title: 'Medical Entity Recognition',
      description: 'Extract medical entities from clinical documentation.',
      icon: <MedicalServices sx={{ fontSize: 40 }} />,
      path: '/medical-entity',
      color: theme.palette.secondary.main,
    },
    {
      title: 'Health NLP',
      description: 'Process and understand natural language in medical context.',
      icon: <Psychology sx={{ fontSize: 40 }} />,
      path: '/health-nlp',
      color: '#FF9800',
    },
    {
      title: 'Clinical Insights',
      description: 'Extract meaningful insights from medical documentation.',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      path: '/clinical-insights',
      color: '#4CAF50',
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Health Insights
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Explore the power of Azure AI Health Insights through our interactive demo application.
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