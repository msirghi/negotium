import { FC } from 'react';
import { IconButton, Typography } from '@mui/material';
import colors from '../../../../../common/styles/colors';
import { makeStyles } from '@mui/styles';
import { SiteWrapperListOptions } from './types';
import { Row } from '../../../utilities/row/Row';
import AddIcon from '@mui/icons-material/Add';
import { useIsMobile } from '../../../../../common/hooks/common/useIsMobile';

type Props = {
  title?: string;
  options?: SiteWrapperListOptions;
};

const useStyles = makeStyles({
  titleContainer: {
    marginTop: 15,
  },
  title: {
    marginLeft: 80,
    fontSize: 11,
    textTransform: 'uppercase',
  },
  plusIcon: {
    marginLeft: 'auto',
    marginRight: 12,
    marginBottom: 2,
    opacity: (isMobile) => (isMobile ? 1 : 0),
    transition: '.2s opacity ease-in-out',
    '&:hover': {
      opacity: 1,
    },
  },
});

export const SiteWrapperList: FC<Props> = ({ children, title, options }) => {
  const isMobile = useIsMobile();
  const classes = useStyles(isMobile);

  return (
    <div>
      <Row alignVerticalCenter className={classes.titleContainer}>
        {title && (
          <Typography
            data-testid="site-wrapper-title"
            className={classes.title}
            color={colors.greys['500']}
          >
            {title}
          </Typography>
        )}

        {options && options.addOptions && (
          <IconButton
            className={classes.plusIcon}
            onClick={options.addOptions.onClick}
          >
            <AddIcon fontSize={'small'} color={'primary'} />
          </IconButton>
        )}
      </Row>
      {children}
    </div>
  );
};
