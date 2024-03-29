import {initialRichTextValue} from "../../constants/constants";

export const TasksMock = [
  {
    id: 'uuid-1',
    _id: 'uuid-1',
    title: '[{"type":"paragraph","children":[{"text":"new task for 123 "},{"text":""}]}]',
    description: JSON.stringify(initialRichTextValue),
    createdDate: 'Fri Nov 12 2021 07:53:34 GMT+0000',
    dueDate: 'Fri Nov 12 2021 07:53:34 GMT+0000',
    completed: true,
    orderNumber: 1,
  },
  {
    id: 'uuid-2',
    description: JSON.stringify(initialRichTextValue),
    _id: 'uuid-2',
    title: '[{"type":"paragraph","children":[{"text":"new task for 123 "},{"text":""}]}]',
    createdDate: 'Fri Nov 12 2021 07:53:34 GMT+0000',
    dueDate: 'Fri Nov 12 2021 07:53:34 GMT+0000',
    completed: false,
    orderNumber: 2,
  },
];
