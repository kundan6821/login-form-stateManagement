import React, { useContext, useEffect, useState } from 'react';
import { 
  Container, Typography, Button, Card, CardContent, 
  Box, Alert, Chip, Stack, Divider 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SecurityIcon from '@mui/icons-material/Security';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [adminData, setAdminData] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/protected/admin-data`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setAdminData(res.data);
      } catch (err) {
        setFetchError(err.response?.data?.message || 'Unable to load admin data');
      }
    };
    
    if (user?.token) loadAdminData();
  }, [user]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa', py: 6 }}>
      <Container maxWidth="md">
        <Card 
          sx={{ 
            borderRadius: 4, 
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            borderLeft: '5px solid #5c6bc0'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <SecurityIcon color="secondary" />
                <Typography variant="h5" fontWeight={600} color="secondary">
                  Admin Panel
                </Typography>
              </Stack>
              <Button 
                variant="text" 
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/dashboard')}
                sx={{ textTransform: 'none' }}
              >
                Back
              </Button>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            {fetchError && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{fetchError}</Alert>}

            {adminData ? (
              <Box sx={{ p: 2.5, bgcolor: '#ede7f6', borderRadius: 3 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Confidential Message</Typography>
                    <Typography variant="body1">{adminData.message}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Access Level</Typography>
                    <Chip 
                      label={adminData.userRole} 
                      color="secondary" 
                      size="small"
                      sx={{ mt: 0.5, fontWeight: 600 }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Admin Data</Typography>
                    <Typography variant="body1">{adminData.data}</Typography>
                  </Box>
                </Stack>
              </Box>
            ) : (
              <Typography color="text.secondary">Checking admin access and loading data...</Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
