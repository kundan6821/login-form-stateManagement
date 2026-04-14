import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Button, Paper, Box, Alert } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/protected/admin-data`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch admin data');
      }
    };
    
    if (user?.token) fetchData();
  }, [user]);

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, borderTop: '5px solid #d32f2f' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" color="error">Admin Control Panel</Typography>
          <Button variant="outlined" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {data ? (
          <Box p={3} bgcolor="#ffebee" borderRadius={2}>
            <Typography variant="body1"><strong>Secret Message:</strong> {data.message}</Typography>
            <Typography variant="body1"><strong>Role:</strong> <span style={{color: 'red', fontWeight: 'bold'}}>{data.userRole}</span></Typography>
            <Typography variant="body1"><strong>Admin Data:</strong> {data.data}</Typography>
          </Box>
        ) : (
          <Typography>Verifying admin credentials and loading data...</Typography>
        )}
      </Paper>
    </Container>
  );
};
