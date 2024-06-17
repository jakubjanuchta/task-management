export type StoryPriority = 'low' | 'medium' | 'high';

export type StoryState = 'todo' | 'doing' | 'done';

export type Story = {
  _id: string;
  name: string;
  description: string;
  priority: StoryPriority;
  projectId: string;
  createdAt: Date;
  state: StoryState;
  owner: string;
};
