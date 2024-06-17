import { useEffect, useState } from 'react';
import { useCollection } from './useCollection';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { Story } from '../types/story';

export function useStories({ projectId }: { projectId?: string }) {
  const { stories, setStories } = useData();

  const { authData } = useAuth();
  const [loading, setLoading] = useState(true);

  const storiesItemCollection = useCollection({
    db: 'task_management',
    collection: 'stories',
  });

  useEffect(() => {
    let shouldUpdate = true;

    if (shouldUpdate) {
      getStories();
    }
    return () => {
      shouldUpdate = false;
    };
  }, [storiesItemCollection, projectId]);

  const getStories = () => {
    const query = projectId ? { projectId } : {};
    const fetchStories = storiesItemCollection?.find(query);

    fetchStories?.then((stories) => {
      setStories(stories);
      setLoading(false);
    });
  };

  const addStory = async (newStory: Partial<Story>) => {
    const owner = authData?.user?.sub;

    if (!owner) return;

    newStory.owner = owner;

    try {
      await storiesItemCollection?.insertOne({
        ...newStory,
        createdAt: new Date(),
      });

      getStories();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStory = async (story: Partial<Story>) => {
    await storiesItemCollection?.updateOne({ _id: story._id }, { $set: story });

    getStories();
  };

  const deleteStory = async (storyId: string) => {
    await storiesItemCollection?.deleteOne({ _id: storyId });

    getStories();
  };

  return {
    loading,
    stories,
    addStory,
    updateStory,
    deleteStory,
  };
}
