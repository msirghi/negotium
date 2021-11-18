import { Box, Button, ButtonProps, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FC, MutableRefObject, useRef, useState } from 'react';
import { If } from '../../../../utilities/if/If';
import { EditForm } from './editForm/EditForm';
import { makeStyles } from '@mui/styles';
import { Nullable } from '../../../../../../common/types/common.types';
import { useIsMobile } from '../../../../../../common/hooks/common/useIsMobile';

const CustomButton = styled(Button)<ButtonProps>(() => ({
  color: 'grey',
  width: '100%'
}));

const useStyles = makeStyles({
  cancelButton: {
    marginLeft: 10,
  },
});

type Props = {
  onTaskAdd: (title: string, date: Nullable<Date>) => void;
  defaultDate?: Date;
};

export const TaskAddButton: FC<Props> = ({ onTaskAdd, defaultDate }) => {
  const [editMode, setEditMode] = useState(false);
  const [fieldValue, setFieldValue] = useState('');
  const classes = useStyles();
  const selectedDate = useRef<Nullable<Date>>(
    defaultDate || null
  ) as MutableRefObject<Nullable<Date>>;
  const isMobile = useIsMobile();

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const onCancelClick = () => {
    setEditMode(false);
    setFieldValue('');
  };

  const onSave = () => {
    onTaskAdd(fieldValue, selectedDate.current);
    onDateSelect(null);
    setEditMode(false);
    setFieldValue('');
  };

  const onDateSelect = (date: Nullable<Date>) => {
    selectedDate.current = date;
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
          <form onSubmit={onSave}>
            <EditForm
              defaultDate={defaultDate}
              fieldValue={fieldValue}
              setFieldValue={setFieldValue}
              onDateSelect={onDateSelect}
            />
            <Box sx={{ marginTop: '.5rem' }}>
              <Button
                variant={'contained'}
                data-testid={'tab-submit-button'}
                disabled={!fieldValue}
                onClick={onSave}
                size={'small'}
              >
                Add task
              </Button>
              <Button
                className={classes.cancelButton}
                data-testid={'tab-cancel-button'}
                onClick={onCancelClick}
                size={'small'}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </If>
    </>
  );
};
