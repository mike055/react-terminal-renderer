import React, { useState, useEffect } from 'react';
import renderer, { Text } from '../lib/index';

import SimpleText from './simple-text';
import Counter from './counter';
import Unicorns from './unicorns';

const App = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const frame = '-';
  const complexString = `
  ♥♥
${frame} unicorns ${frame}
  ♥♥
`;

  return (
    <React.Fragment>
      <SimpleText />
      <Counter />
      <Unicorns />
    </React.Fragment>
  );
};

renderer.render(<App />);
