import { FC } from 'react';

type Props = {
  backgroundColor: string;
  textColor?: string;
  styles: any;
  className: any;
};

export const LandingSection: FC<Props> = ({ className, styles = {}, backgroundColor, children, textColor }) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        minHeight: 400,
        // padding: '100px 10vw',
        background: backgroundColor,
        color: textColor || '#fff',
        ...styles,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
