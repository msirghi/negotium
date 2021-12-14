import { FC } from 'react';
import { ROW_DIRECTION } from '../../../../common/constants/enums';

type Props = {
  alignVerticalCenter?: boolean;
  alignHorizontalCenter?: boolean;
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  direction?: ROW_DIRECTION;
};

export const Row: FC<Props> = ({
  children,
  alignHorizontalCenter,
  alignVerticalCenter,
  className,
  fullWidth,
  onClick,
  direction,
}) => {
  const defaultStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 'initial',
    flexDirection: 'row',
  };

  if (alignHorizontalCenter) {
    defaultStyles.justifyContent = 'center';
  }

  if (alignVerticalCenter) {
    defaultStyles.alignItems = 'center';
  }

  if (fullWidth) {
    defaultStyles.width = '100%';
  }

  if (direction) {
    defaultStyles.flexDirection = direction;
  }

  return (
    <div
      // @ts-ignore
      style={defaultStyles}
      className={className}
      onClick={() => onClick && onClick()}
    >
      {children}
    </div>
  );
};
