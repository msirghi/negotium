import { TaskWrapper } from '../../common/content/taskWrapper';
import { TaskWrapperTitleOptions } from '../../common/content/types';

const editableOptions: TaskWrapperTitleOptions = {
  title: 'Inbox',
  onSave: (val) => console.log(val),
};

export const InboxContainer = () => {
  return (
    <div>
      <TaskWrapper
        title={'Inbox'}
        upperHeaderTitle={'Inbox'}
        editableOptions={editableOptions}
      />
    </div>
  );
};
