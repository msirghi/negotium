import { FC } from 'react';
import { useThemeItemStyles } from './styles';
import { ThemeBodySkeleton } from '../skeleton/ThemeBodySkeleton';
import CheckIcon from '@mui/icons-material/Check';
import { Row } from '../../../../../utilities/row/Row';
import { If } from '../../../../../utilities/if/If';
import { SiteTheme } from '../../../../../../../common/constants/types';

type Props = {
  theme: SiteTheme;
  selected?: boolean;
  onClick: (theme: string) => void;
};

export const ThemeItem: FC<Props> = ({ theme, selected, onClick }) => {
  const { color, label, textColor } = theme;
  const classes = useThemeItemStyles({ color, textColor });

  const handleClick = () => {
    onClick(theme.internalKey);
  };

  return (
    <div
      className={classes.container}
      id={`theme-${label}`}
      onClick={handleClick}
    >
      <div>
        <div className={classes.title}>{label}</div>
        <div className={classes.skeleton}>
          <ThemeBodySkeleton />
          <ThemeBodySkeleton />
          <ThemeBodySkeleton />
          <If condition={selected}>
            <Row fullWidth>
              <CheckIcon fontSize={'small'} className={classes.checkIcon} />
            </Row>
          </If>
        </div>
      </div>
    </div>
  );
};
