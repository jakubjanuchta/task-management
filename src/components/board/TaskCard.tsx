import { useStyles } from './Board';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Task } from '../../types/task';
import { useUsers } from '../../hooks/useUsers';
import { useTasks } from '../../hooks/useTasks';

type TaskCardProps = {
  task: Task;
  handleEdit: () => void;
  handleRemove: () => void;
};

export const TaskCard = ({ task, handleEdit, handleRemove }: TaskCardProps) => {
  const classes = useStyles();
  const { users } = useUsers();
  const { updateTask } = useTasks({ storyId: task.storyId });

  let priorityClass;

  switch (task.priority) {
    case 'high':
      priorityClass = classes.priorityHigh;
      break;
    case 'medium':
      priorityClass = classes.priorityMedium;
      break;
    case 'low':
      priorityClass = classes.priorityLow;
      break;
    default:
      priorityClass = '';
      break;
  }

  const handleAssignedChange = (event: SelectChangeEvent<string>) => {
    updateTask({ ...task, assigned: event.target.value as string });
  };

  const handleFinishTask = () => {
    updateTask({ ...task, state: 'done', finishedAt: new Date() });
  };

  return (
    <Card
      style={{
        marginBottom: '16px',
        borderTop: '5px solid',
        width: '100%',
      }}
      className={priorityClass}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'space-between',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            style={{ fontWeight: 'bold' }}
            color="textSecondary"
          >
            {task.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: 'column',
            }}
          >
            <EditIcon onClick={() => handleEdit()} />
            <DeleteIcon onClick={() => handleRemove()} />
          </Box>
        </Box>
        <Typography variant="body2" color="textSecondary">
          {task.description}
        </Typography>
        <Box>
          <Typography variant="overline">Priority: {task.priority}</Typography>
        </Box>
        <Box>
          <Typography color="textSecondary" variant="overline">
            Estimation: {task.estimation} h
          </Typography>
        </Box>
        <Box>
          <Typography color="textSecondary" variant="overline">
            Spent: {task.spent} h
          </Typography>
        </Box>
        <Box>
          <Typography color="textSecondary" variant="overline">
            Assigned to
          </Typography>
          <Select
            label="Assigned"
            value={task.assigned}
            onChange={handleAssignedChange}
            fullWidth
            required
            placeholder="assign"
          >
            {users
              .filter((user) => user.role !== 'admin')
              .map((user) => (
                <MenuItem key={user._id} value={user.email}>
                  {user.email}
                </MenuItem>
              ))}
          </Select>
        </Box>
        {task.createdAt && (
          <Box>
            <Typography color="textSecondary" variant="overline">
              Created at: {task.createdAt.toLocaleString()}
            </Typography>
          </Box>
        )}
        {task.startedAt && (
          <Box>
            <Typography color="textSecondary" variant="overline">
              Started at: {task.startedAt.toLocaleString()}
            </Typography>
          </Box>
        )}
        {task.finishedAt && (
          <Box>
            <Typography color="textSecondary" variant="overline">
              Finished at: {task.finishedAt.toLocaleString()}
            </Typography>
          </Box>
        )}
        {task.state === 'doing' && (
          <Box marginTop={1}>
            <Button onClick={handleFinishTask} variant="contained" fullWidth>
              Finish task
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
