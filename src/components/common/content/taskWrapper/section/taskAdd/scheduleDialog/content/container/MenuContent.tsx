import { FC } from 'react';
import { PredefinedOptions } from '../predefined/PredefinedOptions';
import { ScheduleCalendar } from '../calendar/ScheduleCalendar';
import { CommonDateProps } from '../types';
import {Nullable} from '../../../../../../../../../common/types/common.types';

export const MenuContent: FC<CommonDateProps> = ({
  onDatePick,
  selectedDate,
}) => {
  const onDateSelect = (date: Nullable<Date>) => {
    onDatePick(date);
  };

  return (
    <div>
      <PredefinedOptions
        onDatePick={onDateSelect}
        selectedDate={selectedDate}
      />
      <ScheduleCalendar onDatePick={onDateSelect} selectedDate={selectedDate} />
    </div>
  );
};
