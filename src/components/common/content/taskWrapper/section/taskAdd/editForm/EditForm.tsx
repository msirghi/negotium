import { FC, useState } from 'react';
import { ScheduleDialog } from '../scheduleDialog/ScheduleDialog';
import { Nullable } from '../../../../../../../common/types/common.types';
import { makeStyles } from '@mui/styles';
import MentionInput from '../../../../../form/input/mention/MentionInput';
import { MENTION_ARRAY_KEYWORDS } from '../../../../../../../common/constants/constants';
import SlateUtils from '../../../../../../../common/utils/slateUtils';
import FeatureToggles from '../../../../../../../utilities/featureToggles/FeatureToggles';
import { If } from '../../../../../utilities/if/If';
import { TextField } from '@mui/material';
import StringUtils from '../../../../../../../common/utils/stringUtils';

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
  const [date, setDate] = useState<string>();

  const onChange = (val: any) => {
    const values = StringUtils.getTaskInputDateByKeywords(val.target.value);
    if (values.date) {
      setDate(values.date);
      onDateSelect(values.date as unknown as Nullable<Date>);
    }

    setFieldValue(values.value);
  };

  return (
    <div className={classes.root}>
      <TextField
        autoFocus
        value={fieldValue}
        fullWidth
        size={'small'}
        variant={'standard'}
        inputProps={{
          'data-testid': 'tab-title-field-edit',
        }}
        placeholder={'New task'}
        InputProps={{ disableUnderline: true }}
        onChange={onChange}
      />
      <ScheduleDialog
        onDateSelect={onDateSelect}
        defaultDate={defaultDate}
        // @ts-ignore
        value={date as string}
      />
    </div>
  );
};
