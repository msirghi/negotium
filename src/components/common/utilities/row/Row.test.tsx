import { shallow } from 'enzyme';
import { Row } from './Row';
import { act } from '@testing-library/react';
import { ROW_DIRECTION } from '../../../../common/constants/enums';

describe('Row', () => {
  it('should render a div with display: flex', () => {
    const wrapper = shallow(<Row>1</Row>);
    expect(wrapper.find('div')!.props().style!.display).toEqual('flex');
  });

  it('should render a div with and align horizontally if special prop is provided', () => {
    const wrapper = shallow(<Row alignVerticalCenter>1</Row>);
    expect(wrapper.find('div')!.props().style!.alignItems).toEqual('center');
  });

  it('should render a div with and align vertically if special prop is provided', () => {
    const wrapper = shallow(<Row alignHorizontalCenter>1</Row>);
    expect(wrapper.find('div')!.props().style!.justifyContent).toEqual(
      'center'
    );
  });

  it('should render a div with width=100% if fullWidth prop is provided', () => {
    const wrapper = shallow(
      <Row alignHorizontalCenter fullWidth>
        1
      </Row>
    );
    expect(wrapper.find('div')!.props().style!.width).toEqual('100%');
  });

  it('should render a div with specific className if it was provided as a prop', () => {
    const wrapper = shallow(
      <Row alignHorizontalCenter className={'className'}>
        1
      </Row>
    );
    expect(wrapper.find('div')!.props().className).toEqual('className');
  });

  it('should fire prop onClick method if it is provided', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <Row alignHorizontalCenter onClick={spy}>
        1
      </Row>
    );
    act(() => {
      wrapper.find('div').simulate('click');
    });
    expect(spy).toBeCalled();
  });

  it('should render div with direction=row by default', () => {
    const wrapper = shallow(<Row>1</Row>);
    expect(wrapper.find('div').props().style!.flexDirection).toEqual('row');
  });

  it('should render div with provided direction', () => {
    const wrapper = shallow(<Row direction={ROW_DIRECTION.COLUMN}>1</Row>);
    expect(wrapper.find('div').props().style!.flexDirection).toEqual('column');
  });
});
