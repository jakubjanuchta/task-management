import { Box, Button } from '@mui/material';

import { useParams } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import Board from '../components/board/Board';
import Modal, { ModalProps, ModalRef } from '../components/Modal';
import { useRef, useState } from 'react';

const ProjectsScreen = () => {
  const params = useParams();

  const { tasks } = useTasks({ storyId: params.id });


  const modalRef = useRef<ModalRef>(null);
  const [modalOptions, setModalOptions] = useState<ModalProps>({
    component: 'story',
    action: 'add',
  });

  const openModalWithForm = (options: Omit<ModalProps, 'component'>) => {
    setModalOptions({
      component: 'task',
      ...options,
    });
    modalRef.current?.open();
  };
  return (
    <Box
      sx={{ p: 4 }}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <h1>Tasks</h1>
      <Button
        variant="contained"
        onClick={() =>
          openModalWithForm({
            action: 'add',
          })
        }
      >
        Add task
      </Button>
      <Board items={tasks} type="task" />
      <Modal ref={modalRef} {...modalOptions} />
    </Box>
  );
};

export default ProjectsScreen;
