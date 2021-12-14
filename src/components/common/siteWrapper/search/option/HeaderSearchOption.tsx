import { Box } from '@mui/system';
import { Row } from '../../../utilities/row/Row';
import {FC, HTMLAttributes} from 'react';
import { makeStyles } from '@mui/styles';
import colors from '../../../../../common/styles/colors';
import { HeaderSearchOptions } from '../types';

type Props = {
  props: HTMLAttributes<HTMLLIElement>;
  option: HeaderSearchOptions;
};

const useStyles = makeStyles({
  optionTitle: {
    marginLeft: 10,
  },
  optionType: {
    marginLeft: 'auto',
    color: colors.greys['400'],
  },
});

export const HeaderSearchOption: FC<Props> = ({ option, props }) => {
  const classes = useStyles();

  const { title, Icon, id, onClick } = option;
  if (!title) {
    return <div />;
  }
  return (
    // @ts-ignore
    <Box {...props} component={'li'} onClick={onClick} key={id}>
      <Row alignVerticalCenter>
        <Icon color={'primary'} />
        <div className={classes.optionTitle}>{title}</div>
      </Row>
      <div className={classes.optionType}>
        <i>Project</i>
      </div>
    </Box>
  );
};
