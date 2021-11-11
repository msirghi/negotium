import { Box, Button, ButtonProps, styled, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FC, useState } from 'react';
import { If } from '../../../../utilities/if/If';

const CustomButton = styled(Button)<ButtonProps>(() => ({
  color: 'grey',
  paddingRight: '95%',
}));

type Props = {
  onTaskAdd: (title: string) => void;
};

export const TaskAddButton: FC<Props> = ({ onTaskAdd }) => {
  const [editMode, setEditMode] = useState(false);
  const [fieldValue, setFieldValue] = useState('');

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const onCancelClick = () => {
    setEditMode(false);
    setFieldValue('');
  };

  const onSave = () => {
    onTaskAdd(fieldValue);
    setEditMode(false);
    setFieldValue('');
  };

  return (
    <>
      <If condition={!editMode}>
        <CustomButton
            data-testid={'tab-add-button'}
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
            inputProps={{
              'data-testid': 'tab-title-field',
            }}
            placeholder={'New task'}
            onChange={(e) => setFieldValue(e.target.value)}
          />
          <Box sx={{ marginTop: '.5rem' }}>
            <Button
              variant={'contained'}
              data-testid={'tab-submit-button'}
              disabled={!fieldValue}
              onClick={onSave}
            >
              Add task
            </Button>
            <Button data-testid={'tab-cancel-button'} onClick={onCancelClick}>Cancel</Button>
          </Box>
        </Box>
      </If>
    </>
  );
};
