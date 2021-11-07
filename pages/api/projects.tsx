import type { NextApiRequest, NextApiResponse } from 'next';

const projects = [
  {
    id: 'uuid-1',
    name: 'Project 1',
  },
  {
    id: 'uuid-2',
    name: 'Project 2',
  },
  {
    id: 'uuid-3',
    name: 'Project 3',
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ projects: typeof projects }>
) {
  res.status(200).json({ projects });
}
