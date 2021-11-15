import { Nullable } from '../../../../../../../../common/types/common.types';

export type CommonDateProps = {
  onDatePick: (date: Nullable<Date>) => void;
  selectedDate: Nullable<Date>;
};
