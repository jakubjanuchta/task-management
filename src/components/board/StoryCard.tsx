import { Story } from '../../types/story';
import { useStyles } from './Board';
import { Card, CardContent, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useNavigate } from 'react-router-dom';

type StoryCardProps = {
  story: Story;
  handleEdit: () => void;
  handleRemove: () => void;
};

export const StoryCard = ({
  story,
  handleEdit,
  handleRemove,
}: StoryCardProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  let priorityClass;

  switch (story.priority) {
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
          <Box>
            <Typography
              variant="h5"
              style={{ fontWeight: 'bold' }}
              color="textSecondary"
            >
              {story.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {story.description}
            </Typography>
            <Typography variant="overline">
              Priority: {story.priority}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: 'column',
            }}
          >
            <EditIcon onClick={() => handleEdit()} />
            <DeleteIcon onClick={() => handleRemove()} />
            <ChecklistIcon onClick={() => navigate(`story/${story._id}`)} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
