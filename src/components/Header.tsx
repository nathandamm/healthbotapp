import React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  styled,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Help as HelpIcon,
} from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Header: React.FC = () => {
  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton>
            <HelpIcon />
          </IconButton>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <Avatar
            sx={{
              cursor: 'pointer',
              width: 40,
              height: 40,
            }}
            src="/avatar-placeholder.png"
          />
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;