import { Row } from '../../../../utilities/row/Row';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import colors from '../../../../../../common/styles/colors';
import { FC } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const useStyles = makeStyles({
  root: {
    cursor: 'pointer',
    marginLeft: 25,
    marginRight: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    marginLeft: 35,
    color: colors.greys['500'],
  },
  icon: {
    color: colors.greys['500'],
  },
});

type Props = {
  toggleShowAll: () => void;
  showAll: boolean;
};

export const ProjectListMoreItem: FC<Props> = ({ toggleShowAll, showAll }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Row alignVerticalCenter onClick={toggleShowAll}>
        {showAll ? (
          <>
            <ArrowDropUpIcon fontSize={'small'} className={classes.icon} />
            <Box className={classes.title}>Less</Box>
          </>
        ) : (
          <>
            <ArrowDropDownIcon fontSize={'small'} className={classes.icon} />
            <Box className={classes.title}>More</Box>
          </>
        )}
      </Row>
    </div>
  );
};
