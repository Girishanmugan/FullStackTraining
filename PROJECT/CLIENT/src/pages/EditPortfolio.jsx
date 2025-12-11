import { useState, useEffect } from 'react';
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

function EditPortfolio({ portfolioId, onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, [portfolioId]);

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/portfolio/${portfolioId}`);
      const { title, description, link, technologies } = response.data;
      setTitle(title);
      setDescription(description);
      setLink(link || '');
      setTechnologies(technologies.join(', '));
    } catch (err) {
      setError('Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const techArray = technologies
        .split(',')
        .map((tech) => tech.trim())
        .filter((tech) => tech);

      await axios.put(
        `http://localhost:5000/api/portfolio/${portfolioId}`,
        {
          title,
          description,
          link,
          technologies: techArray,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update portfolio');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom sx={{ marginBottom: 3, textAlign: 'center' }}>
            Edit Portfolio
          </Typography>
          {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              required
              multiline
              rows={4}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Project Link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              margin="normal"
              placeholder="https://example.com"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Technologies"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              margin="normal"
              placeholder="React, Node.js, MongoDB"
              helperText="Separate with commas"
              variant="outlined"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: 3, padding: 1.5 }}
            >
              Update Portfolio
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default EditPortfolio;
