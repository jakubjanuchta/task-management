import Modal, { ModalProps, ModalRef } from '../components/Modal';
import { useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ProjectItem from '../components/ProjectItem';
import { useProjects } from '../hooks/useProjects';

const ProjectsList = () => {
  const { projects, loading, deleteProject } = useProjects();

  const modalRef = useRef<ModalRef>(null);
  const [modalOptions, setModalOptions] = useState<ModalProps>({
    component: 'project',
    action: 'add',
  });

  const openModalWithForm = (options: Omit<ModalProps, 'component'>) => {
    setModalOptions({
      component: 'project',
      ...options,
    });
    modalRef.current?.open();
  };

  return (
    <>
      <Typography variant="h5">Projects Screen</Typography>
      <Button
        onClick={() =>
          openModalWithForm({
            action: 'add',
          })
        }
      >
        Add project
      </Button>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', width: '100%' }}>
        {loading && <Typography>Loading...</Typography>}
        {projects.map((project) => (
          <ProjectItem
            key={project._id}
            project={project}
            handleEdit={() =>
              openModalWithForm({
                action: 'edit',
                itemId: project._id,
              })
            }
            handleRemove={() => deleteProject(project._id)}
          />
        ))}
      </Box>
      <Modal ref={modalRef} {...modalOptions} />
    </>
  );
};

export default ProjectsList;
