import { Box, Grid, Theme, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Story } from '../../types/story';
import { STORIES_STATES } from '../../constants/constants';
import Modal, { ModalProps, ModalRef } from '../Modal';
import { useRef, useState } from 'react';
import { useStories } from '../../hooks/useStories';
import { useSelectedProject } from '../../contexts/SelectedProjectContext';
import { StoryCard } from './StoryCard';
import { Task } from '../../types/task';
import { TaskCard } from './TaskCard';
import { useTasks } from '../../hooks/useTasks';
import { useParams } from 'react-router-dom';
import { grey } from '@mui/material/colors';

type Item = Story | Task;

type BoardProps = {
  items: Item[];
  type: 'story' | 'task';
};

export const useStyles = makeStyles((theme: Theme) => ({
  column: {
    padding: '16px',
    '&:nth-child(odd)': {
      backgroundColor: theme.palette.mode === 'dark' ? grey[800] : grey[200],
    },
    '&:nth-child(even)': {
      backgroundColor: theme.palette.mode === 'dark' ? grey[700] : grey[100],
    },
  },
  columnHeader: {
    marginBottom: '20px',
  },
  columnHeaderText: {
    fontSize: '24px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  priorityHigh: {
    color: 'red',
  },
  priorityMedium: {
    color: 'orange',
  },
  priorityLow: {
    color: 'green',
  },
}));

const Board = ({ items, type }: BoardProps) => {
  const classes = useStyles();
  const { id: storyId } = useParams();

  console.log('items', items);

  const { selectedProject } = useSelectedProject();
  const { deleteStory } = useStories({ projectId: selectedProject?._id });
  const { deleteTask } = useTasks({ storyId: storyId });

  const modalRef = useRef<ModalRef>(null);

  const [modalOptions, setModalOptions] = useState<ModalProps>({
    component: 'story',
    action: 'add',
  });

  const openModalWithForm = (options: Omit<ModalProps, 'component'>) => {
    setModalOptions({
      component: type,
      ...options,
    });
    modalRef.current?.open();
  };

  return (
    <Grid
      container
      spacing={3}
      style={{
        width: '100%',
        maxWidth: '1200px',
        alignSelf: 'center',
        marginTop: '50px',
      }}
    >
      {STORIES_STATES.map((state, i) => (
        <Grid item key={i} xs={4} className={classes.column}>
          <Box className={classes.columnHeader}>
            <Typography
              variant="h4"
              gutterBottom
              className={classes.columnHeaderText}
            >
              {state}
            </Typography>
          </Box>
          {items
            .filter((t) => t.state === state)
            .map((item, index) =>
              type === 'task' ? (
                <TaskCard
                  key={index}
                  task={item as Task}
                  handleEdit={() => {
                    openModalWithForm({
                      action: 'edit',
                      itemId: item._id,
                    });
                  }}
                  handleRemove={() => deleteTask(item._id)}
                />
              ) : (
                <StoryCard
                  key={index}
                  story={item as Story}
                  handleEdit={() => {
                    openModalWithForm({
                      action: 'edit',
                      itemId: item._id,
                    });
                  }}
                  handleRemove={() => deleteStory(item._id)}
                />
              ),
            )}
        </Grid>
      ))}
      <Modal ref={modalRef} {...modalOptions} />
    </Grid>
  );
};

export default Board;
