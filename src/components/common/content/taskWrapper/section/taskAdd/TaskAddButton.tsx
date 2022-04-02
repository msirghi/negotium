import { Box, Button, ButtonProps, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FC, MutableRefObject, useRef, useState } from 'react';
import { If } from '../../../../utilities/if/If';
import { EditForm } from './editForm/EditForm';
import { makeStyles } from '@mui/styles';
import { Nullable } from '../../../../../../common/types/common.types';
import useTranslation from 'next-translate/useTranslation';

const CustomButton = styled(Button)<ButtonProps>(() => ({
  color: 'grey',
  width: '100%',
  marginTop: 10,
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
  const selectedDate = useRef<Nullable<Date>>(defaultDate || null) as MutableRefObject<Nullable<Date>>;
  const { t } = useTranslation('common');

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
        <CustomButton id={'tab-add-button'} data-testid={'tab-add-button'} startIcon={<AddIcon />} disableRipple onClick={toggleEditMode}>
          <span>{t('buttonLabels.add')}</span>
        </CustomButton>
      </If>
      <If condition={editMode}>
        <Box sx={{ marginTop: '1rem', width: '100%' }}>
          <form onSubmit={onSave} data-testid={'tab-title-field'}>
            <EditForm defaultDate={defaultDate} fieldValue={fieldValue} setFieldValue={setFieldValue} onDateSelect={onDateSelect} />
            <Box sx={{ marginTop: '.5rem' }}>
              <Button
                variant={'contained'}
                data-testid={'tab-submit-button'}
                disabled={!fieldValue}
                onClick={onSave}
                size={'small'}
                id={'tab-submit-button'}
              >
                {t('buttonLabels.addTask')}
              </Button>
              <Button
                className={classes.cancelButton}
                id={'tab-cancel-button'}
                data-testid={'tab-cancel-button'}
                onClick={onCancelClick}
                size={'small'}
              >
                {t('buttonLabels.cancel')}
              </Button>
            </Box>
          </form>
        </Box>
      </If>
    </>
  );
};
