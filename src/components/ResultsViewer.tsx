import React from 'react';
import {
  Box,
  Card,
  Typography,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPre = styled('pre')(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  overflow: 'auto',
  maxHeight: '500px',
  '& code': {
    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
  },
}));

interface ResultsViewerProps {
  results: any;
  title?: string;
}

const ResultsViewer: React.FC<ResultsViewerProps> = ({ results, title = 'Results Viewer' }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Card>
        {results ? (
          <StyledPre>
            <code>{JSON.stringify(results, null, 2)}</code>
          </StyledPre>
        ) : (
          <Box sx={{ p: 3 }}>
            <Typography color="text.secondary">
              No results to display. Please enter your API endpoint and keys.
            </Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default ResultsViewer;