import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationsEnabledSelector } from '../../../../../../../redux/selectors/account.selector';
import { setNotificationsEnabled } from '../../../../../../../redux/account/accountSlice';
import { makeStyles } from '@mui/styles';
import useTranslation from 'next-translate/useTranslation';

const useStyles = makeStyles({
  helperText: {
    fontSize: 13,
    marginTop: -5,
  },
});

export const NotificationsSettings = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const notificationsEnabled = useSelector(notificationsEnabledSelector);
  const { t } = useTranslation('settings');

  const handleChange = (event: MouseEvent<HTMLElement>, flag: boolean) => {
    dispatch(setNotificationsEnabled(flag));
  };

  return (
    <>
      <p className={classes.helperText}>{t('helperTexts.notificationsHelperText')}</p>
      <ToggleButtonGroup color="primary" value={notificationsEnabled} exclusive onChange={handleChange}>
        <ToggleButton value={true}>{t('on')}</ToggleButton>
        <ToggleButton value={false}>{t('off')}</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};
