import React, { useState } from 'react';
import renderer, { Text, Input, Row } from '../lib/index';

import SimpleText from './simple-text';
import Counter from './counter';
import Unicorns from './unicorns';

const App = () => {
  const [changedVal, setChangedVal] = useState('');
  const [submittedVal, setSubmittedVal] = useState('');
  const [focusInput, setFocusInput] = useState(true);

  return (
    <React.Fragment>
      <Row>
        <Text>Squash</Text>
        <Text>All</Text>
        The
        <Text>Text</Text>
      </Row>
      <SimpleText />
      <Counter />
      <Unicorns />
      <Text>----------------</Text>
      <Text>{`Submitted value: ${submittedVal}`}</Text>
      <Text>----------------</Text>
      <Row>
        <Text styles={{ bold: true }}>Enter some text:</Text>
        <Input
          value={changedVal}
          onChange={setChangedVal}
          onSubmit={s => {
            setSubmittedVal(s);
            setFocusInput(false);
          }}
          focus={focusInput}
        />
      </Row>
    </React.Fragment>
  );
};

renderer.render(<App />);
