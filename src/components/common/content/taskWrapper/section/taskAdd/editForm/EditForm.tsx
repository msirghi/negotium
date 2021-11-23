import { FC } from 'react';
import { TextField } from '@mui/material';
import { ScheduleDialog } from '../scheduleDialog/ScheduleDialog';
import { Nullable } from '../../../../../../../common/types/common.types';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'next-i18next';
import MentionInput from '../../../../../form/input/mention/MentionInput';
import { MENTION_ARRAY_KEYWORDS } from '../../../../../../../common/constants/constants';
import SlateUtils from '../../../../../../../common/utils/slateUtils';

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

  const onChange = (val: any) => {
    const stringified = JSON.stringify(val);
    setFieldValue(stringified);
    SlateUtils.detectDateKeywords(stringified, (date) => onDateSelect(date));
  };

  return (
    <div className={classes.root}>
      <MentionInput onChange={onChange} keywords={MENTION_ARRAY_KEYWORDS} />
      {/*<TextField*/}
      {/*  value={fieldValue}*/}
      {/*  fullWidth*/}
      {/*  size={'small'}*/}
      {/*  variant={'standard'}*/}
      {/*  inputProps={{*/}
      {/*    'data-testid': 'tab-title-field',*/}
      {/*  }}*/}
      {/*  placeholder={t('inputPlaceholders.addTask')}*/}
      {/*  InputProps={{ disableUnderline: true }}*/}
      {/*  onChange={(e) => setFieldValue(e.target.value)}*/}
      {/*/>*/}
      <ScheduleDialog onDateSelect={onDateSelect} defaultDate={defaultDate} />
    </div>
  );
};
