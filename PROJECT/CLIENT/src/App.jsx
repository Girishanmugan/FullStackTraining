import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import MyPortfolios from './pages/MyPortfolios';
import CreatePortfolio from './pages/CreatePortfolio';
import EditPortfolio from './pages/EditPortfolio';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [editingPortfolioId, setEditingPortfolioId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage('home');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <AppBar position="static" sx={{ marginBottom: 4 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box
              sx={{
                fontSize: 24,
                fontWeight: 'bold',
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 },
              }}
              onClick={() => setCurrentPage('home')}
            >
              Portfolio Share
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button color="inherit" onClick={() => setCurrentPage('home')}>
                Home
              </Button>
              {isLoggedIn ? (
                <>
                  <Button color="inherit" onClick={() => setCurrentPage('my-portfolios')}>
                    My Portfolios
                  </Button>
                  <Button color="inherit" onClick={() => setCurrentPage('create')}>
                    Create
                  </Button>
                  <Box sx={{ color: 'white', marginRight: 2 }}>
                    Hi, {user?.name}
                  </Box>
                  <Button
                    color="inherit"
                    onClick={handleLogout}
                    variant="outlined"
                    sx={{ borderColor: 'white' }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" onClick={() => setCurrentPage('login')}>
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => setCurrentPage('register')}
                    variant="outlined"
                    sx={{ borderColor: 'white' }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
          {currentPage === 'home' && <Home isLoggedIn={isLoggedIn} />}
          {currentPage === 'login' && <Login onLogin={handleLogin} />}
          {currentPage === 'register' && <Register onRegister={handleLogin} />}
          {isLoggedIn && currentPage === 'my-portfolios' && (
            <MyPortfolios onEdit={(id) => { setEditingPortfolioId(id); setCurrentPage('edit'); }} />
          )}
          {isLoggedIn && currentPage === 'create' && (
            <CreatePortfolio onSuccess={() => setCurrentPage('my-portfolios')} />
          )}
          {isLoggedIn && currentPage === 'edit' && (
            <EditPortfolio
              portfolioId={editingPortfolioId}
              onSuccess={() => { setCurrentPage('my-portfolios'); setEditingPortfolioId(null); }}
            />
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

