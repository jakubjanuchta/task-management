export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskState = 'todo' | 'doing' | 'done';

export type Task = {
  _id: string;
  name: string;
  description: string;
  priority: TaskPriority;
  storyId: string;
  createdAt: Date;
  startedAt: Date;
  finishedAt: Date;
  state: TaskState;
  assigned: string;
  estimation: number;
  spent: number;
};
