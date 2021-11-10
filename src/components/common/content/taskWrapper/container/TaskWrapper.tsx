import { FC } from 'react';
import { PageTitle } from '../../pageTitle/PageTitle';
import { TaskWrapperTitleOptions } from '../../types';
import { Tab, Tabs } from '@mui/material';
import { AddSectionRow } from '../section/add/AddSectionRow';

type Props = {
  title: string;
  upperHeaderTitle?: string;
  editableOptions?: TaskWrapperTitleOptions;
};

export const TaskWrapper: FC<Props> = ({
  title,
  upperHeaderTitle,
  editableOptions,
  children,
}) => {
  return (
    <div>
      <PageTitle
        editableOptions={editableOptions}
        title={title}
        showUpperHeader
        upperHeaderTitle={upperHeaderTitle}
      />
      <Tabs value={1}>
        <Tab label={'3 Todos'} value={1} />
        <Tab label={'Notes'} value={2} />
      </Tabs>

      <div role={'tabpanel'} style={{ marginTop: '1rem' }}>
        {children}{' '}
      </div>

      <AddSectionRow onClick={() => {}} />
    </div>
  );
};
