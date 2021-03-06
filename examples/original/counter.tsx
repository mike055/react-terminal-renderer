import React, { useState, useEffect } from 'react';
import { Text } from '../../lib/index';

const Counter = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <React.Fragment>
      <Text>{count}</Text>
    </React.Fragment>
  );
};

export default Counter;
