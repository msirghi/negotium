import { SiteWrapperMainList } from './SiteWrapperMainList';
import renderer from 'react-test-renderer';
import { MAIN_MENU_ITEMS } from '../../../../../common/constants/constants';
import { mount } from 'enzyme';
import { ListItem } from '@mui/material';
import { act } from '@testing-library/react';
import { MockThemeProvider } from '../../../../../common/tests/TestUtils';
import mockRouter from 'next-router-mock';

mockRouter.push = jest.fn();

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('SiteWrapperMainList', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return (
      <MockThemeProvider>
        <SiteWrapperMainList />
      </MockThemeProvider>
    );
  };

  it('should match snapshot', () => {
    const tree = renderer.create(renderComponent());
    expect(tree).toMatchSnapshot();
  });

  it(`should render ${MAIN_MENU_ITEMS.length} list item`, () => {
    const wrapper = mount(renderComponent());
    expect(wrapper.find(ListItem)).toHaveLength(MAIN_MENU_ITEMS.length);
  });

  it(`should push new route on list item click`, () => {
    const wrapper = mount(renderComponent());
    const item = wrapper.find(ListItem).at(0);
    act(() => {
      item.simulate('click');
    });
    expect(mockRouter.push).toBeCalled();
  });
});
