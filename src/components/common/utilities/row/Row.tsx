import { FC } from 'react';

type Props = {
  alignVerticalCenter?: boolean;
  alignHorizontalCenter?: boolean;
  className?: string;
  fullWidth?: boolean;
};

export const Row: FC<Props> = ({
  children,
  alignHorizontalCenter,
  alignVerticalCenter,
  className,
  fullWidth,
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
    <div style={defaultStyles} className={className}>
      {children}
    </div>
  );
};
