import { FC, useState } from 'react';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { CommonDateProps } from '../types';
import { Nullable } from '../../../../../../../../../common/types/common.types';

export const ScheduleCalendar: FC<CommonDateProps> = ({
  onDatePick,
  selectedDate,
}) => {
  const [value, setValue] = useState<Nullable<Date>>(selectedDate);

  return (
    <div>
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        value={value}
        showToolbar={false}
        onChange={(newValue) => {
          setValue(newValue);
          onDatePick(newValue);
        }}
        renderInput={() => <></>}
      />
    </div>
  );
};
