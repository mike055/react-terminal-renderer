import React, { useState } from 'react';
import renderer, { Text, Input } from '../lib/index';

import SimpleText from './simple-text';
import Counter from './counter';
import Unicorns from './unicorns';

const App = () => {
  const [changedVal, setChangedVal] = useState('');
  const [submittedVal, setSubmittedVal] = useState('');

  return (
    <React.Fragment>
      <SimpleText />
      <Counter />
      <Unicorns />
      <Text>----------------</Text>
      <Text>{`Submitted value: ${submittedVal}`}</Text>
      <Text>----------------</Text>
      <Input
        originalValue={changedVal}
        onChange={setChangedVal}
        onSubmit={setSubmittedVal}
      />
    </React.Fragment>
  );
};

renderer.render(<App />);
