import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Assessment as AssessmentIcon,
  DocumentScanner as DocumentScannerIcon,
  MedicalServices as MedicalServicesIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';

const DRAWER_WIDTH = 280;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    border: 'none',
    background: theme.palette.background.paper,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  },
}));

const Logo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

interface StyledListItemProps {
  active?: boolean;
  component?: React.ElementType;
  to?: string;
}

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'active'
})<StyledListItemProps>(({ theme, active }) => ({
  marginBottom: theme.spacing(1),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  borderRadius: theme.spacing(1),
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  color: active ? theme.palette.common.white : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.dark : theme.palette.action.hover,
  },
  '& .MuiListItemIcon-root': {
    color: active ? theme.palette.common.white : theme.palette.text.primary,
  },
  textDecoration: 'none',
}));

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Trial Matcher', icon: <MedicalServicesIcon />, path: '/trial-matcher' },
  { text: 'Radiology Insights', icon: <DocumentScannerIcon />, path: '/radiology-insights' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <StyledDrawer variant="permanent">
      <Logo>
        <MedicalServicesIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h6" color="primary" fontWeight="bold">
          Health Insights
        </Typography>
      </Logo>
      <List>
        {menuItems.map((item) => (            <StyledListItem
              key={item.text}
              component={Link}
              to={item.path}
              active={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
