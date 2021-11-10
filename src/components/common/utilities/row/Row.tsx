import { FC } from 'react';

type Props = {
  alignVerticalCenter?: boolean;
  alignHorizontalCenter?: boolean;
  className?: string;
};

export const Row: FC<Props> = ({
  children,
  alignHorizontalCenter,
  alignVerticalCenter,
  className,
}) => {
  const defaultStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  };

  if (alignHorizontalCenter) {
    defaultStyles.justifyContent = 'center';
  }

  if (alignVerticalCenter) {
    defaultStyles.alignItems = 'center';
  }

  return (
    <div style={defaultStyles} className={className}>
      {children}
    </div>
  );
};
