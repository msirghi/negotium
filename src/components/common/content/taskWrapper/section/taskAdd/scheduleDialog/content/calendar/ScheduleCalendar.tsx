import { FC, useState } from 'react';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { CommonDateProps } from '../types';
import { NullableDate } from '../../../../../../../../../common/types/common.types';

export const ScheduleCalendar: FC<CommonDateProps> = ({
  onDatePick,
  selectedDate,
}) => {
  const [value, setValue] = useState<NullableDate>(selectedDate);

  return (
    <div>
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        value={value}
        showToolbar={false}
        onChange={(newValue) => {
          const date = newValue as unknown as NullableDate;
          setValue(date);
          onDatePick(date);
        }}
        renderInput={() => <></>}
      />
    </div>
  );
};
