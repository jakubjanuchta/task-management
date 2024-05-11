import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { Project } from '../types/project';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useProjects } from '../contexts/ProjectsContext';

type ProjectItemProps = {
  project: Project;
  handleEdit: () => void;
  handleRemove: () => void;
};

const ProjectItem = ({
  project,
  handleEdit,
  handleRemove,
}: ProjectItemProps) => {
  const { name, description } = project;
  const { updateSelectedProject } = useProjects();

  const handleSelectProject = () => {
    updateSelectedProject(project);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '300px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 2,
          width: '90%',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" component="p">
            {description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <EditIcon onClick={() => handleEdit()} />
          <DeleteIcon onClick={() => handleRemove()} />
        </Box>
      </Box>
      <Button onClick={handleSelectProject} fullWidth variant="contained">
        Choose project
      </Button>
    </Card>
  );
};

export default ProjectItem;
