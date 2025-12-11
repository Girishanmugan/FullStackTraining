import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function MyPortfolios({ onEdit }) {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchMyPortfolios();
  }, []);

  const fetchMyPortfolios = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/portfolio/my-portfolios', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPortfolios(response.data);
    } catch (err) {
      console.error('Error fetching portfolios:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/portfolio/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPortfolios(portfolios.filter((p) => p._id !== selectedId));
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error('Error deleting portfolio:', err);
      alert('Failed to delete portfolio');
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
        My Portfolios
      </Typography>
      {portfolios.length === 0 ? (
        <Alert severity="info">You haven't created any portfolios yet.</Alert>
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
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button
                    size="small"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(portfolio._id)}
                  >
                    Edit
                  </Button>
                  {portfolio.link && (
                    <Button
                      size="small"
                      color="primary"
                      endIcon={<OpenInNewIcon />}
                      href={portfolio.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </Button>
                  )}
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteClick(portfolio._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Portfolio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this portfolio? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MyPortfolios;
