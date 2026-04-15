import React, { useContext, useEffect, useState } from 'react';
import { 
  Container, Typography, Button, Card, CardContent, 
  Box, Alert, Chip, Stack, Divider 
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/protected/dashboard-data`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setDashboardData(res.data);
      } catch (err) {
        setFetchError(err.response?.data?.message || 'Failed to fetch data');
      }
    };
    
    if (user?.token) loadDashboard();
  }, [user]);

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa', py: 6 }}>
      <Container maxWidth="md">
        <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <CardContent sx={{ p: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" fontWeight={600} color="primary">
                My Dashboard
              </Typography>
              <Button 
                variant="outlined" 
                color="error" 
                startIcon={<LogoutIcon />}
                onClick={handleSignOut}
                sx={{ textTransform: 'none' }}
              >
                Sign Out
              </Button>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            {fetchError && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{fetchError}</Alert>}

            {dashboardData ? (
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Message</Typography>
                  <Typography variant="body1">{dashboardData.message}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Your Role</Typography>
                  <Chip 
                    label={dashboardData.userRole} 
                    color="primary" 
                    variant="outlined" 
                    size="small" 
                    sx={{ mt: 0.5 }}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Server Info</Typography>
                  <Typography variant="body1">{dashboardData.data}</Typography>
                </Box>
              </Stack>
            ) : (
              <Typography color="text.secondary">Fetching your data...</Typography>
            )}

            {user?.role === 'admin' && (
              <Box mt={4}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  startIcon={<AdminPanelSettingsIcon />}
                  onClick={() => navigate('/admin')}
                  sx={{ textTransform: 'none' }}
                >
                  Admin Panel
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
