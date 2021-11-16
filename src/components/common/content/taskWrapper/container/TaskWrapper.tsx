import { FC } from 'react';
import { PageTitle } from '../../pageTitle/PageTitle';
import { TaskWrapperTitleOptions } from '../../types';
import { Tab, Tabs } from '@mui/material';
import { AddSectionRow } from '../section/add/AddSectionRow';
import { SettingsOptions } from '../../pageTitle/types';
import SmoothList from 'react-smooth-list';

type Props = {
  title: string;
  upperHeaderTitle?: string;
  editableOptions?: TaskWrapperTitleOptions;
  onSectionAdd?: (title: string, orderNumber: number) => void;
  showSections?: boolean;
} & SettingsOptions;

export const TaskWrapper: FC<Props> = ({
  title,
  upperHeaderTitle,
  editableOptions,
  children,
  onSectionAdd,
  showSections,
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
        <Tab label={'Todos'} value={1} />
        <Tab label={'Notes'} value={2} />
      </Tabs>

      <div role={'tabpanel'} style={{ marginTop: '1rem' }}>
        <SmoothList>{children}</SmoothList>
      </div>

      {showSections && (
        <AddSectionRow
          onSectionSave={(title, orderNumber) =>
            onSectionAdd && onSectionAdd(title, orderNumber)
          }
        />
      )}
    </div>
  );
};
