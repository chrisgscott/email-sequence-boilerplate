import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

function Login() {
  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <form>
        <TextField
          label="Email"
          type="email"
          placeholder="Enter your email"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter your password"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
