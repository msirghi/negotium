import { FC, useState } from 'react';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import { useNotesAddInputStyles } from './styles';
import { NotesAddForm } from './form/NotesAddForm';
import { If } from '../../common/utilities/if/If';
import { BorderlessInput } from '../../common/form/input/borderlessInput/BorderlessInput';

export const NotesAddInput: FC = () => {
  const classes = useNotesAddInputStyles();

  const [editFormOpen, setEditFormOpen] = useState(false);

  const openEditForm = () => setEditFormOpen(true);

  const closeEditForm = () => setEditFormOpen(false);

  return (
    <Box className={classes.container}>
      <If condition={!editFormOpen}>
        <Box className={classes.inputToggler}>
          <BorderlessInput
            variant={'standard'}
            onFocus={openEditForm}
            className={classes.input}
            placeholder={'Add a note...'}
          />
        </Box>
      </If>
      <If condition={editFormOpen}>
        <NotesAddForm onClose={closeEditForm} />
      </If>
    </Box>
  );
};
