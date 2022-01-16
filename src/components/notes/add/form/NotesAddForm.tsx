import { Button } from '@mui/material';
import { useNotesAddFormStyles } from './styles';
import { Box } from '@mui/system';
import { FC, FormEvent, useState } from 'react';
import { BorderlessInput } from '../../../common/form/input/borderlessInput/BorderlessInput';
import { TextInputChangeEvent } from '../../../../common/constants/types';
import SlateUtils from '../../../../common/utils/slateUtils';
import RichTextField from '../../../common/form/input/richText/RichTextField';
import { Descendant } from 'slate';
import { Note } from '../../../../common/types/notes.types';
import { useTranslation } from 'next-i18next';

type Props = {
  onClose: () => void;
  onNoteAdd: (note: Omit<Note, 'id' | 'createdDate'>) => void;
};

export const NotesAddForm: FC<Props> = ({ onClose, onNoteAdd }) => {
  const classes = useNotesAddFormStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(
    SlateUtils.getInitialValueForSlate(undefined)
  );
  const { t } = useTranslation('notes');

  const onTitleChange = () => {
    return (e: TextInputChangeEvent) => setTitle(e.target.value);
  };

  const onDescriptionChange = () => {
    return (e: Descendant[]) => setDescription(e);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNoteAdd({ title, description: JSON.stringify(description) });
    onClose();
    setTitle('');
    setDescription(SlateUtils.getInitialValueForSlate(undefined));
  };

  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      <BorderlessInput
        autoFocus
        value={title}
        className={classes.input}
        size={'small'}
        placeholder={t('noteTitleFieldPlaceholder')}
        variant={'standard'}
        InputProps={{ style: { fontWeight: 'bold' } }}
        onChange={onTitleChange()}
      />

      <RichTextField value={description} setValue={onDescriptionChange()} />

      <Box className={classes.actions}>
        <Button onClick={onClose} className={classes.closeButton}>
          {t('close')}
        </Button>
      </Box>
    </form>
  );
};
