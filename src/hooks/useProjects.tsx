import { useEffect, useState } from 'react';
import { useCollection } from './useCollection';
import { Project } from '../types/project';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

export function useProjects() {
  const { projects, setProjects } = useData();

  const { authData } = useAuth();
  const [loading, setLoading] = useState(true);

  const projectsItemCollection = useCollection({
    db: 'task_management',
    collection: 'projects',
  });

  useEffect(() => {
    let shouldUpdate = true;

    if (shouldUpdate) {
      getProjects();
    }
    return () => {
      shouldUpdate = false;
    };
  }, [projectsItemCollection]);

  const getProjects = () => {
    const fetchProjects = projectsItemCollection?.find({
      owner: authData?.user?.sub,
    });

    fetchProjects?.then((projects) => {
      setProjects(projects);
      setLoading(false);
    });
  };

  const addProject = async (newProject: Partial<Project>) => {
    const owner = authData?.user?.sub;

    if (!owner) return;

    newProject.owner = owner;

    try {
      await projectsItemCollection?.insertOne(newProject);

      getProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const updateProject = async (project: Partial<Project>) => {
    await projectsItemCollection?.updateOne(
      { _id: project._id },
      { $set: project },
    );

    getProjects();
  };

  const deleteProject = async (projectId: string) => {
    await projectsItemCollection?.deleteOne({ _id: projectId });
    getProjects();
  };

  return {
    loading,
    projects,
    addProject,
    updateProject,
    deleteProject,
  };
}
