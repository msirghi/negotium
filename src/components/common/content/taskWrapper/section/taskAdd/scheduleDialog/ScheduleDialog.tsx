import { FC, useState, MouseEvent, useEffect } from 'react';
import { Menu } from '@mui/material';
import { MenuContent } from './content';
import DateUtils from '../../../../../../../common/utils/dateUtils';
import colors from '../../../../../../../common/styles/colors';
import { makeStyles } from '@mui/styles';
import { Nullable } from '../../../../../../../common/types/common.types';
import { If } from '../../../../../utilities/if/If';
import { useTranslation } from 'next-i18next';

type Props = {
  onDateSelect: (date: Nullable<Date>) => void;
  defaultDate?: Date;
  value?: Date;
  className?: string;
  customTitle?: string;
};

const useStyles = makeStyles({
  root: {
    marginTop: '20px',
    borderRadius: 5,
    padding: '3px 5px',
    width: 'fit-content',
    cursor: 'pointer',
  },
});

export const ScheduleDialog: FC<Props> = ({
  onDateSelect,
  defaultDate,
  className,
  customTitle,
  value,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedDate, setSelectedDate] = useState<Nullable<Date>>(
    defaultDate || null
  );
  const classes = useStyles();
  const { t } = useTranslation('common');

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
    }
  }, [value]);

  const onDatePick = (date: Nullable<Date>) => {
    onDateSelect(date);
    setSelectedDate(date);
    handleClose();
  };

  const handleClickListItem = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        id={'schedule-button'}
        onClick={handleClickListItem}
        className={className || classes.root}
        style={{
          border: selectedDate
            ? `1px solid ${colors.primaries.lightBlue_1}`
            : '1px solid lightgrey',
          color: selectedDate ? colors.primaries.lightBlue_1 : '',
        }}
      >
        <div>
          <If condition={!customTitle}>
            {selectedDate
              ? DateUtils.getDateLabel(selectedDate)
              : t('common.schedule')}
          </If>
          <If condition={!!customTitle}>{customTitle}</If>
        </div>
      </div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuContent onDatePick={onDatePick} selectedDate={selectedDate} />
      </Menu>
    </div>
  );
};
