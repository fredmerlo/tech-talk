import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsageAsync } from '../features/userSlice';
import { RootState } from '../app/store';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.user?.username) ?? '';
  const { totalUsage, totalCost, number } = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    dispatch<any>(fetchUsageAsync({username}));
  }, [dispatch, username]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" flexDirection="row">
          <Typography sx={{ mr: 15 }} variant="h6">Welcome, {username}</Typography>
          <Typography sx={{ mr: 5 }} variant="h6">Primary Number: {number}</Typography>
          <Typography sx={{ mr: 5 }} variant="h6">Total Usage: {totalUsage}</Typography>
          <Typography variant="h6">Total Cost: {totalCost}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
