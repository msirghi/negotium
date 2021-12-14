import { projectsMock } from '../../../../common/tests/mockData/projects-mock';
import {
  MockReduxProvider,
  MockThemeProvider,
} from '../../../../common/tests/TestUtils';
import { HeaderSearch } from './HeaderSearch';
import renderer, { act } from 'react-test-renderer';
import { mount } from 'enzyme';

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'inbox',
    query: {},
  }),
}));

describe('HeaderSearch', () => {
  const reduxStore = {
    projects: [...projectsMock],
  };

  const renderComponent = () => {
    return (
      <MockReduxProvider reduxStore={reduxStore}>
        <MockThemeProvider>
          <HeaderSearch />
        </MockThemeProvider>
      </MockReduxProvider>
    );
  };

  it('should match the snapshot', () => {
    const tree = renderer.create(renderComponent());
    expect(tree).toMatchSnapshot();
  });

  it('should handle onChange autocomplete event', () => {
    const wrapper = mount(renderComponent());
    const autocomplete = wrapper.find('#header-autocomplete').at(0) as any;
    const spy = jest.fn();

    act(() => {
      autocomplete.props().onChange({} as any, { onClick: spy });
    });
    expect(spy).toBeCalled();
  });

  it('should handle open state', () => {
    jest.useFakeTimers();
    const wrapper = mount(renderComponent());
    const autocomplete = wrapper.find('#header-autocomplete').at(0) as any;

    act(() => {
      autocomplete.props().onOpen();
    });
    jest.runOnlyPendingTimers();
    wrapper.update();
    expect(autocomplete.props().open).toBeDefined();
  });

  it('should handle close state', () => {
    jest.useFakeTimers();
    const wrapper = mount(renderComponent());
    const autocomplete = wrapper.find('#header-autocomplete').at(0) as any;

    act(() => {
      autocomplete.props().onClose();
    });
    jest.runOnlyPendingTimers();
    wrapper.update();
    expect(autocomplete.props().open).toBeDefined();
  });

  it('should return value for option label', () => {
    jest.useFakeTimers();
    const wrapper = mount(renderComponent());
    const autocomplete = wrapper.find('#header-autocomplete').at(0) as any;

    const result = autocomplete.props().getOptionLabel({title: 'title'});
    expect(result).toEqual('title');
  });
});
