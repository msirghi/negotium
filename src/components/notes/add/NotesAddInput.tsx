import { FC, useState } from 'react';
import { Box } from '@mui/system';
import { useNotesAddInputStyles } from './styles';
import { NotesAddForm } from './form/NotesAddForm';
import { If } from '../../common/utilities/if/If';
import { BorderlessInput } from '../../common/form/input/borderlessInput/BorderlessInput';
import { Note } from '../../../common/types/notes.types';
import useTranslation from 'next-translate/useTranslation';

type Props = {
  onNoteAdd: (note: Omit<Note, 'id' | 'createdDate'>) => void;
};

export const NotesAddInput: FC<Props> = ({ onNoteAdd }) => {
  const classes = useNotesAddInputStyles();
  const { t } = useTranslation('notes');

  const [editFormOpen, setEditFormOpen] = useState(false);

  const openEditForm = () => setEditFormOpen(true);

  const closeEditForm = () => setEditFormOpen(false);

  return (
    <Box className={classes.container}>
      <If condition={!editFormOpen}>
        <Box className={classes.inputToggler}>
          <BorderlessInput variant={'standard'} onFocus={openEditForm} className={classes.input} placeholder={t('addNote')} />
        </Box>
      </If>
      <If condition={editFormOpen}>
        <NotesAddForm onClose={closeEditForm} onNoteAdd={onNoteAdd} />
      </If>
    </Box>
  );
};
