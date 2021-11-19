import mediaQuery from 'css-mediaquery';
import { FC } from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

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

export const MockQueryClient: FC = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const runAllPromises = () => new Promise(setImmediate);

const TestUtils = {
  createMatchMedia,
  runAllPromises
};

export default TestUtils;
