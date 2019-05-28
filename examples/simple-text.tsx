import React from 'react';
import renderer, { Text } from '../lib/index';

const TextFromMoreNesting = () => {
  return (
    <React.Fragment>
      <Text>More text please</Text>
    </React.Fragment>
  );
};

const App = () => {
  return (
    <React.Fragment>
      <Text>Hello World</Text>
      <Text>Test</Text>
      <TextFromMoreNesting />
    </React.Fragment>
  );
};

renderer.render(<App />);
