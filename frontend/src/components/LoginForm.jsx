import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Alert, 
  CircularProgress,
  Card,
  CardContent,
  Divider,
  InputAdornment
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const processLogin = async (formData) => {
    setIsSubmitting(true);
    setApiError('');
    const result = await login(formData.email, formData.password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setApiError(result.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0f2f1 0%, #e8eaf6 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Card 
          sx={{ 
            borderRadius: 4, 
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            overflow: 'visible'
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Typography 
              variant="h4" 
              align="center" 
              fontWeight={600} 
              gutterBottom
              color="primary"
            >
              Welcome Back
            </Typography>
            <Typography 
              variant="body2" 
              align="center" 
              color="text.secondary" 
              sx={{ mb: 3 }}
            >
              Please enter your credentials to continue
            </Typography>

            <Divider sx={{ mb: 3 }} />
            
            {apiError && (
              <Alert severity="error" variant="filled" sx={{ mb: 2, borderRadius: 2 }}>
                {apiError}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(processLogin)} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="login-email"
                label="Email"
                placeholder="you@example.com"
                autoComplete="email"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                {...register('email', { 
                  required: 'Please provide your email',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Enter a valid email address'
                  }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="login-password"
                placeholder="••••••••"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                {...register('password', { 
                  required: 'Password cannot be empty',
                  minLength: {
                    value: 6,
                    message: 'Minimum 6 characters required'
                  }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ 
                  mt: 4, 
                  mb: 1, 
                  py: 1.5, 
                  textTransform: 'none', 
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: 0.5
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
