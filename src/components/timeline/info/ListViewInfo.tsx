import InfoIcon from '@mui/icons-material/Info';
import { Row } from '../../common/utilities/row/Row';
import { makeStyles } from '@mui/styles';
import colors from '../../../common/styles/colors';
import useTranslation from 'next-translate/useTranslation';

const useStyles = makeStyles({
  text: {
    fontSize: 12,
    marginLeft: 3,
    color: colors.greys['500'],
  },
  icon: {
    fontSize: 15,
    color: colors.greys['500'],
  },
});

export const ListViewInfo = () => {
  const classes = useStyles();
  const { t } = useTranslation('timeline');

  return (
    <Row alignVerticalCenter>
      <InfoIcon className={classes.icon} />
      <span className={classes.text}>{t('listView.noteMessage')}</span>
    </Row>
  );
};
