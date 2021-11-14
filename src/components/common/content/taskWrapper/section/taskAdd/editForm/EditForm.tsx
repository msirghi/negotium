import { FC } from 'react';
import { TextField } from '@mui/material';
import { ScheduleDialog } from '../scheduleDialog/ScheduleDialog';
import { NullableDate } from '../../../../../../../common/types/common.types';

type Props = {
  fieldValue: string;
  setFieldValue: (title: string) => void;
  onDateSelect: (date: NullableDate) => void;
  defaultDate?: Date;
};

export const EditForm: FC<Props> = ({
  fieldValue,
  setFieldValue,
  onDateSelect,
  defaultDate,
}) => {
  return (
    <div
      style={{
        padding: 10,
        border: '1px solid lightgrey',
        borderRadius: 5,
      }}
    >
      <TextField
        value={fieldValue}
        fullWidth
        size={'small'}
        variant={'standard'}
        inputProps={{
          'data-testid': 'tab-title-field',
        }}
        placeholder={'New task'}
        InputProps={{ disableUnderline: true }}
        onChange={(e) => setFieldValue(e.target.value)}
      />
      <ScheduleDialog onDateSelect={onDateSelect} defaultDate={defaultDate} />
    </div>
  );
};
