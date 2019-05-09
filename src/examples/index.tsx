import React from 'react';
import renderer from '../';

type TextProps = {
  children: React.ReactNode;
};

const Text = ({ children }: TextProps) => {
  return <span>{children}</span>;
};

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

renderer(<App />);