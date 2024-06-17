import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { useSelectedProject } from './contexts/SelectedProjectContext';

import { useAuth } from './contexts/AuthContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import AuthWall from './components/AuthWall';
import { useApp } from './contexts/AppContext';
import StoryScreen from './screens/StoryScreen';
import { useMemo, useState } from 'react';
import DarkModeSwitch from './components/DarkModeSwitch';
import ErrorScreen from './screens/ErrorScreen';

const menuElementStyle = {
  width: '100px',
  height: '40px',
  border: '2px solid black',
  lineHeight: '40px',
  textAlign: 'center',
  boxSizing: 'content-box',
} as const;

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const { selectedProject, clearSelectedProject } = useSelectedProject();
  const navigate = useNavigate();

  const app = useApp();

  const { authData, logout } = useAuth();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const handleChangeProject = () => {
    clearSelectedProject();
    navigate('/projects');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          height: '100vh',
        }}
      >
        <SnackbarProvider
          autoHideDuration={3000}
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'top',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid white',
            width: '100vw',
            gap: 2,
            p: 1,
          }}
        >
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <div style={menuElementStyle}>
              <Link to="/">
                <Typography color="textSecondary" variant="overline">
                  Home
                </Typography>
              </Link>
            </div>
            <div style={menuElementStyle}>
              <Link to="/projects">
                <Typography color="textSecondary" variant="overline">
                  Projects
                </Typography>
              </Link>
            </div>
          </Box>

          {authData?.user && selectedProject && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                marginRight: '10px',
              }}
            >
              <Box>
                <b>Selected Project:</b> {selectedProject.name}
              </Box>
              <Button variant="outlined" onClick={handleChangeProject}>
                Change the selected project
              </Button>
            </Box>
          )}
          <Box style={{ display: 'flex', gap: 10 }}>
            <DarkModeSwitch
              mode={mode}
              toggleMode={() =>
                setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
              }
            />
            {authData?.user && (
              <Button variant="outlined" color="error" onClick={logout}>
                Logout
              </Button>
            )}
          </Box>
        </Box>

        <AuthWall>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/projects" element={<ProjectsScreen />} />
            <Route path="projects/story/:id" element={<StoryScreen />} />
          </Routes>
        </AuthWall>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
