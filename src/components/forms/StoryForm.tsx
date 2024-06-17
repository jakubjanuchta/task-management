import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { Story } from '../../types/story';
import { STORIES_PRIORITIES, STORIES_STATES } from '../../constants/constants';
import { useAuth } from '../../contexts/AuthContext';
import { useSelectedProject } from '../../contexts/SelectedProjectContext';
import { useStories } from '../../hooks/useStories';

type StoryFormValues = Pick<
  Story,
  'name' | 'description' | 'priority' | 'projectId' | 'state'
>;

type StoryFormProps = {
  handleClose: () => void;
  id?: string;
};

const StoryForm = ({ handleClose, id }: StoryFormProps) => {
  const isEditForm = !!id;
  const { selectedProject } = useSelectedProject();

  const { stories, addStory, updateStory } = useStories({
    projectId: selectedProject?._id,
  });

  useEffect(() => {
    if (isEditForm) {
      console.log('id', stories, id);
      const story = stories.find((story) => story._id === id);

      if (story) {
        setValues({
          name: story.name,
          description: story.description,
          priority: story.priority,
          projectId: story.projectId,
          state: story.state,
        });
      }
    }
  }, [id]);

  const [values, setValues] = useState<StoryFormValues>({
    name: '',
    description: '',
    priority: 'low',
    projectId: selectedProject?._id || '',
    state: 'todo',
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
      updateStory({ ...values, _id: id });
    } else {
      addStory({ ...values });
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
        {isEditForm ? 'Edit' : 'Add new'} Story
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
      <Select
        label="State"
        name="state"
        value={values.state}
        onChange={handleChange}
        fullWidth
        required
      >
        {STORIES_STATES.map((state) => (
          <MenuItem key={state} value={state}>
            {state}
          </MenuItem>
        ))}
      </Select>
      <Button fullWidth type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default StoryForm;
