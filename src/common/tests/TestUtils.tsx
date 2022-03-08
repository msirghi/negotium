import mediaQuery from 'css-mediaquery';
import { FC } from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { noirAppTheme } from '../theme/appTheme';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

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

export const MockReduxProvider: FC<{ reduxStore: object }> = ({ children, reduxStore }) => {
  const mockStore = configureStore();
  return <Provider store={mockStore(reduxStore)}>{children}</Provider>;
};

export const MockThemeProvider: FC = ({ children }) => {
  return <ThemeProvider theme={noirAppTheme}>{children}</ThemeProvider>;
};

export const MockDndProvider: FC = ({ children }) => {
  return (
    <DragDropContext onDragEnd={jest.fn()}>
      <Droppable droppableId="list">{(provided) => <>{children} </>}</Droppable>
    </DragDropContext>
  );
};

const runAllPromises = () => new Promise(setImmediate);

const testData = {
  fakeTitle: '[{"type":"paragraph","children":[{"text":"new task for 123 "},{"text":""}]}]',
};

const TestUtils = {
  createMatchMedia,
  runAllPromises,
  testData,
};

export default TestUtils;
