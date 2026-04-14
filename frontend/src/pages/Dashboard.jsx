import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Button, Paper, Box, Alert } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/protected/dashboard-data`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data');
      }
    };
    
    if (user?.token) fetchData();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4">User Dashboard</Typography>
          <Button variant="outlined" color="secondary" onClick={handleLogout}>Logout</Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {data ? (
          <Box>
            <Typography variant="body1"><strong>Message:</strong> {data.message}</Typography>
            <Typography variant="body1"><strong>Role:</strong> <span style={{color: 'blue'}}>{data.userRole}</span></Typography>
            <Typography variant="body1"><strong>Server Data:</strong> {data.data}</Typography>
          </Box>
        ) : (
          <Typography>Loading user data...</Typography>
        )}

        {user?.role === 'admin' && (
          <Box mt={4}>
            <Button variant="contained" color="primary" onClick={() => navigate('/admin')}>
              Go to Admin Dashboard
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};
