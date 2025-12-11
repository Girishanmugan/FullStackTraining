import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Stack,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function Home({ isLoggedIn }) {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/portfolio/all');
      setPortfolios(response.data);
    } catch (err) {
      setError('Error fetching portfolios');
    } finally {
      setLoading(false);
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
    <Box>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 4 }}>
        All Portfolios
      </Typography>
      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      {portfolios.length === 0 ? (
        <Alert severity="info">
          No portfolios yet. {!isLoggedIn && 'Login to create one!'}
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {portfolios.map((portfolio) => (
            <Grid item xs={12} sm={6} md={4} key={portfolio._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="div" gutterBottom>
                    {portfolio.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                    By: <strong>{portfolio.userId.name}</strong>
                  </Typography>
                  <Typography variant="body2" color="textPrimary" sx={{ marginBottom: 2 }}>
                    {portfolio.description}
                  </Typography>
                  {portfolio.technologies.length > 0 && (
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant="caption" display="block" sx={{ marginBottom: 1 }}>
                        <strong>Tech Stack:</strong>
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {portfolio.technologies.map((tech, idx) => (
                          <Chip key={idx} label={tech} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </CardContent>
                {portfolio.link && (
                  <Box sx={{ padding: 2, borderTop: '1px solid #eee' }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      endIcon={<OpenInNewIcon />}
                      href={portfolio.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </Button>
                  </Box>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Home;
