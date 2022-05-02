import renderer from 'react-test-renderer';
import { ListViewInfo } from './ListViewInfo';

describe('ListViewInfo', () => {
  it('should match the snapshot', () => {
    const component = renderer.create(<ListViewInfo />);
    expect(component).toMatchSnapshot();
  });
});
