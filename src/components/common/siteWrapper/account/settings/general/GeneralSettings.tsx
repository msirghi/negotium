import { makeStyles } from '@mui/styles';
import { Divider, MenuItem, TextField } from '@mui/material';
import {
  HOME_VIEW_LIST,
  SUPPORTED_LANGUAGES,
  TIME_FORMATS,
} from '../../../../../../common/constants/constants';
import { useTranslation } from 'next-i18next';
import { Box } from '@mui/system';
import { useCommonStyles } from '../../styles';
import { useIsMobile } from '../../../../../../common/hooks/common/useIsMobile';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/store';
import AccountService from '../../../../../../services/AccountService';
import { setLanguage } from '../../../../../../redux/account/accountSlice';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  dropdown: {
    minWidth: '50%',
  },
});

export const GeneralSettings = () => {
  const commonClasses = useCommonStyles();
  const classes = useStyles();
  const { t } = useTranslation('settings');
  const isMobile = useIsMobile();
  const router = useRouter();
  const userMetadata = useSelector(
    (state: RootState) => state.account.metadata
  );
  const dispatch = useDispatch();

  const updateLanguage = async (evt: { target: { value: string } }) => {
    const language = evt.target.value;
    dispatch(setLanguage(language));
    await AccountService.updateUserLanguage(language);
    await router.push(router.route, router.route, { locale: language });
  };

  return (
    <div>
      <Box className={commonClasses.sectionTitle}>{t('language')}</Box>
      <Box className={commonClasses.sectionBody}>
        <TextField
          select
          value={userMetadata.language}
          size={'small'}
          className={classes.dropdown}
          fullWidth={isMobile}
          onChange={updateLanguage}
        >
          {SUPPORTED_LANGUAGES.map(({ code, title }) => {
            return (
              <MenuItem key={code} value={code}>
                {title}
              </MenuItem>
            );
          })}
        </TextField>
      </Box>

      <Box className={commonClasses.sectionTitle}>{t('homeView')}</Box>
      <Box className={commonClasses.sectionBody}>
        <TextField
          select
          value={'Inbox'}
          size={'small'}
          className={classes.dropdown}
          fullWidth={isMobile}
        >
          {HOME_VIEW_LIST.map(({ title }) => {
            return (
              <MenuItem key={title} value={title}>
                {title}
              </MenuItem>
            );
          })}
        </TextField>
      </Box>

      <Box className={commonClasses.sectionTitle}>
        <Divider />
      </Box>

      <Box className={commonClasses.sectionTitle}>{t('timeFormat')}</Box>
      <Box className={commonClasses.sectionBody}>
        <TextField
          select
          value={'24h'}
          size={'small'}
          className={classes.dropdown}
          fullWidth={isMobile}
        >
          {TIME_FORMATS.map(({ title, key }) => {
            return (
              <MenuItem key={key} value={key}>
                {title}
              </MenuItem>
            );
          })}
        </TextField>
      </Box>
    </div>
  );
};
