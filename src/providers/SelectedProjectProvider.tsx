import { useState, ReactNode, useEffect } from 'react';
import { Project } from '../types/project';
import { createItem, getItems, removeItem } from '../../api/mockApi';
import { SelectedProjectContext } from '../contexts/SelectedProjectContext';

interface ProjectsProviderProps {
  children: ReactNode;
}

const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchSelectedProject();
  }, []);

  const fetchSelectedProject = () => {
    const selectedProjectData = getItems('selectedProject');
    setSelectedProject(selectedProjectData[0] || null);
  };

  const updateSelectedProject = (project: Project) => {
    removeItem('selectedProject', selectedProject?._id || '');
    createItem('selectedProject', project);

    fetchSelectedProject();
  };

  const clearSelectedProject = () => {
    removeItem('selectedProject', selectedProject!._id);
    fetchSelectedProject();
  };

  return (
    <SelectedProjectContext.Provider
      value={{
        selectedProject,
        updateSelectedProject,
        clearSelectedProject,
      }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

export default ProjectsProvider;
