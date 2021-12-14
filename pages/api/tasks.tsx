import type { NextApiRequest, NextApiResponse } from 'next';

const tasks = [
  {
    id: 'uuid-1',
    title: 'Buy milk',
    createdDate: '2021-10-30T13:00:00',
    dueDate: new Date().toString(),
    completed: false,
    orderNumber: 1,
  },
  {
    id: 'uuid-2',
    title: 'Study physics',
    createdDate: '2021-10-30T13:00:00',
    dueDate: '2021-10-30T13:00:00',
    completed: false,
    orderNumber: 2,
  },
  {
    id: 'uuid-3',
    title: 'Buy a new phone for grandmother',
    createdDate: '2021-10-30T13:00:00',
    dueDate: '2021-10-31T13:00:00',
    completed: false,
    orderNumber: 3,
  },
];

const tasksWithSection = [
  {
    id: 'section-1',
    sectionTitle: 'Design',
    orderNumber: 2,
    sectionTasks: [...tasks],
  },
  {
    id: 'section-2',
    orderNumber: 1,
    sectionTitle: 'Computer',
    sectionTasks: [
      {
        ...tasks[0],
        title: 'Section 2 task',
        dueDate: null
      },
    ],
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ tasks: typeof tasks }>
) {
  if (req.query.groupBy === 'section') {
    res.status(200).json({ data: tasksWithSection });
    return;
  }
  res.status(200).json({ tasks });
}
