import React, { Children, FC } from 'react';
import { PageTitle } from '../../pageTitle/PageTitle';
import { TaskWrapperTitleOptions } from '../../types';
import { Tab, Tabs } from '@mui/material';
import { AddSectionRow } from '../section/add/AddSectionRow';
import { SettingsOptions } from '../../pageTitle/types';
import SmoothList from 'react-smooth-list';
import useTranslation from 'next-translate/useTranslation';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { DndTaskWrapperProps } from '../../../dnd/taskWrapper/types';
import { If } from '../../../utilities/if/If';
import { NoTasks } from '../noTasks/NoTasks';
import { useTheme } from '@mui/styles';

type Props = {
  title: string;
  upperHeaderTitle?: string;
  editableOptions?: TaskWrapperTitleOptions;
  onSectionAdd?: (title: string, orderNumber: number) => void;
  showSections?: boolean;
  taskCount?: number;
} & SettingsOptions &
  Partial<DndTaskWrapperProps>;

export const TaskWrapper: FC<Props> = ({
  title,
  upperHeaderTitle,
  editableOptions,
  children,
  onSectionAdd,
  showSections,
  settingsOptions,
  projectOptions,
  handleDragEnd,
  taskCount,
}) => {
  const { t } = useTranslation('common');
  const theme: any = useTheme();

  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child) || !child.props.task) return;
    return React.cloneElement(child, { index: child.props.dndIndex });
  });

  return (
    <div>
      <PageTitle
        editableOptions={editableOptions}
        title={title}
        showUpperHeader
        upperHeaderTitle={upperHeaderTitle}
        settingsOptions={settingsOptions}
        projectOptions={projectOptions}
      />
      <Tabs
        value={1}
        TabIndicatorProps={{
          style: {
            backgroundColor: theme.palette.custom.tabsColor,
          },
        }}
      >
        <Tab
          label={
            <span style={{ color: theme.palette.custom.tabsColor }}>
              {taskCount || ''} {t('common.todos')}`
            </span>
          }
          value={1}
        />
      </Tabs>

      <div role={'tabpanel'} style={{ marginTop: '1rem' }}>
        <If condition={!Children.toArray(children).length}>
          <NoTasks />
        </If>
        <SmoothList>
          <DragDropContext onDragEnd={handleDragEnd!}>
            <Droppable droppableId="list">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <>{childrenWithProps}</>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </SmoothList>
      </div>

      {showSections && <AddSectionRow onSectionSave={(title, orderNumber) => onSectionAdd && onSectionAdd(title, orderNumber)} />}
    </div>
  );
};
