import { Note } from '../../../common/types/notes.types';
import { FC, useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { useNoteItemStyles } from './styles';
import { NoteDialog } from './dialog/NoteDialog';
import SlateUtils from '../../../common/utils/slateUtils';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DateUtils from '../../../common/utils/dateUtils';
import { NOTE_DATE_FORMAT } from '../../../common/constants/constants';

type Props = {
  note: Note;
  onNoteRemove: (id: Note['id']) => void;
  onNoteUpdate: (note: Note) => void;
};

export const NoteItem: FC<Props> = ({ note, onNoteRemove, onNoteUpdate }) => {
  const { title, description, id, createdDate } = note;
  const classes = useNoteItemStyles();

  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const onDeleteClick = (e: MouseEvent) => {
    e.stopPropagation();
    onNoteRemove(id);
  };

  return (
    <>
      <NoteDialog
        open={dialogOpen}
        note={note}
        closeDialog={closeDialog}
        onNoteUpdate={onNoteUpdate}
      />

      <Card className={classes.container} onClick={openDialog}>
        <CardContent>
          <Typography variant="h5" component="div" className={classes.title}>
            {title}
          </Typography>

          <Typography
            className={classes.description}
            color="text.secondary"
            gutterBottom
          >
            {SlateUtils.serialize(
              SlateUtils.getInitialValueForSlate(description)
            )}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <div className={classes.date}>
            {DateUtils.formatDate(createdDate, NOTE_DATE_FORMAT)}
          </div>
          {/*// @ts-ignore*!/*/}
          <IconButton className={classes.deleteButton} onClick={onDeleteClick}>
            <DeleteOutlineIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};
