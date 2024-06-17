import { useEffect, useState } from 'react';
import { useCollection } from './useCollection';
import { useData } from '../contexts/DataContext';
import { Task } from '../types/task';

export function useTasks({ storyId }: { storyId?: string }) {
  const { tasks, setTasks } = useData();

  const [loading, setLoading] = useState(true);

  const tasksItemCollection = useCollection({
    db: 'task_management',
    collection: 'tasks',
  });

  useEffect(() => {
    let shouldUpdate = true;

    if (shouldUpdate) {
      getTasks();
    }
    return () => {
      shouldUpdate = false;
    };
  }, [tasksItemCollection, storyId]);

  const getTasks = () => {
    const fetchTasks = tasksItemCollection?.find({
      storyId: storyId,
    });

    fetchTasks?.then((tasks) => {
      console.log('tasks in fetch', tasks);
      setTasks(tasks);
      setLoading(false);
    });
  };

  const addTask = async (newTask: Partial<Task>) => {
    try {
      await tasksItemCollection?.insertOne({
        ...newTask,
        createdAt: new Date(),
      });

      getTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (task: Partial<Task>) => {
    if (task.assigned && !task.startedAt) {
      task.startedAt = new Date();
      task.state = 'doing';
    }

    if (task.assigned && !task.startedAt) {
      task.startedAt = new Date();
      task.state = 'doing';
    }
    await tasksItemCollection?.updateOne({ _id: task._id }, { $set: task });

    getTasks();
  };

  const deleteTask = async (taskId: string) => {
    await tasksItemCollection?.deleteOne({ _id: taskId });

    getTasks();
  };

  return {
    loading,
    tasks,
    addTask,
    updateTask,
    deleteTask,
  };
}
