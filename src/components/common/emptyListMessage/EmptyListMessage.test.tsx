import renderer from 'react-test-renderer';
import { EmptyListMessage } from './EmptyListMessage';
import { render } from '@testing-library/react';

describe('EmptyListMessage', () => {
  const defaultProps = {
    imageSrc: 'src',
    message: 'Message',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const tree = renderer.create(<EmptyListMessage {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render provided text', () => {
    const { getByText } = render(<EmptyListMessage {...defaultProps} />);
    expect(getByText(defaultProps.message)).toBeInTheDocument();
  });
});
