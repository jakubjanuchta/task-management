import { Box } from '@mui/material';
import ProjectsList from '../components/ProjectsList';

import { useProjects } from '../hooks/useProjects';
import { useSelectedProject } from '../contexts/SelectedProjectContext';
import SelectedProject from '../components/SelectedProject';

const ProjectsScreen = () => {
  const { selectedProject } = useSelectedProject();

  const { projects } = useProjects();

  console.log('projects', projects);

  return (
    <Box sx={{ p: 4 }} style={{ width: '100%' }}>
      {selectedProject ? <SelectedProject /> : <ProjectsList />}
    </Box>
  );
};

export default ProjectsScreen;
