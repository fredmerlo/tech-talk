import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import OverviewTab from './components/OverviewTab';
import ChartsTab from './components/ChartsTab';
import Login from './components/Login';
import { Box, AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { clearAuthState } from './features/authSlice';
import { useDispatch } from 'react-redux';


const App: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuthState());
  };

  const NavigationBar: React.FC<any> = (props) => (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={RouterLink} to="/overview">
            Overview
          </Button>
          <Button color="inherit" sx={{ ml: 5 }} component={RouterLink} to="/usage">
            Usage
          </Button>
          <Typography component="div" sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={handleLogout} component={RouterLink} to="/">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {props.children}
    </Box>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/overview" element={
          <NavigationBar>
            <OverviewTab />
          </NavigationBar>
        } />
        <Route path="/usage" element={
          <NavigationBar>
            <ChartsTab />
          </NavigationBar>
        } />
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Redirect users to Login page if the path does not match any above */}
        <Route path="*" element={<Navigate to="/login" />} />
        {/* Define other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
