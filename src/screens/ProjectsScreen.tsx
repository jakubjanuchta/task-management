import { Box } from '@mui/material';
import ProjectsList from '../components/ProjectsList';

import { useSelectedProject } from '../contexts/SelectedProjectContext';
import SelectedProject from '../components/SelectedProject';

const ProjectsScreen = () => {
  const { selectedProject } = useSelectedProject();

  return (
    <Box sx={{ p: 4 }} style={{ width: '100%' }}>
      {selectedProject ? <SelectedProject /> : <ProjectsList />}
    </Box>
  );
};

export default ProjectsScreen;
