import { createContext, useContext } from 'react';
import { Project } from '../types/project';

type SelectedProjectState = {
  selectedProject: Project | null;
  updateSelectedProject: (project: Project) => void;
  clearSelectedProject: () => void;
};

const SelectedProjectContext = createContext<SelectedProjectState | null>(null);

const useSelectedProject = (): SelectedProjectState => {
  const context = useContext(SelectedProjectContext);
  if (!context) {
    throw new Error(
      'useSelectedProject must be used within a SelectedProjectProvider',
    );
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { SelectedProjectContext, useSelectedProject };
