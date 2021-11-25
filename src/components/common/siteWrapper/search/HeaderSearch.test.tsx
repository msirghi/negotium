import { projectsMock } from '../../../../common/tests/mockData/projects-mock';
import { MockReduxProvider } from '../../../../common/tests/TestUtils';
import { HeaderSearch } from './HeaderSearch';
import renderer, { act } from 'react-test-renderer';
import { mount } from 'enzyme';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';

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
        <HeaderSearch />
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

  // it('should handle option render', () => {
  //   const wrapper = mount(renderComponent());
  //   const autocomplete = wrapper.find('#header-autocomplete').at(0) as any;
  //   const spy = jest.fn();
  //   const Options = autocomplete.props().renderOption(
  //     {},
  //     { title: 'Title', Icon: CloseIcon, id: 1, onClick: spy }
  //   );
  // });
});
