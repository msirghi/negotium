import renderer, { act } from 'react-test-renderer';
import { BorderlessInput } from './BorderlessInput';
import { mount } from 'enzyme';
import { TextField } from '@mui/material';

describe('BorderlessInput', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<BorderlessInput />);
    expect(tree).toMatchSnapshot();
  });

  it('should render an input with provided value', () => {
    const wrapper = mount(<BorderlessInput value={'Value'} />);
    expect(wrapper.find(TextField).props().value).toEqual('Value');
  });

  it('should handle onChange event', () => {
    const onChangeSpy = jest.fn();
    const wrapper = mount(<BorderlessInput onChange={onChangeSpy} />);
    const input = wrapper.find(TextField) as any;

    act(() => {
      input.props().onChange({});
    });
    expect(onChangeSpy).toBeCalled();
  });
});
