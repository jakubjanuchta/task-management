import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import notificationService, {
  Notification,
} from '../../services/NotificationService';
import { styled } from '@mui/system';

const PriorityStyledDialog = styled(Dialog)(
  ({ priority }: { priority?: Notification['priority'] }) => ({
    '& .MuiPaper-root': {
      borderTop:
        priority === 'high'
          ? '5px solid red'
          : priority === 'medium'
            ? '5px solid orange'
            : 'none',
    },
  }),
);

const HighPriorityNotifications = () => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const subscription = notificationService
      .highPriorityNotifications()
      .subscribe((notif) => {
        setNotification(notif);
        setIsOpen(true);
      });

    return () => subscription.unsubscribe();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setNotification(null);
  };

  return (
    <PriorityStyledDialog
      open={isOpen}
      onClose={handleClose}
      priority={notification?.priority}
    >
      <DialogTitle
        sx={{
          color: notification?.priority === 'high' ? 'red' : 'orange',
          fontWeight: 'bold',
          textTransform: 'capitalize',
        }}
      >
        {notification?.priority} priority !!!
      </DialogTitle>
      <DialogTitle>{notification?.title}</DialogTitle>
      <DialogContent>
        <p>{notification?.message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </PriorityStyledDialog>
  );
};

export default HighPriorityNotifications;
