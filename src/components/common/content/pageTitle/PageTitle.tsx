import { FC } from 'react';
import { Typography } from '@mui/material';
import { If } from '../../utilities/if/If';
import { UpperHeader } from './upperHeader/UpperHeader';
import { TaskWrapperTitleOptions } from '../types';
import { EditableTitle } from './editableTitle/EditableTitle';

type Props = {
  title: string;
  editableOptions?: TaskWrapperTitleOptions;
  showUpperHeader?: boolean;
  upperHeaderTitle?: string;
};

export const PageTitle: FC<Props> = ({
  title,
  showUpperHeader,
  upperHeaderTitle,
  editableOptions,
}) => {
  return (
    <div>
      <If condition={Boolean(showUpperHeader && upperHeaderTitle)}>
        <UpperHeader title={upperHeaderTitle!} />
      </If>
      <If condition={!!editableOptions}>
        <EditableTitle title={title} editableOptions={editableOptions!} />
      </If>
      <If condition={!editableOptions}>
        <Typography fontSize={34}>{title}</Typography>
      </If>
    </div>
  );
};
