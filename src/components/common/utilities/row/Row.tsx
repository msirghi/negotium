import { FC } from 'react';

type Props = {
  alignVerticalCenter?: boolean;
  alignHorizontalCenter?: boolean;
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
};

export const Row: FC<Props> = ({
  children,
  alignHorizontalCenter,
  alignVerticalCenter,
  className,
  fullWidth,
  onClick,
}) => {
  const defaultStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 'initial',
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

  return (
    <div
      style={defaultStyles}
      className={className}
      onClick={() => onClick && onClick()}
    >
      {children}
    </div>
  );
};
