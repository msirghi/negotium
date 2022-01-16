import { Note } from '../../../../common/types/notes.types';
import { FC, useCallback, useState } from 'react';
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
import debounce from 'lodash.debounce';
import {useTranslation} from "next-i18next";

type Props = {
  open: boolean;
  note: Note;
  closeDialog: () => void;
  onNoteUpdate: (note: Note) => void;
};

export const NoteDialog: FC<Props> = ({
  note,
  open,
  closeDialog,
  onNoteUpdate,
}) => {
  const { title, description } = note;
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(
    SlateUtils.getInitialValueForSlate(description)
  );
  const classes = useNoteDialogStyles();
  const { t } = useTranslation('notes');

  const onTitleChange = () => {
    return (e: InputChangeEvent) => {
      setTitleValue(e.target.value);
      updateTitleDebounce(e.target.value);
    };
  };

  const onDescriptionChange = () => {
    return (e: Descendant[]) => {
      setDescriptionValue(e);
      updateDescriptionDebounce(JSON.stringify(e));
    };
  };

  const updateNoteTitle = (title: string) => {
    onNoteUpdate({ ...note, title: title || t('noTitle') });
  };

  const updateNoteDescription = (description: string) => {
    onNoteUpdate({ ...note, description });
  };

  const updateTitleDebounce = useCallback(debounce(updateNoteTitle, 1000), []);

  const updateDescriptionDebounce = useCallback(
    debounce(updateNoteDescription, 1000),
    []
  );

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
          className={classes.titleInput}
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
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
