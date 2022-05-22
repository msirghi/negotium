import { shallow } from 'enzyme';
import { GeneralSettingsSection } from './GeneralSettingsSection';

describe('GeneralSettingsSection', () => {
  const defaultProps = {
    title: 'Title',
  };

  it('should render content', () => {
    const wrapper = shallow(
      <GeneralSettingsSection {...defaultProps}>
        <div id={'content'} />
      </GeneralSettingsSection>
    );
    expect(wrapper.find('#content')).toHaveLength(1);
  });
});
