import '@testing-library/jest-dom/extend-expect';
import MockDate from 'mockdate';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({
  adapter: new Adapter(),
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub'; // whatever
  },
}));

MockDate.set('2000-11-22');
