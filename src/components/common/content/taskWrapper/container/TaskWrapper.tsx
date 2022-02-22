import React, { FC } from 'react';
import { PageTitle } from '../../pageTitle/PageTitle';
import { TaskWrapperTitleOptions } from '../../types';
import { Tab, Tabs } from '@mui/material';
import { AddSectionRow } from '../section/add/AddSectionRow';
import { SettingsOptions } from '../../pageTitle/types';
import SmoothList from 'react-smooth-list';
import useTranslation from 'next-translate/useTranslation';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { DndTaskWrapperProps } from '../../../dnd/taskWrapper/types';

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
      <Tabs value={1}>
        <Tab label={`${taskCount || ''} ${t('common.todos')}`} value={1} />
        {/*<Tab label={t('common.notes')} value={2} />*/}
      </Tabs>

      <div role={'tabpanel'} style={{ marginTop: '1rem' }}>
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
