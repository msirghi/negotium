import { makeStyles } from '@mui/styles';
import { Divider, MenuItem, TextField } from '@mui/material';
import { TIME_FORMATS } from '../../../../../../common/constants/constants';
import useTranslation from 'next-translate/useTranslation';
import { Box } from '@mui/system';
import { useCommonStyles } from '../../styles';
import { useIsMobile } from '../../../../../../common/hooks/common/useIsMobile';
import { NotificationsSettings } from './notifications/NotificationsSettings';
import { HomeViewSelector } from './homeViewSelector/HomeviewSelector';
import { LanguageSelector } from './languageSelector/LanguageSelector';
import { GeneralSettingsSection } from './section/GeneralSettingsSection';

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

      <Box className={commonClasses.sectionTitle}>{t('timeFormat')}</Box>
      <Box className={commonClasses.sectionBody}>
        <TextField select value={'24h'} size={'small'} className={classes.dropdown} fullWidth={isMobile}>
          {TIME_FORMATS.map(({ title, key }) => {
            return (
              <MenuItem key={key} value={key}>
                {title}
              </MenuItem>
            );
          })}
        </TextField>
      </Box>

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
