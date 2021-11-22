import { FC } from 'react';
import { TextField } from '@mui/material';
import { ScheduleDialog } from '../scheduleDialog/ScheduleDialog';
import { Nullable } from '../../../../../../../common/types/common.types';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'next-i18next';

type Props = {
  fieldValue: string;
  setFieldValue: (title: string) => void;
  onDateSelect: (date: Nullable<Date>) => void;
  defaultDate?: Date;
};

const useStyles = makeStyles({
  root: {
    padding: 10,
    border: '1px solid lightgrey',
    borderRadius: 5,
  },
});

export const EditForm: FC<Props> = ({
  fieldValue,
  setFieldValue,
  onDateSelect,
  defaultDate,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <TextField
        value={fieldValue}
        fullWidth
        size={'small'}
        variant={'standard'}
        inputProps={{
          'data-testid': 'tab-title-field',
        }}
        placeholder={t('inputPlaceholders.addTask')}
        InputProps={{ disableUnderline: true }}
        onChange={(e) => setFieldValue(e.target.value)}
      />
      <ScheduleDialog onDateSelect={onDateSelect} defaultDate={defaultDate} />
    </div>
  );
};
