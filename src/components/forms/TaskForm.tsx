import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { STORIES_PRIORITIES } from '../../constants/constants';

import { Task } from '../../types/task';
import { useParams } from 'react-router-dom';
import { useTasks } from '../../hooks/useTasks';
import notificationService from '../../services/NotificationService';

type TaskFormValues = Pick<
  Task,
  | 'name'
  | 'description'
  | 'priority'
  | 'storyId'
  | 'state'
  | 'estimation'
  | 'spent'
  | 'assigned'
>;

type TaskFormProps = {
  handleClose: () => void;
  id?: string;
};

const TaskForm = ({ handleClose, id }: TaskFormProps) => {
  const isEditForm = !!id;
  const params = useParams();

  const { id: storyId } = params;

  const { tasks, addTask, updateTask } = useTasks({
    storyId: storyId,
  });

  useEffect(() => {
    if (isEditForm) {
      const task = tasks.find((task) => task._id === id);

      if (task) {
        setValues({
          name: task.name,
          description: task.description,
          priority: task.priority,
          storyId: task.storyId,
          state: task.state,
          estimation: task.estimation,
          spent: task.spent,
          assigned: task.assigned,
        });
      }
    }
  }, [id]);

  const [values, setValues] = useState<TaskFormValues>({
    name: '',
    description: '',
    priority: 'low',
    storyId: storyId || '',
    state: 'todo',
    estimation: 0,
    spent: 0,
    assigned: '',
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>,
  ) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditForm) {
      updateTask({ ...values, _id: id });
    } else {
      addTask({ ...values });

      const newNotification = {
        title: 'New task added!',
        message: `A new task called ${values.name} has been added.`,
        date: new Date().toISOString(),
        priority: values.priority,
        read: false,
      };

      notificationService.send(newNotification);
    }

    handleClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: '10px', fontWeight: 'bold' }}
      >
        {isEditForm ? 'Edit' : 'Add new'} Task
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Description"
        name="description"
        value={values.description}
        onChange={handleChange}
        fullWidth
        required
        multiline
        rows={4}
      />
      <TextField
        type="number"
        label="Estimation"
        name="estimation"
        value={values.estimation}
        onChange={handleChange}
        fullWidth
        required
      />
      {isEditForm && (
        <TextField
          type="number"
          label="Spent"
          name="spent"
          value={values.spent}
          onChange={handleChange}
          fullWidth
          required
        />
      )}
      <Select
        label="Priority"
        name="priority"
        value={values.priority}
        onChange={handleChange}
        fullWidth
        required
      >
        {STORIES_PRIORITIES.map((priority) => (
          <MenuItem key={priority} value={priority}>
            {priority}
          </MenuItem>
        ))}
      </Select>

      <Button fullWidth type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default TaskForm;
