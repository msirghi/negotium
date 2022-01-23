import { FC } from 'react';
import { useEmptyListMessageStyles } from './styles';

type Props = {
  imageSrc: string;
  message: string;
};

export const EmptyListMessage: FC<Props> = ({ imageSrc, message }) => {
  const classes = useEmptyListMessageStyles();

  return (
    <>
      <img src={imageSrc} className={classes.image} alt={imageSrc} />
      <div className={classes.message}>{message}</div>
    </>
  );
};
