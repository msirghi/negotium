import { projectsMock } from './projects-mock';
import { accountInfoMock } from './account-mock';

export const reduxStoreMock = {
  projects: {
    projects: [...projectsMock],
  },
  account: {
    info: accountInfoMock,
    metadata: {
      theme: 'noir',
    },
  },
};
