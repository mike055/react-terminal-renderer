import React, { useState } from 'react';
import renderer, { Text } from '../lib/index';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <React.Fragment>
      <Text>{count}</Text>
    </React.Fragment>
  );
};

renderer(<App />);
