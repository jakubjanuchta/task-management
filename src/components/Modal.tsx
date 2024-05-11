import { Box, Modal as ModalComponent } from '@mui/material';
import {
  Ref,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import ProjectForm from './forms/ProjectForm';

export type ActionType = 'add' | 'edit';

export type ModalComponentType = 'project';

export type ModalProps = {
  component: ModalComponentType;
  action: ActionType;
  itemId?: string;
};

export type ModalRef = {
  open: () => void;
  close: () => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 3,
  px: 4,
  pb: 3,
};

const getModalComponent = (
  component: ModalComponentType,
  action: ActionType,
  handleClose: () => void,
  itemId?: string,
) => {
  switch (component) {
    case 'project':
      switch (action) {
        case 'add':
          return <ProjectForm handleClose={handleClose} />;
        case 'edit':
          return <ProjectForm handleClose={handleClose} id={itemId} />;
      }
  }
};

const Modal = forwardRef(
  ({ component, action, itemId }: ModalProps, ref: Ref<ModalRef>) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
      setOpen(false);
    };

    const Component = useCallback(
      () => getModalComponent(component, action, handleClose, itemId),
      [component, action],
    );

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    return (
      <ModalComponent open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 400 }}>
          <Component />
        </Box>
      </ModalComponent>
    );
  },
);

Modal.displayName = 'Modal';

export default Modal;
