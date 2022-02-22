import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import colors from '../../../../../common/styles/colors';
import useTranslation from 'next-translate/useTranslation';

const useStyles = makeStyles({
  container: {
    color: colors.greys['500'],
    fontSize: 12,
  },
});

export const AppVersion = () => {
  const classes = useStyles();
  const { t } = useTranslation('settings');

  return <Box className={classes.container}>{t('version')} 0.0.1</Box>;
};
