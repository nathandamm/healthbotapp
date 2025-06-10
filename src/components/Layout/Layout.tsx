import React from 'react';
import { Box, Container, styled } from '@mui/material';
import Sidebar from './Sidebar';
import Header from '../Header';

const LayoutRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  background: theme.palette.background.default,
  minHeight: '100vh',
}));

const LayoutContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

const Main = styled(Box)(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LayoutRoot>
      <Sidebar />
      <LayoutContent>
        <Header />
        <Main>
          <Container maxWidth="lg">
            {children}
          </Container>
        </Main>
      </LayoutContent>
    </LayoutRoot>
  );
};

export default Layout;
