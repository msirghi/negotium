import { SiteWrapperMainList } from './SiteWrapperMainList';
import renderer from 'react-test-renderer';
import { MAIN_MENU_ITEMS } from '../../../../../common/constants/constants';
import { mount } from 'enzyme';
import { ListItem } from '@mui/material';

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'inbox',
  }),
}));

describe('SiteWrapperMainList', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<SiteWrapperMainList />);
    expect(tree).toMatchSnapshot();
  });

  it(`should render ${MAIN_MENU_ITEMS.length} list item`, () => {
    const wrapper = mount(<SiteWrapperMainList />);
    expect(wrapper.find(ListItem)).toHaveLength(MAIN_MENU_ITEMS.length);
  });
});
