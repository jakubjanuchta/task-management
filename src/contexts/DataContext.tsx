import { createContext, useContext } from 'react';
import { Project } from '../types/project';
import { Story } from '../types/story';
import { User } from '../types/auth';
import { Task } from '../types/task';

type DataState = {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  stories: Story[];
  setStories: (stories: Story[]) => void;
  users: User[];
  setUsers: (stories: User[]) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
};

const DataContext = createContext<DataState | null>(null);

const useData = (): DataState => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { DataContext, useData };
