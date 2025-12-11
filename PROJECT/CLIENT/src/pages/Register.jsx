import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
} from '@mui/material';

function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });

      const { token, user } = response.data;
      onRegister(token, user);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom sx={{ marginBottom: 3, textAlign: 'center' }}>
            Register
          </Typography>
          {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              variant="outlined"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              sx={{ marginTop: 3, padding: 1.5 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Register;
