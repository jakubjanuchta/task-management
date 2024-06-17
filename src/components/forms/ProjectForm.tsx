import { TextField, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Project } from '../../types/project';
import { useProjects } from '../../hooks/useProjects';

type ProjectFormValues = Pick<Project, 'name' | 'description'>;

type ProjectFormProps = {
  handleClose: () => void;
  id?: string;
};

const ProjectForm = ({ handleClose, id }: ProjectFormProps) => {
  const isEditForm = !!id;

  const { projects, addProject, updateProject } = useProjects();

  useEffect(() => {
    if (isEditForm) {
      const project = projects.find((project) => project._id === id);

      if (project) {
        setValues({
          name: project.name,
          description: project.description,
        });
      }
    }
  }, [id]);

  const [values, setValues] = useState<ProjectFormValues>({
    name: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditForm) {
      updateProject({ ...values, _id: id });
    } else {
      addProject({ ...values });
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
        {isEditForm ? 'Edit' : 'Add new'} project
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
      <Button fullWidth type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default ProjectForm;
