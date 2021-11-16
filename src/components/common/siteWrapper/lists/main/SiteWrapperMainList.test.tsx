import { SiteWrapperMainList } from './SiteWrapperMainList';
import renderer from 'react-test-renderer';
import { MAIN_MENU_ITEMS } from '../../../../../common/constants/constants';
import { mount } from 'enzyme';
import { ListItem } from '@mui/material';
import { act } from '@testing-library/react';

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'inbox',
    push: mockPush,
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

  it(`should push new route on list item click`, () => {
    const wrapper = mount(<SiteWrapperMainList />);
    const item = wrapper.find(ListItem).at(0);
    act(() => {
      item.simulate('click');
    });
    expect(mockPush).toBeCalled();
  });
});
