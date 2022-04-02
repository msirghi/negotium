import { TasksMock } from '../../../common/tests/mockData/tasks-mock';
import { mount } from 'enzyme';
import { TimelineItem } from './TimelineItem';
import renderer from 'react-test-renderer';
import { Checkbox } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { noirAppTheme } from '../../../common/theme/appTheme';

describe('TimelineItem', () => {
  const defaultProps = {
    task: TasksMock[0],
    onClick: jest.fn(),
    active: false,
    markAsDone: jest.fn(),
  };

  const renderComponent = () => {
    return (
      <ThemeProvider theme={noirAppTheme}>
        <TimelineItem {...defaultProps} />
      </ThemeProvider>
    );
  };

  afterEach(jest.clearAllMocks);

  it('should match the snapshot', () => {
    const wrapper = renderer.create(renderComponent());
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle marking task as done', () => {
    const wrapper = mount(renderComponent());
    const checkbox = wrapper.find(Checkbox);

    // @ts-ignore
    checkbox.props().onChange();
    expect(defaultProps.markAsDone).toBeCalled();
  });

  it('should handle task click', () => {
    const wrapper = mount(renderComponent());
    const container = wrapper.find('div').at(0);

    container.simulate('click');
    expect(defaultProps.onClick).toBeCalled();
  });
});
