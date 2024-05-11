import { Box } from '@mui/material';
import { useProjects } from '../contexts/ProjectsContext';
import ProjectsList from '../components/ProjectsList';
import SelectedProject from '../components/SelectedProject';

const ProjectsScreen = () => {
  const { selectedProject } = useProjects();

  return (
    <Box sx={{ p: 4 }}>
      {selectedProject ? <SelectedProject /> : <ProjectsList />}
    </Box>
  );
};

export default ProjectsScreen;
