import { useState, ReactNode, useEffect } from 'react';
import { Project } from '../types/project';
import { enqueueSnackbar } from 'notistack';
import {
  createItem,
  getItems,
  removeItem,
  updateItem,
} from '../../api/mockApi';
import { ProjectsContext } from '../contexts/ProjectsContext';

interface ProjectsProviderProps {
  children: ReactNode;
}

const PROJECT_KEY = 'projects';

const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // const { authData } = useAuth();

  useEffect(() => {
    fetchSelectedProject();
  }, []);

  const fetchProjects = () => {
    const projectsData = getItems(PROJECT_KEY);
    setProjects(projectsData);
  };

  const addProject = ({ name, description }: Omit<Project, 'id'>) => {
    if (name && description) {
      const id = 'id' + new Date().getTime();

      createItem(PROJECT_KEY, {
        id,
        name,
        description,
      });

      enqueueSnackbar('Added project', {
        variant: 'success',
      });

      fetchProjects();
    } else {
      enqueueSnackbar('Error when adding project', {
        variant: 'error',
      });
    }
  };

  const updateProject = (project: Project) => {
    updateItem(PROJECT_KEY, project);

    enqueueSnackbar('updated project', {
      variant: 'success',
    });

    fetchProjects();
  };

  const deleteProject = (projectId: Project['id']) => {
    removeItem(PROJECT_KEY, projectId);

    enqueueSnackbar('Deleted project', {
      variant: 'success',
    });

    fetchProjects();
  };

  const fetchSelectedProject = () => {
    const selectedProjectData = getItems('selectedProject');
    setSelectedProject(selectedProjectData[0] || null);
  };

  const updateSelectedProject = (project: Project) => {
    removeItem('selectedProject', selectedProject?.id || '');
    createItem('selectedProject', project);

    fetchSelectedProject();
  };

  const clearSelectedProject = () => {
    removeItem('selectedProject', selectedProject!.id);
    fetchSelectedProject();
  };

  return (
    <ProjectsContext.Provider
      value={{
        fetchProjects,
        projects,
        addProject,
        updateProject,
        deleteProject,
        selectedProject,
        updateSelectedProject,
        clearSelectedProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
