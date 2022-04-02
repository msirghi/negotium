import { TaskDateType } from '../../../common/constants/enums';
import { ThemeProvider } from '@mui/system';
import { noirAppTheme } from '../../../common/theme/appTheme';
import { TimelineTitle } from './TimelineTitle';
import renderer from 'react-test-renderer';

describe('TimelineTitle', () => {
  const defaultProps = {
    title: 'Title',
    dateType: TaskDateType.Today,
  };

  const renderComponent = () => {
    return (
      <ThemeProvider theme={noirAppTheme}>
        <TimelineTitle {...defaultProps} />
      </ThemeProvider>
    );
  };

  it('should match the snapshot', () => {
    const wrapper = renderer.create(renderComponent());
    expect(wrapper).toMatchSnapshot();
  });
});
