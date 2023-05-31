import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { createUserApi } from '../api/AuthenticationApiService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateName(name) {
  return name.length >= 2;
}

function validateForm(user) {
  const isValidFirstname = validateName(user.firstname);
  const isValidLastname = validateName(user.lastname);
  const isValidEmail = validateEmail(user.email);
  const isValidPassword = validatePassword(user.password);

  return {
    isValidFirstname,
    isValidLastname,
    isValidEmail,
    isValidPassword,
  };
}

function ErrorAlert({ show, message }) {
  if (!show) {
    return null;
  }

  return (
    <Alert variant="outlined" severity="warning">
      {message}
    </Alert>
  );
}

function SignUpSite() {
  const [showFirstnameErrorMessage, setShowFirstnameErrorMessage] = useState(false);
  const [showLastnameErrorMessage, setShowLastnameErrorMessage] = useState(false);
  const [showEmailErrorMessage, setShowEmailErrorMessage] = useState(false);
  const [showPasswordErrorMessage, setShowPasswordErrorMessage] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      email: data.get('email'),
      password: data.get('password'),
    };

    const validation = validateForm(user);

    setShowFirstnameErrorMessage(!validation.isValidFirstname);
    setShowLastnameErrorMessage(!validation.isValidLastname);
    setShowEmailErrorMessage(!validation.isValidEmail);
    setShowPasswordErrorMessage(!validation.isValidPassword);

    if (
      validation.isValidFirstname &&
      validation.isValidLastname &&
      validation.isValidEmail &&
      validation.isValidPassword
    ) {
      createUserApi(user.firstname, user.lastname, user.email, user.password)
        .then((response) => {
          navigate('/login');
        })
        .catch((error) => console.log(error));
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Financial Dolphin
          </Typography>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <ErrorAlert show={showFirstnameErrorMessage} message="Firstname must have at least 2 characters." />
          <ErrorAlert show={showLastnameErrorMessage} message="Lastname must have at least 2 characters." />
          <ErrorAlert show={showEmailErrorMessage} message="Please enter a valid email." />
          <ErrorAlert show={showPasswordErrorMessage} message="Password must have at least 6 characters." />
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUpSite;