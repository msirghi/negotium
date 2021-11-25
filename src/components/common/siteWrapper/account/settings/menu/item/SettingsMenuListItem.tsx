import { OverridableComponent } from '@mui/types';
import { SvgIconTypeMap } from '@mui/material';
import { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { Row } from '../../../../../utilities/row/Row';
import colors from '../../../../../../../common/styles/colors';

type Props = {
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  title: string;
  isActive: boolean;
  onClick: () => void;
};

const useStyles = makeStyles({
  container: (isActive) => ({
    marginTop: 10,
    transition: '.3s background-color ease-in-out',
    padding: '10px 15px',
    borderRadius: 5,
    '&:hover': {
      backgroundColor: colors.greys['200'],
      cursor: 'pointer',
    },
    backgroundColor: isActive ? colors.greys['300'] : '',
  }),
  title: {
    marginLeft: 5,
  },
});

export const SettingsMenuListItem: FC<Props> = ({ Icon, onClick, isActive, title }) => {
  const classes = useStyles(isActive);

  return (
    <Row alignVerticalCenter className={classes.container} onClick={onClick}>
      <Icon fontSize={'small'} />
      <div className={classes.title}>{title}</div>
    </Row>
  );
};
