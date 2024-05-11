type StoryPriority = 'low' | 'medium' | 'high';

export type Story = {
  id: string;
  name: string;
  description: string;
  priority: StoryPriority;
};
