import { FC, ReactElement } from 'react';

type Props = {
  condition: boolean;
};

export const If: FC<Props> = ({ condition, children }) => {
  if (condition) {
    return children as ReactElement;
  }
  return null;
};
