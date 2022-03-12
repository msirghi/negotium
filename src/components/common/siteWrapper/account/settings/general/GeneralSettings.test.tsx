import renderer from 'react-test-renderer';
import { MockReduxProvider } from '../../../../../../common/tests/TestUtils';
import { GeneralSettings } from './GeneralSettings';
import { mount } from 'enzyme';
import { TextField } from '@mui/material';
import { act } from '@testing-library/react';
import AccountService from '../../../../../../services/AccountService';

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'inbox',
    query: {},
  }),
}));

describe('GeneralSettings', () => {
  const renderComponent = () => {
    return (
      <MockReduxProvider
        reduxStore={{
          account: {
            metadata: {
              language: 'en',
            },
          },
        }}
      >
        <GeneralSettings />
      </MockReduxProvider>
    );
  };

  it('should match the snapshot', () => {
    const tree = renderer.create(renderComponent());
    expect(tree).toMatchSnapshot();
  });

  it('should call the service on language change', () => {
    AccountService.updateUserLanguage = jest.fn(() => Promise.resolve()) as any;
    const wrapper = mount(renderComponent());
    const languageSelector = wrapper.find(TextField).at(0) as any;

    act(() => {
      languageSelector.props().onChange({ target: { value: 'ru' } });
    });
    expect(AccountService.updateUserLanguage).toBeCalled();
  });
});
