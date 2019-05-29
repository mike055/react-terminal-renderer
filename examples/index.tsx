import React, { useState } from 'react';
import renderer, { Text, Input } from '../lib/index';

import SimpleText from './simple-text';
import Counter from './counter';
import Unicorns from './unicorns';

const App = () => {
  const [changedVal, setChangedVal] = useState('');
  const [submittedVal, setSubmittedVal] = useState('');
  const [focusInput, setFocusInput] = useState(true);

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
        onSubmit={s => {
          setSubmittedVal(s);
          setFocusInput(false);
        }}
        focus={focusInput}
      />
    </React.Fragment>
  );
};

renderer.render(<App />);
