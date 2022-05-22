import { makeStyles } from '@mui/styles';
import { Divider } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { Box } from '@mui/system';
import { useCommonStyles } from '../../styles';
import { NotificationsSettings } from './notifications/NotificationsSettings';
import { HomeViewSelector } from './homeViewSelector/HomeviewSelector';
import { LanguageSelector } from './languageSelector/LanguageSelector';
import { GeneralSettingsSection } from './section/GeneralSettingsSection';
import { TimeFormatSelector } from './timeFormatSelector/TimeFormatSelector';

const useStyles = makeStyles({
  dropdown: {
    minWidth: '50%',
  },
});

export const GeneralSettings = () => {
  const commonClasses = useCommonStyles();
  const classes = useStyles();
  const { t } = useTranslation('settings');

  return (
    <div>
      <GeneralSettingsSection title={t('language')}>
        <LanguageSelector className={classes.dropdown} />
      </GeneralSettingsSection>

      <GeneralSettingsSection title={t('homeView')}>
        <HomeViewSelector className={classes.dropdown} />
      </GeneralSettingsSection>

      <Box className={commonClasses.sectionTitle}>
        <Divider />
      </Box>

      <GeneralSettingsSection title={t('timeFormat')}>
        <TimeFormatSelector className={classes.dropdown} />
      </GeneralSettingsSection>

      <Box className={commonClasses.sectionTitle}>
        <Divider />
      </Box>

      <Box className={commonClasses.sectionTitle}>{t('titles.notifications')}</Box>
      <Box className={commonClasses.sectionBody}>
        <NotificationsSettings />
      </Box>
    </div>
  );
};
