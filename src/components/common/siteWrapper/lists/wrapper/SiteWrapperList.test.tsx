import renderer from 'react-test-renderer';
import { SiteWrapperList } from './SiteWrapperList';
import { render, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';

describe('SiteWrapperList', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(
      <SiteWrapperList>
        <div>test</div>
      </SiteWrapperList>
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render title if provided', async () => {
    render(
      <SiteWrapperList title={'Title'}>
        <div>test</div>
      </SiteWrapperList>
    );

    await waitFor(() => {
      expect(screen.getByText('Title')).toBeInTheDocument();
    });
  });
});
