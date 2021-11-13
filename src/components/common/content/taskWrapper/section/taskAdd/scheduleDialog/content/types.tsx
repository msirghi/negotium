import { NullableDate } from '../../../../../../../../common/types/common.types';

export type CommonDateProps = {
  onDatePick: (date: NullableDate) => void;
  selectedDate: NullableDate;
};
