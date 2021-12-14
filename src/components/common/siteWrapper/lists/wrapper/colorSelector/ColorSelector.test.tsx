import renderer from 'react-test-renderer';
import { ColorSelector } from './ColorSelector';
import { mount } from 'enzyme';
import { TextField } from '@mui/material';
import { act } from '@testing-library/react';
import { PROJECT_COLORS } from '../../../../../../common/constants/constants';

describe('ColorSelector', () => {
  const defaultProps = {};

  it('should match the snapshot', () => {
    const tree = renderer.create(<ColorSelector {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should set the data on menu item click', () => {
    const wrapper = mount(<ColorSelector {...defaultProps} />);
    const selector = wrapper.find(TextField).at(0) as any;
    act(() => {
      selector.props().onChange({ target: { value: PROJECT_COLORS[0].name } });
    });
    wrapper.update();
    expect(selector.props().value).toEqual(PROJECT_COLORS[0].color);
  });
});
