import { RouterProvider } from 'react-router-dom';
import AppRouter from './router';
import { Box, Button, Link } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { useProjects } from './contexts/ProjectsContext';

const menuElementStyle = {
  width: '100px',
  height: '40px',
  border: '2px solid black',
  'line-height': '40px',
  'text-align': 'center',
  'box-sizing': 'content-box',
};

const App = () => {
  const { selectedProject, clearSelectedProject } = useProjects();
  return (
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
            <Link href="/">Home</Link>
          </div>
          <div style={menuElementStyle}>
            <Link href="/projects">Projects</Link>
          </div>
        </Box>
        {selectedProject && (
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
            <Button variant="outlined" onClick={() => clearSelectedProject()}>
              Change the selected project
            </Button>
          </Box>
        )}
      </Box>
      <RouterProvider router={AppRouter} />
    </div>
  );
};

export default App;
