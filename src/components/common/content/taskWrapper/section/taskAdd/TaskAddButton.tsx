import { Box, Button, ButtonProps, styled, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { If } from '../../../../utilities/if/If';

const CustomButton = styled(Button)<ButtonProps>(() => ({
  color: 'grey',
  paddingRight: '95%',
}));

export const TaskAddButton = () => {
  const [editMode, setEditMode] = useState(false);
  const [fieldValue, setFieldValue] = useState('');

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const onCancelClick = () => {
    setEditMode(false);
    setFieldValue('');
  }

  return (
    <>
      <If condition={!editMode}>
        <CustomButton
          startIcon={<AddIcon />}
          disableRipple
          onClick={toggleEditMode}
        >
          Add
        </CustomButton>
      </If>
      <If condition={editMode}>
        <Box sx={{ marginTop: '1rem' }}>
          <TextField
            value={fieldValue}
            fullWidth
            size={'small'}
            placeholder={'New task'}
            onChange={(e) => setFieldValue(e.target.value)}
          />
          <Box sx={{ marginTop: '.5rem' }}>
            <Button variant={'contained'} disabled={!fieldValue}>
              Add task
            </Button>
            <Button onClick={onCancelClick}>Cancel</Button>
          </Box>
        </Box>
      </If>
    </>
  );
};
