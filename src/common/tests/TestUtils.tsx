import mediaQuery from 'css-mediaquery';

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

const TestUtils = {
  createMatchMedia,
};

export default TestUtils;
