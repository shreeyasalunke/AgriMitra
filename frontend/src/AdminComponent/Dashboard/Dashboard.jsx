


import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import ToolItemTable from '../ToolItem/ToolItemTable';
import OrderTable from '../Orders/OrderTable';

const ToolOwnerDashboard = () => {
  return (
    <Box sx={{ p: 2, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      {/* Dashboard Title */}
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: 'bold', color: '#333', textAlign: 'center' }}
      >
        Tool Owner Dashboard
      </Typography>

      {/* Responsive Grid Layout */}
      <Grid container spacing={3}>
        {/* Tool Items Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'white',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                borderBottom: '2px solid #eee',
                pb: 1,
              }}
            >
              Your Tools
            </Typography>
            <ToolItemTable />
          </Paper>
        </Grid>

        {/* Orders Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'white',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                borderBottom: '2px solid #eee',
                pb: 1,
              }}
            >
              Recent Orders
            </Typography>
            <OrderTable />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ToolOwnerDashboard;
