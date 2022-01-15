import { Note } from '../../../common/types/notes.types';
import { FC, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useNoteItemStyles } from './styles';
import { NoteDialog } from './dialog/NoteDialog';
import SlateUtils from '../../../common/utils/slateUtils';

type Props = {
  note: Note;
};

export const NoteItem: FC<Props> = ({ note }) => {
  const { title, description } = note;
  const classes = useNoteItemStyles();

  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <NoteDialog open={dialogOpen} note={note} closeDialog={closeDialog} />

      <Card className={classes.container} onClick={openDialog}>
        <CardContent>
          <Typography variant="h5" component="div">
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
      </Card>
    </>
  );
};
