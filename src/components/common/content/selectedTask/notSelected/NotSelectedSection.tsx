import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import colors from '../../../../../common/styles/colors';
import { useTranslation } from 'next-i18next';

const useStyles = makeStyles({
  root: {
    height: '95%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    color: colors.greys['600'],
  },
});

export const NotSelectedSection = () => {
  const classes = useStyles();
  const { t } = useTranslation('common');

  return (
    <Box className={classes.root}>
      <Box>
        <CenterFocusWeakIcon color={'primary'} fontSize={'large'} />
      </Box>
      <Box className={classes.title}>{t('clickToSelect')}</Box>
    </Box>
  );
};
