import { useState, ReactNode } from 'react';
import { Project } from '../types/project';
import { DataContext } from '../contexts/DataContext';
import { Story } from '../types/story';
import { User } from '../types/auth';
import { Task } from '../types/task';

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider = ({ children }: DataProviderProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  return (
    <DataContext.Provider
      value={{
        projects,
        setProjects,
        stories,
        setStories,
        users,
        setUsers,
        tasks,
        setTasks,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
