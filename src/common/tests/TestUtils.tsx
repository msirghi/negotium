import mediaQuery from 'css-mediaquery';
import { FC } from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

function createMatchMedia(width: number) {
  return (query: string) => {
    return {
      matches: mediaQuery.match(query, {
        width,
      }),
      addListener: () => {},
      removeListener: () => {},
    };
  };
}

export const MockReduxProvider: FC<{ reduxStore: object }> = ({
  children,
  reduxStore,
}) => {
  const mockStore = configureStore();
  return <Provider store={mockStore(reduxStore)}>{children}</Provider>;
};

const TestUtils = {
  createMatchMedia,
};

export default TestUtils;
