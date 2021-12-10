import { OverridableComponent } from '@mui/types';
import { SvgIconTypeMap } from '@mui/material';
import { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { Row } from '../../../../../utilities/row/Row';
import colors from '../../../../../../../common/styles/colors';
import { useIsMobile } from '../../../../../../../common/hooks/common/useIsMobile';
import { If } from '../../../../../utilities/if/If';

type Props = {
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  title: string;
  isActive: boolean;
  onClick: () => void;
};

const useStyles = makeStyles({
  container: (props: { isMobile: boolean; isActive: boolean }) => ({
    marginTop: 10,
    transition: '.3s background-color ease-in-out',
    padding: '10px 15px',
    borderRadius: 5,
    width: props.isMobile ? 'initial' : '220px !important',
    '&:hover': {
      backgroundColor: colors.greys['200'],
      cursor: 'pointer',
    },
    backgroundColor: props.isActive ? colors.greys['300'] : '',
  }),
  title: {
    marginLeft: 5,
  },
});

export const SettingsMenuListItem: FC<Props> = ({
  Icon,
  onClick,
  isActive,
  title,
}) => {
  const isMobile = useIsMobile();
  const classes = useStyles({ isActive, isMobile });

  return (
    <Row alignVerticalCenter className={classes.container} onClick={onClick}>
      <Icon fontSize={'small'} />
      <If condition={!isMobile}>
        <div id={`${title}-item`} className={classes.title}>{title}</div>
      </If>
    </Row>
  );
};
