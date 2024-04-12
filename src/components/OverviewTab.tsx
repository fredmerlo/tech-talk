// src/components/OverviewTab.tsx

import React from 'react';

import VirtualNumberList from './VirtualNumberList';
import UserNumberList from './UserNumberList';
import { Box, Typography } from '@mui/material';

const OverviewTab: React.FC = () => {

  return (
    <>
    <Box display="flex" sx={{mt: 5}} flexDirection="row">
      <Typography component="div" sx={{ flexGrow: 0.5 }} />
      <div>
        <Typography component="div" variant="h4" gutterBottom>
          Mobile Numbers
        </Typography>
        <UserNumberList />
      </div>
      <Typography component="div" sx={{ flexGrow: 0.3 }} />
      <div>
        <Typography component="div" variant="h4" gutterBottom> 
          Virtual Numbers
        </Typography>
        <VirtualNumberList />
      </div>
      <Typography component="div" sx={{ flexGrow: 0.5 }} />
      </Box>
    </>
  );
};

export default OverviewTab;
