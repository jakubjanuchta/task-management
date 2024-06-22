import React, { useEffect, useState } from 'react';
import notificationService from '../../services/NotificationService';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const NotificationCounter = () => {
  const classes = useStyles();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const subscription = notificationService
      .unreadCount()
      .subscribe((count) => {
        setUnreadCount(count);
      });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Box>
      <Link to="/notifications">
        <Badge
          badgeContent={unreadCount}
          color="secondary"
          classes={{ badge: classes.badge }}
          overlap="circular"
        >
          <NotificationsIcon />
        </Badge>
      </Link>
    </Box>
  );
};

export default NotificationCounter;
