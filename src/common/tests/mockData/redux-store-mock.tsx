import { projectsMock } from './projects-mock';
import { accountInfoMock } from './account-mock';
import { TasksMock } from './tasks-mock';

export const reduxStoreMock = {
  projects: {
    projects: [...projectsMock],
  },
  tasks: {
    tasks: [...TasksMock],
  },
  account: {
    info: accountInfoMock,
    metadata: {
      theme: 'noir',
    },
  },
};
