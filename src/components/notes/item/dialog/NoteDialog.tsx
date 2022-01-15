import { Note } from '../../../../common/types/notes.types';
import { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { BorderlessInput } from '../../../common/form/input/borderlessInput/BorderlessInput';
import { Box } from '@mui/system';
import { useNoteDialogStyles } from './styles';
import RichTextField from '../../../common/form/input/richText/RichTextField';
import { InputChangeEvent } from '../../../../common/types/common.types';
import { Descendant } from 'slate';
import SlateUtils from '../../../../common/utils/slateUtils';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  open: boolean;
  note: Note;
  closeDialog: () => void;
};

export const NoteDialog: FC<Props> = ({ note, open, closeDialog }) => {
  const { title, description } = note;
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(
    SlateUtils.getInitialValueForSlate(description)
  );
  const classes = useNoteDialogStyles();

  const onTitleChange = () => {
    return (e: InputChangeEvent) => setTitleValue(e.target.value);
  };

  const onDescriptionChange = () => {
    return (e: Descendant[]) => setDescriptionValue(e);
  };

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth>
      <DialogTitle className={classes.titleContainer}>
        <IconButton onClick={closeDialog} className={classes.closeIcon}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className={classes.container}>
        <BorderlessInput
          variant="standard"
          value={titleValue}
          onChange={onTitleChange()}
          InputProps={{ style: { fontWeight: 'bold', fontSize: 18 } }}
        />
        <Box className={classes.descriptionContainer}>
          <RichTextField
            value={descriptionValue}
            setValue={onDescriptionChange()}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color={'primary'} onClick={closeDialog}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
