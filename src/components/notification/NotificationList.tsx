import React, { useEffect, useState } from 'react';
import notificationService from '../../services/NotificationService';
import {
  List,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Badge,
  Divider,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Notification } from '../../services/NotificationService';

const useStyles = makeStyles(() => ({
  list: {
    width: '100%',
    backgroundColor: 'white',
    padding: '20px',
  },
  card: {
    width: '100%',
    marginBottom: 10,
  },
  highPriority: {
    borderLeft: `5px solid red`,
  },
  mediumPriority: {
    borderLeft: `5px solid orange`,
  },
  lowPriority: {
    borderLeft: `5px solid green`,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 50,
  },
  button: {
    alignSelf: 'flex-end',
  },
}));

const NotificationList = () => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const subscription = notificationService.list().subscribe((notifs) => {
      setNotifications(notifs);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleMarkAsRead = (notification: Notification) => {
    notificationService.markAsRead(notification);
  };

  const getPriorityClass = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return classes.highPriority;
      case 'medium':
        return classes.mediumPriority;
      case 'low':
      default:
        return classes.lowPriority;
    }
  };

  return (
    <List className={classes.list} sx={{ padding: '50px' }}>
      {notifications.map((notification) => (
        <React.Fragment key={notification.date}>
          <Card
            className={`${classes.card} ${getPriorityClass(notification.priority)}`}
          >
            <CardContent className={classes.cardContent}>
              <Box className={classes.cardHeader}>
                <Typography variant="h6" fontWeight={'bold'}>
                  {notification.title}
                </Typography>
                <Badge
                  badgeContent={notification.priority}
                  color={
                    notification.priority === 'high'
                      ? 'error'
                      : notification.priority === 'medium'
                        ? 'warning'
                        : 'success'
                  }
                />
              </Box>
              <Typography>{notification.message}</Typography>
              <Button
                variant="contained"
                color={notification.read ? 'secondary' : 'primary'}
                size="small"
                className={classes.button}
                onClick={() => handleMarkAsRead(notification)}
                disabled={notification.read}
              >
                {notification.read ? 'Already read' : 'Mark as Read'}
              </Button>
            </CardContent>
          </Card>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default NotificationList;
