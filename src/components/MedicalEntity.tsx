import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const EntityChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const MedicalEntity: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [entities, setEntities] = useState<any[]>([]);

  const handleExtract = async () => {
    setLoading(true);
    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEntities([
        { text: 'Type 2 Diabetes', category: 'Condition', confidence: 0.95 },
        { text: 'Metformin', category: 'Medication', confidence: 0.98 },
        { text: 'Blood glucose', category: 'Test', confidence: 0.92 },
      ]);
    } catch (error) {
      console.error('Error extracting entities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Medical Entity Recognition
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Extract medical entities such as conditions, medications, tests, and procedures from clinical text.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Clinical Text
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter clinical text to analyze..."
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleExtract}
              disabled={!text || loading}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              Extract Entities
            </Button>
          </StyledCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Identified Entities
            </Typography>
            {entities.length > 0 ? (
              <List>
                {entities.map((entity, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={entity.text}
                        secondary={
                          <Box>
                            <EntityChip
                              label={entity.category}
                              color="primary"
                              size="small"
                            />
                            <Typography component="span" variant="body2" color="text.secondary">
                              Confidence: {(entity.confidence * 100).toFixed(1)}%
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < entities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary">
                Extracted entities will appear here
              </Typography>
            )}
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MedicalEntity;
