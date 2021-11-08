import { shallow } from 'enzyme';
import { Row } from './Row';

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
});
