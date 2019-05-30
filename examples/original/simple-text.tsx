import React from 'react';
import { Text } from '../lib/index';

const TextFromMoreNesting = () => {
  return (
    <React.Fragment>
      <Text>More text please</Text>
    </React.Fragment>
  );
};

const SimpleText = () => {
  return (
    <React.Fragment>
      <Text>Hello World</Text>
      <Text>I am some cool text</Text>
      <TextFromMoreNesting />
    </React.Fragment>
  );
};

export default SimpleText;
