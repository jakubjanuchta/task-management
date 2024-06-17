import { Button, Grid } from '@mui/material';
import { useSelectedProject } from '../contexts/SelectedProjectContext';
import { useRef, useState } from 'react';
import Modal, { ModalProps, ModalRef } from '../components/Modal';
import Board from './board/Board';
import { useStories } from '../hooks/useStories';

const SelectedProjectScreen = () => {
  const { selectedProject } = useSelectedProject();
  const { stories, loading } = useStories({
    projectId: selectedProject?._id,
  });

  const modalRef = useRef<ModalRef>(null);
  const [modalOptions, setModalOptions] = useState<ModalProps>({
    component: 'story',
    action: 'add',
  });

  const openModalWithForm = (options: Omit<ModalProps, 'component'>) => {
    setModalOptions({
      component: 'story',
      ...options,
    });
    modalRef.current?.open();
  };

  return (
    <Grid
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <h1>Project board: {selectedProject?.name}</h1>
      <Button
        variant="contained"
        onClick={() =>
          openModalWithForm({
            action: 'add',
          })
        }
      >
        Add story
      </Button>
      {!loading && <Board items={stories} type="story" />}
      <Modal ref={modalRef} {...modalOptions} />
    </Grid>
  );
};

export default SelectedProjectScreen;
