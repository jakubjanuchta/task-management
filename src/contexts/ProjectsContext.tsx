import { createContext, useContext } from 'react';
import { Project } from '../types/project';

type ProjectsState = {
  projects: Project[];
  fetchProjects: () => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  selectedProject: Project | null;
  updateSelectedProject: (project: Project) => void;
  clearSelectedProject: () => void;
};

const ProjectsContext = createContext<ProjectsState | null>(null);

const useProjects = (): ProjectsState => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ProjectsContext, useProjects };
